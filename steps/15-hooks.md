# Step 15: Hooks — Deterministic Enforcement

## The Problem with CLAUDE.md Rules

CLAUDE.md rules are **suggestions** that Claude can ignore under context pressure. You might write "NEVER commit .env files" but Claude could still do it if the context window gets crowded or instructions conflict.

**Hooks are different.** They're deterministic — they **always** run.

## The Critical Difference

| Mechanism | Type | Reliability |
|-----------|------|-------------|
| CLAUDE.md rules | Suggestion | Can be overridden |
| Hooks | Enforcement | Always executes |

## Hook Events

Claude Code supports three hook events:

| Event | When | Use Case |
|-------|------|----------|
| `PreToolUse` | Before tool executes | Block dangerous operations |
| `PostToolUse` | After tool completes | Run linters, formatters |
| `Stop` | Claude finishes turn | Quality gates, notifications |

## Setting Up Hooks

Hooks are configured in `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "python3 ~/.claude/hooks/block-secrets.py"
        }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "~/.claude/hooks/run-linter.sh"
        }]
      }
    ]
  }
}
```

## Example: Block Secrets Access

Create `~/.claude/hooks/block-secrets.py`:

```python
#!/usr/bin/env python3
import json
import sys
from pathlib import Path

# Files that should NEVER be read/edited by Claude
SENSITIVE = {
    '.env',
    '.env.local',
    '.env.production',
    'secrets.json',
    'credentials.json',
    'id_rsa',
    'id_ed25519',
    '.npmrc',  # Can contain auth tokens
    '.pypirc', # Can contain auth tokens
}

# Read hook input from stdin
data = json.load(sys.stdin)
file_path = data.get('tool_input', {}).get('file_path', '')

if Path(file_path).name in SENSITIVE:
    print(f"BLOCKED: Access to {file_path} denied by security hook.", file=sys.stderr)
    sys.exit(2)  # Exit 2 = block and feed stderr to Claude

sys.exit(0)  # Allow operation
```

Make it executable:

```bash
chmod +x ~/.claude/hooks/block-secrets.py
```

## Hook Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Allow operation to proceed |
| 1 | Error (shown to user, operation continues) |
| 2 | **Block operation**, tell Claude why (via stderr) |

Exit code 2 is the powerful one — it stops Claude and explains why.

## Example: Auto-Format After Edits

Create `~/.claude/hooks/auto-format.sh`:

```bash
#!/bin/bash

# Read the file path from hook input
FILE_PATH=$(cat | jq -r '.tool_input.file_path // empty')

if [[ -z "$FILE_PATH" ]]; then
    exit 0
fi

# Format based on file extension
case "$FILE_PATH" in
    *.ts|*.tsx|*.js|*.jsx|*.json|*.md)
        npx prettier --write "$FILE_PATH" 2>/dev/null
        ;;
    *.py)
        black "$FILE_PATH" 2>/dev/null
        ruff check --fix "$FILE_PATH" 2>/dev/null
        ;;
    *.go)
        gofmt -w "$FILE_PATH" 2>/dev/null
        ;;
esac

exit 0
```

## Example: Lint After Edits

Create `~/.claude/hooks/run-linter.sh`:

```bash
#!/bin/bash

FILE_PATH=$(cat | jq -r '.tool_input.file_path // empty')

if [[ -z "$FILE_PATH" ]]; then
    exit 0
fi

case "$FILE_PATH" in
    *.ts|*.tsx)
        npx eslint "$FILE_PATH" --fix 2>&1
        ;;
    *.py)
        ruff check "$FILE_PATH" 2>&1
        ;;
esac

# Don't block on lint errors, just report
exit 0
```

## Example: Notify on Completion

Create `~/.claude/hooks/notify.sh`:

```bash
#!/bin/bash
# macOS notification when Claude finishes a task

osascript -e 'display notification "Claude completed the task" with title "Claude Code"'
exit 0
```

Add to settings:

```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "~/.claude/hooks/notify.sh"
      }]
    }]
  }
}
```

## Directory Structure

```
~/.claude/
├── settings.json      # Hook configuration
├── hooks/
│   ├── block-secrets.py
│   ├── auto-format.sh
│   ├── run-linter.sh
│   └── notify.sh
└── CLAUDE.md
```

## Defense in Depth

Hooks work alongside other protections:

| Layer | What | How |
|-------|------|-----|
| 1 | Behavioral rules | CLAUDE.md "NEVER" rules |
| 2 | **Hooks** | Deterministic blocking |
| 3 | Access control | Deny list in settings.json |
| 4 | Git safety | .gitignore |

## When to Use Hooks vs CLAUDE.md

| Use Case | Solution |
|----------|----------|
| Security-critical (secrets, credentials) | **Hook** (exit 2) |
| Code style preferences | CLAUDE.md |
| Auto-formatting | Hook (PostToolUse) |
| Architectural decisions | CLAUDE.md |
| Blocking dangerous git commands | **Hook** (exit 2) |
| Notifications | Hook (Stop) |

## Verification

Test your hook:

```bash
# Test block-secrets hook
echo '{"tool_input": {"file_path": ".env"}}' | python3 ~/.claude/hooks/block-secrets.py
echo $?  # Should be 2 (blocked)

echo '{"tool_input": {"file_path": "src/app.ts"}}' | python3 ~/.claude/hooks/block-secrets.py
echo $?  # Should be 0 (allowed)
```

## Troubleshooting

**Hook not running:**
- Check `~/.claude/settings.json` syntax
- Verify script is executable (`chmod +x`)
- Check the `matcher` regex matches the tool name

**Hook blocking everything:**
- Test script manually with sample input
- Check exit codes (0 = allow, 2 = block)

**Hook output not showing:**
- Use `stderr` for messages to Claude
- Use `stdout` for messages to user

## Next Step

Now that you have deterministic enforcement, let's learn about Skills — reusable expertise that Claude can trigger automatically.
