# tmux Interactive Tutorial

Teach the user tmux hands-on, one step at a time.

## Before You Start

Check if Karabiner is installed:

```bash
ls /Applications/Karabiner-Elements.app 2>/dev/null && echo "Karabiner: installed" || echo "Karabiner: not installed"
```

**If Karabiner is installed**: Use "Caps Lock + A" as the prefix (Caps Lock acts as Ctrl).
**If not installed**: Use "Ctrl + A" as the prefix.

Adapt your instructions accordingly throughout the tutorial.

## How to Teach

1. **Give one instruction at a time**
2. **Ask if it worked before moving on**
3. **Celebrate small wins**
4. **If something doesn't work, help debug**

## The Lesson Plan

### Part 1: Your First Session

Say: "Let's learn tmux! First, create a new session:"

```bash
tmux new -s learning
```

Ask: "Did it work? You should see a green status bar at the bottom."

Wait for confirmation before continuing.

---

### Part 2: Splitting Panes

Say: "Now let's split the screen. Press these keys in order:"
- `PREFIX` (Caps Lock + A, or Ctrl + A) - hold, tap A, release
- Then tap `|` (pipe character, usually Shift + backslash)

Ask: "Do you see two panes side by side?"

If yes, continue. If no, troubleshoot:
- "Make sure you release the prefix before pressing |"
- "The prefix is Caps Lock + A (or Ctrl + A), not Ctrl + B"

---

### Part 3: Horizontal Split

Say: "Let's add a horizontal split. Press:"
- `PREFIX` then `-` (minus/dash)

Ask: "Now you should have 3 panes. See them?"

---

### Part 4: Navigating Panes

Say: "Moving between panes is easy with vim keys:"
- `Ctrl + h` (or Caps Lock + h) - move left
- `Ctrl + l` (or Caps Lock + l) - move right
- `Ctrl + j` (or Caps Lock + j) - move down
- `Ctrl + k` (or Caps Lock + k) - move up

Say: "No prefix needed - just hold Ctrl (or Caps Lock) and tap the direction."

Ask: "Try moving around. Can you reach all panes?"

---

### Part 5: Zoom

Say: "Sometimes you want one pane fullscreen. Press:"
- `PREFIX` then `z` (z for zoom)

Say: "The current pane should fill the screen. Press PREFIX + z again to unzoom."

Ask: "Did zoom toggle on and off?"

---

### Part 6: Multiple Sessions

First, check what sessions they currently have:

```bash
tmux ls
```

Say: "You currently have [X] session(s) running. Let's create more WITHOUT leaving this one."

Say: "The `-d` flag creates sessions in the background. Try creating a test session:"

```bash
tmux new-session -d -s test-session
```

Say: "Now check your sessions again:"

```bash
tmux ls
```

Ask: "Do you see the new session in the list?"

Say: "You can name sessions anything - usually after projects. For example:"
```bash
tmux new-session -d -s my-project
```

Ask: "Try creating one more with a name you choose. What did you name it?"

---

### Part 7: Fuzzy Session Search

Say: "Here's the magic - fuzzy search your sessions. Press:"
- `PREFIX` then `s`

Say: "A popup appears with all your sessions. Type to filter, Enter to switch."

Ask: "Can you switch between your sessions?"

---

### Part 8: New Session from Project

Say: "Even better - create sessions from your project folders. Press:"
- `PREFIX` then `n` (n for new)

Say: "This fuzzy-searches your project directories. Select one and it creates a session named after that folder, already cd'd into it."

Ask: "Try creating a session from one of your projects."

---

### Part 9: Detach and Reattach

Say: "Sessions persist even when you disconnect. But BEFORE we detach, memorize this command:"

```bash
tmux attach
```

Say: "This is how you get back. Say it out loud: 'tmux attach'"

Ask: "What command do you run to get back into tmux? (Type it to confirm you've got it)"

**WAIT for them to respond with `tmux attach` before continuing!**

Say: "Perfect! Now you're safe to detach. Press:"
- `PREFIX` then `d`

Say: "You're back in regular terminal. Your sessions are still running! Now get back in:"

```bash
tmux attach
```

Say: "If you have multiple sessions, use:"
```bash
tmux ls              # List all sessions
tmux attach -t NAME  # Attach to specific session
```

Ask: "Did you make it back?"

---

### Part 10: Advanced Features (Optional)

Say: "Want to see some power-user features? These are optional but super useful."

#### LazyGit Popup
- `PREFIX` then `g` - Opens lazygit in a popup overlay

Say: "Try it if you have lazygit installed. Press `q` to close."

#### System Monitor
- `PREFIX` then `t` - Opens htop/top in a popup

#### Synchronize Panes
Say: "This sends the same input to ALL panes at once. Great for running commands on multiple servers."
- `PREFIX` then `y` - Toggle sync on/off

Ask: "Want to try it? Split into 2 panes and toggle sync, then type something."

#### Rearranging Panes
- `PREFIX` then `Space` - Cycle through preset layouts
- `PREFIX` then `>` - Swap pane with next
- `PREFIX` then `<` - Swap pane with previous
- `PREFIX` then `b` - Break pane into its own window

#### Session Persistence
Say: "With tmux-resurrect, your sessions survive reboots!"
- `PREFIX` then `Ctrl+s` - Save sessions
- `PREFIX` then `Ctrl+r` - Restore sessions

Say: "Sessions auto-save every 10 minutes. If your machine reboots, just start tmux and everything comes back."

---

### Part 11: Quick Reference

Say: "Here's the complete cheat sheet:"

```
PREFIX = Caps Lock + A (or Ctrl + A)

Splits:
  PREFIX |       vertical split
  PREFIX -       horizontal split

Navigation:
  Ctrl + h/j/k/l move between panes (no prefix)

Panes:
  PREFIX z       zoom toggle
  PREFIX x       kill pane
  PREFIX b       break pane to window
  PREFIX Space   cycle layouts
  PREFIX > / <   swap panes

Sessions:
  PREFIX d       detach
  PREFIX s       fuzzy search sessions
  PREFIX n       new session from project
  PREFIX y       sync panes toggle
  tmux ls        list sessions
  tmux attach    reattach

Popups:
  PREFIX g       lazygit
  PREFIX t       htop/top

Persistence:
  PREFIX Ctrl+s  save sessions
  PREFIX Ctrl+r  restore sessions
```

Say: "There's also a printable cheatsheet at `reference/tmux-cheatsheet.html`"

---

### Wrap Up

Say: "You're ready! The key things to remember:"
- **Prefix is Caps Lock + A** (or Ctrl + A)
- **Vim keys for navigation** (h/j/k/l with Ctrl)
- **Sessions persist** when you detach
- **PREFIX + s** to fuzzy search sessions
- **PREFIX + n** to start new project sessions
- **PREFIX + g** for lazygit popup
- **Sessions survive reboots** with tmux-resurrect

Say: "To install the plugins for session persistence, press PREFIX + I (capital I) in tmux."

Ask: "Any questions? Want to practice anything again?"

## Tips for Teaching

- Go slow - tmux has a learning curve
- If they get lost, have them `tmux kill-server` and start fresh
- With Karabiner, Caps Lock + A is much more ergonomic than reaching for Ctrl
- Encourage experimentation
- Remind them to run PREFIX + I to install plugins after setup
