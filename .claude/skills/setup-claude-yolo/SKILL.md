# Claude YOLO Setup

Add a simple alias for running Claude Code in YOLO mode (no permission prompts).

**Time estimate: 30 seconds**

---

## What is YOLO Mode?

Say: "YOLO mode runs Claude with `--dangerously-skip-permissions` - no confirmation prompts for commands or file edits."

Say: "It's great for trusted tasks where you want Claude to work autonomously."

---

## Step 1: Add the Alias

Say: "Let's add a `clyolo` alias to your shell config."

```bash
echo 'alias clyolo="claude --dangerously-skip-permissions"' >> ~/.zshrc
source ~/.zshrc
```

Ask: "Done? You now have `clyolo` available."

---

## Step 2: Verify It Works

```bash
which clyolo || alias clyolo
```

Say: "You should see the alias defined."

---

## Usage

| Command | Description |
|---------|-------------|
| `clyolo` | Start Claude in YOLO mode (no prompts) |
| `claude` | Start Claude normally (with prompts) |

---

## When to Use YOLO Mode

**Use `clyolo` when:**
- Running trusted, well-understood tasks
- You want maximum automation speed
- Working in a sandboxed/disposable environment
- Running long batch operations unattended

**Use regular `claude` when:**
- Working with sensitive files or data
- Running unfamiliar operations
- You want to review each action

---

## Security Note

Say: "Important: YOLO mode bypasses safety checks intentionally built into Claude Code."

In YOLO mode:
- Claude won't ask before running shell commands
- Claude won't ask before editing files
- Claude can delete files without confirmation

Say: "Use regular `claude` for sensitive work."

---

## Wrap Up

Say: "That's it! Just remember:"

- `clyolo` = autonomous mode (no prompts)
- `claude` = normal mode (with prompts)

Ask: "Any questions?"
