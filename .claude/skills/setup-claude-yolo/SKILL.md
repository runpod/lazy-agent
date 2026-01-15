# Claude YOLO Setup

Install and configure claude-yolo - a wrapper for managing YOLO and SAFE modes in Claude Code.

**Time estimate: 2-3 minutes**

---

## What is Claude YOLO?

Say: "Claude YOLO is a wrapper that lets you toggle between two modes:"

- **YOLO Mode** `[YOLO]` (yellow) - Bypasses safety confirmations for autonomous operation
- **SAFE Mode** `[SAFE]` (cyan) - Standard Claude Code with all safety checks

Say: "Think of YOLO mode as 'full auto' - Claude won't ask for permission before running commands or editing files. Useful for trusted tasks, but use with caution."

---

## Step 1: Check Prerequisites

```bash
node --version && npm --version
```

Say: "You need Node.js and npm installed. If not, install with `brew install node`."

---

## Step 2: Install claude-yolo

```bash
npm install -g claude-yolo
```

Ask: "Did it install successfully?"

---

## Step 3: First Run Consent

Say: "On first run, you'll see a consent prompt about YOLO mode's security implications."

```bash
cl /STATUS
```

Say: "Read the warning carefully and type 'yes' to accept if you understand the risks."

Ask: "Did you complete the consent prompt?"

---

## Step 4: Understanding the Modes

Say: "The `cl` command is your wrapper for Claude with mode control:"

### Start in YOLO Mode
```bash
cl /YON
```
Say: "This enables YOLO mode and starts Claude. You'll see `[YOLO]` in yellow."

### Start in SAFE Mode
```bash
cl /YOFF
```
Say: "This enables SAFE mode and starts Claude. You'll see `[SAFE]` in cyan."

### Check Current Mode
```bash
cl /STATUS
```
Say: "Shows your current mode without starting Claude."

---

## Step 5: Verify Installation

```bash
which cl
cl /STATUS
```

Ask: "Do you see the mode status?"

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `cl /YON` | Enable YOLO mode and start Claude |
| `cl /YOFF` | Enable SAFE mode and start Claude |
| `cl /STATUS` | Show current mode |
| `cl /HELP` | Show help |
| `cl` | Start Claude in current mode |

---

## When to Use Each Mode

**Use YOLO mode when:**
- Running trusted, well-understood tasks
- You want maximum automation speed
- Working in a sandboxed/disposable environment

**Use SAFE mode when:**
- Working with sensitive files or data
- Running unfamiliar operations
- You want to review each action

---

## Security Warning

Say: "Important: YOLO mode bypasses safety checks intentionally built into Claude Code."

In YOLO mode:
- Claude won't ask before running shell commands
- Claude won't ask before editing files
- Claude can delete files without confirmation

Say: "Always start in SAFE mode for new or sensitive work."

---

## Wrap Up

Say: "You're all set with claude-yolo! Remember:"

- `cl /YON` for autonomous mode (use responsibly)
- `cl /YOFF` for supervised mode (recommended default)
- `cl /STATUS` to check your current mode

Ask: "Any questions about YOLO vs SAFE mode?"
