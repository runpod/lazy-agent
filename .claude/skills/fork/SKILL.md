---
name: fork
description: Spawn multiple parallel Claude instances to explore different approaches simultaneously.
args: N "prompt" [paths...] - N instances (2-6), task prompt, optional paths to clone
---

# Fork - Parallel Claude Instances

Spawn multiple Claude instances in a tmux session running mprocs for side-by-side exploration.

**Syntax**: `/fork N "prompt" [paths...]`

**Time estimate**: Setup takes ~10 seconds

---

## Prerequisites

Check if mprocs and tmux are installed:

```bash
which mprocs && which tmux
```

If mprocs not installed: "mprocs is required for /fork. Install it with `brew install mprocs`."
If tmux not installed: "tmux is required for /fork. Install it with `brew install tmux`."

Stop and ask the user to install missing tools before proceeding.

---

## What is /fork?

Say: "/fork spawns multiple isolated Claude instances inside a tmux session, each working on a git worktree copy of your code in parallel."

Say: "This lets you explore different approaches simultaneously - like having multiple developers brainstorm at once. Each instance has full git history."

---

## Step 1: Parse Arguments

Extract from the user's /fork command:

| Argument | Required | Default | Valid Range |
|----------|----------|---------|-------------|
| `N` | Yes | - | 2-6 instances |
| `prompt` | Yes | - | Non-empty string in quotes |
| `paths` | No | Current directory | Valid paths |

**Validation:**
- N must be between 2 and 6 (screen real estate limitation)
- Prompt must not be empty
- Paths must exist if specified

Example commands:
- `/fork 3 "implement auth"` - 3 instances, current directory
- `/fork 2 "refactor this" ./src ./lib` - 2 instances on specific paths

---

## Step 2: Generate Session ID

Create a short, memorable session ID:

```bash
# Generate short random ID (e.g., "a3f7")
FORK_ID=$(head -c 4 /dev/urandom | xxd -p | head -c 4)
FORK_SESSION="fork-$FORK_ID"
FORK_DIR="/tmp/$FORK_SESSION"

echo "Session ID: $FORK_SESSION"
echo "Workspace: $FORK_DIR"
```

---

## Step 3: Create Workspaces with Git Worktree

Say: "Creating isolated git worktrees for each Claude instance..."

Check if we're in a git repo:

```bash
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo "Git repo detected - using worktrees"
    USE_WORKTREE=true
else
    echo "Not a git repo - using copy"
    USE_WORKTREE=false
fi
```

**If git repo (preferred):**

```bash
mkdir -p "$FORK_DIR"
SOURCE_PATH="$(pwd)"

for i in $(seq 1 $N); do
    WORKSPACE="$FORK_DIR/claude-$i"
    git worktree add "$WORKSPACE" --detach HEAD
    echo "Created worktree: $WORKSPACE"
done
```

**If not a git repo (fallback):**

```bash
mkdir -p "$FORK_DIR"
SOURCE_PATH="$(pwd)"

for i in $(seq 1 $N); do
    WORKSPACE="$FORK_DIR/claude-$i"
    mkdir -p "$WORKSPACE"
    cp -R "$SOURCE_PATH"/* "$WORKSPACE/" 2>/dev/null || true
    echo "Created copy: $WORKSPACE"
done
```

---

## Step 4: Generate mprocs.yaml

Create the mprocs configuration with descriptive names.

**IMPORTANT**: Use `claude --dangerously-skip-permissions` to avoid permission prompts blocking execution.

```bash
cat > "$FORK_DIR/mprocs.yaml" << 'HEADER'
procs:
HEADER

for i in $(seq 1 $N); do
    cat >> "$FORK_DIR/mprocs.yaml" << EOF
  claude-$i:
    cwd: "$FORK_DIR/claude-$i"
    shell: "claude --dangerously-skip-permissions '$PROMPT'"
EOF
done

echo "Config: $FORK_DIR/mprocs.yaml"
```

---

## Step 5: Launch in tmux

Create a detached tmux session running mprocs:

```bash
tmux new-session -d -s "$FORK_SESSION" -c "$FORK_DIR" "mprocs --config $FORK_DIR/mprocs.yaml"
```

---

## Step 6: Display Instructions

Say: "Fork session ready!"

Display this info block:

```
╔════════════════════════════════════════════════════════════╗
║  Fork Session: {FORK_SESSION}                              ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  To start:   tmux attach -t {FORK_SESSION}                 ║
║                                                            ║
║  Controls:                                                 ║
║    Tab      - Switch between Claude instances              ║
║    1-{N}    - Jump to specific instance                    ║
║    q        - Quit mprocs (ends session)                   ║
║    Ctrl+b d - Detach (keep running in background)          ║
║                                                            ║
║  Workspaces: {FORK_DIR}/                                   ║
║    claude-1/ through claude-{N}/ (git worktrees)           ║
║                                                            ║
║  Cleanup:    ./cleanup-fork.sh (generated below)           ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

Also generate a cleanup script:

```bash
cat > "$FORK_DIR/cleanup-fork.sh" << EOF
#!/bin/bash
# Cleanup script for $FORK_SESSION

