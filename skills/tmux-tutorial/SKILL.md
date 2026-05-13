---
name: tmux-tutorial
description: "Interactive hands-on tmux tutorial teaching sessions, pane splits, vim-style navigation, session persistence, and multi-agent workflows. Use when user says 'teach me tmux', 'how do I split panes', 'tmux keybindings', 'terminal multiplexer', or asks about managing multiple terminal sessions."
---

# tmux Interactive Tutorial

Teach the user tmux hands-on, one step at a time. Give one instruction at a time, ask if it worked before moving on, and celebrate small wins.

**Note:** This tutorial assumes the lazy-agent custom tmux config (`dotfiles/.tmux.conf`) with PREFIX remapped to Ctrl+A, vim-style pane navigation, and plugin bindings.

## Prerequisites

Verify tmux is installed before starting:

```bash
which tmux && tmux -V || echo "ERROR: tmux not installed"
```

If not installed, install it first (`brew install tmux` on macOS, `sudo apt install tmux` on Linux).

## Before You Start

Check if Karabiner is installed:

```bash
ls /Applications/Karabiner-Elements.app 2>/dev/null && echo "Karabiner: installed" || echo "Karabiner: not installed"
```

**If Karabiner is installed**: Use "Caps Lock + A" as the prefix (Caps Lock acts as Ctrl).
**If not installed**: Use "Ctrl + A" as the prefix.

Adapt your instructions accordingly throughout the tutorial.

## The Lesson Plan

### Part 1: Your First Session

Introduce tmux: "Let's learn tmux! First, create a new session:"

```bash
tmux new -s learning
```

Verify: "You should see a green status bar at the bottom." Wait for confirmation before continuing.

---

### Part 2: Splitting Panes

Instruct: "Now let's split the screen. Press these keys in order:"
- `PREFIX` (Caps Lock + A, or Ctrl + A) - hold, tap A, release
- Then tap `|` (pipe character, usually Shift + backslash)

Verify: "Do you see two panes side by side?"

Troubleshoot if no:
- "Make sure you release the prefix before pressing |"
- "The prefix is Caps Lock + A (or Ctrl + A), not Ctrl + B"

---

### Part 3: Horizontal Split

Instruct: "Let's add a horizontal split. Press `PREFIX` then `-` (minus/dash)."

Verify: "Now you should have 3 panes. See them?"

---

### Part 4: Navigating Panes

Instruct: "Moving between panes uses vim keys — no prefix needed:"

| Key | Direction |
|-----|-----------|
| `Ctrl + h` (or Caps Lock + h) | Left |
| `Ctrl + l` (or Caps Lock + l) | Right |
| `Ctrl + j` (or Caps Lock + j) | Down |
| `Ctrl + k` (or Caps Lock + k) | Up |

Verify: "Try moving around. Can you reach all panes?"

---

### Part 5: Zoom

Instruct: "Sometimes you want one pane fullscreen. Press `PREFIX` then `z` (z for zoom). Press it again to unzoom."

Verify: "Did zoom toggle on and off?"

---

### Part 6: Multiple Sessions

Check current sessions, then create more in the background:

```bash
tmux ls
tmux new-session -d -s test-session
tmux ls
```

Explain: "The `-d` flag creates sessions in the background without leaving the current one. Name sessions after projects (e.g. `tmux new-session -d -s my-project`)."

Verify: "Do you see the new session? Try creating one more with a name you choose."

---

### Part 7: Fuzzy Session Search

Instruct: "Press `PREFIX` then `s` — a popup appears with all your sessions. Type to filter, Enter to switch."

Verify: "Can you switch between your sessions?"

---

### Part 8: New Session from Project

Instruct: "Press `PREFIX` then `n` (n for new) — this fuzzy-searches your project directories. Select one and it creates a session named after that folder, already cd'd into it."

Verify: "Try creating a session from one of your projects."

---

### Part 9: Detach and Reattach

**Important:** Before detaching, ensure user knows how to get back.

Explain: "Sessions persist even when you disconnect. Memorize this: `tmux attach`."

Ask: "What command do you run to get back into tmux?" **Wait for them to respond before continuing.**

Then instruct: "Now press `PREFIX` then `d` to detach. Get back in with:"

```bash
tmux attach              # Reattach to last session
tmux ls                  # List all sessions
tmux attach -t NAME      # Attach to specific session
```

Verify: "Did you make it back?"

---

### Part 10: Advanced Features (Optional)

Ask before proceeding — these are power-user features:

| Binding | Feature |
|---------|---------|
| `PREFIX` + `g` | LazyGit popup (press `q` to close) |
| `PREFIX` + `t` | System monitor (htop/top) popup |
| `PREFIX` + `y` | Synchronize panes — same input to ALL panes |
| `PREFIX` + `Space` | Cycle through preset layouts |
| `PREFIX` + `>` / `<` | Swap pane with next/previous |
| `PREFIX` + `b` | Break pane into its own window |
| `PREFIX` + `Ctrl+s` | Save sessions (tmux-resurrect) |
| `PREFIX` + `Ctrl+r` | Restore sessions after reboot |

Sessions auto-save every 10 minutes with tmux-resurrect. If the machine reboots, start tmux and everything comes back.

---

### Part 11: Quick Reference

For the full keybinding cheat sheet, see [references/CHEATSHEET.md](references/CHEATSHEET.md).

There's also a printable version at `reference/tmux-cheatsheet.html`.

---

### Wrap Up

Summarize key takeaways:
- **Prefix is Caps Lock + A** (or Ctrl + A)
- **Vim keys for navigation** (h/j/k/l with Ctrl, no prefix)
- **Sessions persist** when you detach
- **PREFIX + s** to fuzzy search sessions
- **PREFIX + n** to start new project sessions
- **PREFIX + g** for lazygit popup
- **Sessions survive reboots** with tmux-resurrect

Remind: "Press PREFIX + I (capital I) to install plugins for session persistence."

Point to `reference/tmux-cheatsheet.html` for a printable reference.

If the user gets stuck at any point, `tmux kill-server` resets everything for a fresh start.