# Kill tmux session
tmux kill-session -t $FORK_SESSION 2>/dev/null

# Remove git worktrees
cd $SOURCE_PATH
for i in $(seq 1 $N); do
    git worktree remove "$FORK_DIR/claude-\$i" --force 2>/dev/null
done

# Remove temp directory
rm -rf $FORK_DIR

echo "Cleaned up $FORK_SESSION"
EOF
chmod +x "$FORK_DIR/cleanup-fork.sh"
echo "Cleanup script: $FORK_DIR/cleanup-fork.sh"
```

Replace `{FORK_SESSION}`, `{FORK_DIR}`, and `{N}` with actual values.

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `/fork 3 "task"` | 3 instances on current dir |
| `/fork 2 "task" ./src` | 2 instances on ./src only |

**Attach to session:**
```bash
tmux attach -t fork-XXXX
```

**List fork sessions:**
```bash
tmux ls | grep fork
```

**In mprocs:**

| Key | Action |
|-----|--------|
| `Tab` | Switch between instances |
| `1-6` | Jump to instance by number |
| `q` | Quit mprocs and session |

**In tmux:**

| Key | Action |
|-----|--------|
| `Ctrl+b d` | Detach (keep running) |
| `Ctrl+b &` | Kill session |

---

## Cleanup

Run the generated cleanup script:

```bash
/tmp/fork-XXXX/cleanup-fork.sh
```

Or manually:

```bash
# Kill the tmux session
tmux kill-session -t fork-XXXX

# Remove git worktrees (from original repo directory)
git worktree remove /tmp/fork-XXXX/claude-1 --force
git worktree remove /tmp/fork-XXXX/claude-2 --force
# ... for each instance

# Remove the temp directory
rm -rf /tmp/fork-XXXX
```

Clean up all fork sessions:

```bash
tmux ls | grep fork | cut -d: -f1 | xargs -I{} tmux kill-session -t {}
git worktree list | grep /tmp/fork | awk '{print $1}' | xargs -I{} git worktree remove {} --force
rm -rf /tmp/fork-*
```

---

## Troubleshooting

**"mprocs not found"**
- Install with: `brew install mprocs`

**"tmux not found"**
- Install with: `brew install tmux`

**"duplicate session"**
- A session with that name already exists
- Run `tmux ls` to see existing sessions
- Kill it with `tmux kill-session -t fork-XXXX`

**"can't attach"**
- Session may have ended (mprocs quit)
- Check with `tmux ls | grep fork`

**"fatal: not a git repository"**
- The skill falls back to cp -R for non-git directories
- Git worktrees only work inside git repos

---

## Example Session

```
User: /fork 3 "implement user authentication"

Claude: Checking prerequisites...
✓ mprocs: /opt/homebrew/bin/mprocs
✓ tmux: /opt/homebrew/bin/tmux

Git repo detected - using worktrees
Creating isolated git worktrees...
Session ID: fork-a3f7
Created worktree: /tmp/fork-a3f7/claude-1
Created worktree: /tmp/fork-a3f7/claude-2
Created worktree: /tmp/fork-a3f7/claude-3

Fork session ready!

╔════════════════════════════════════════════════════════════╗
║  Fork Session: fork-a3f7                                   ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  To start:   tmux attach -t fork-a3f7                      ║
║                                                            ║
║  Controls:                                                 ║
║    Tab      - Switch between Claude instances              ║
║    1-3      - Jump to specific instance                    ║
║    q        - Quit mprocs (ends session)                   ║
║    Ctrl+b d - Detach (keep running in background)          ║
║                                                            ║
║  Workspaces: /tmp/fork-a3f7/                               ║
║    claude-1/ through claude-3/ (git worktrees)             ║
║                                                            ║
║  Cleanup:    /tmp/fork-a3f7/cleanup-fork.sh                ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

## Why Use /fork?

- **Explore alternatives**: Try different architectures simultaneously
- **Race conditions**: Have multiple Claudes tackle the same problem differently
- **A/B testing**: Compare implementation approaches before committing
- **Learning**: See multiple valid solutions to understand tradeoffs
- **Full git history**: Each worktree has complete git access for commits, branches, etc.

---

## Adding /fork to Your Project

To add this skill to another project:

```bash
# From your project root
mkdir -p .claude/skills/fork
curl -o .claude/skills/fork/SKILL.md https://raw.githubusercontent.com/justinwlin/lazy-agent/main/.claude/skills/fork/SKILL.md
```

Or copy the entire skill directory:

```bash
cp -R /path/to/lazy-agent/.claude/skills/fork /your/project/.claude/skills/
```

Make sure mprocs and tmux are installed:

```bash
brew install mprocs tmux
```
