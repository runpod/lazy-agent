# tmux Interactive Tutorial

Teach the user tmux hands-on, one step at a time.

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
- `Ctrl+A` (hold Ctrl, tap A, release both)
- Then tap `|` (pipe character)

Ask: "Do you see two panes side by side?"

If yes, continue. If no, troubleshoot:
- "Make sure you release Ctrl+A before pressing |"
- "The prefix is Ctrl+A, not Ctrl+B (we changed it in the config)"

---

### Part 3: Horizontal Split

Say: "Let's add a horizontal split. Press:"
- `Ctrl+A` then `-` (minus)

Ask: "Now you should have 3 panes - two on left, one on right. See them?"

---

### Part 4: Navigating Panes

Say: "Moving between panes is easy with vim keys. Try these:"
- `Ctrl+h` - move left
- `Ctrl+l` - move right
- `Ctrl+j` - move down
- `Ctrl+k` - move up

Say: "Try moving around. Can you get to each pane?"

---

### Part 5: Zoom

Say: "Sometimes you want one pane fullscreen. Press:"
- `Ctrl+A` then `m`

Say: "The current pane should fill the screen. Press `Ctrl+A m` again to unzoom."

Ask: "Did zoom toggle on and off?"

---

### Part 6: Closing Panes

Say: "To close a pane, just type `exit` or press `Ctrl+d`"

Say: "Try closing one of your panes."

---

### Part 7: Detach and Reattach

Say: "The magic of tmux - sessions persist! Let's detach:"
- `Ctrl+A` then `d`

Say: "You're back in regular terminal. Your session is still running!"

Say: "List sessions with: `tmux ls`"

Say: "Reattach with: `tmux attach -t learning`"

Ask: "Are you back in your session with all the panes?"

---

### Part 8: Quick Reference

Say: "You've learned the essentials! Here's a cheat sheet:"

```
PREFIX = Ctrl+A

Splits:
  Ctrl+A |     vertical split
  Ctrl+A -     horizontal split

Navigation:
  Ctrl+h/j/k/l move between panes

Panes:
  Ctrl+A m     zoom toggle
  Ctrl+d       close pane

Sessions:
  Ctrl+A d     detach
  tmux ls      list sessions
  tmux attach  reattach
```

Say: "There's also a printable cheatsheet at `reference/tmux-cheatsheet.html`"

---

### Wrap Up

Say: "You're ready! The key things to remember:"
- **Prefix is `Ctrl+A`** (not Ctrl+B)
- **Vim keys for navigation** (h/j/k/l)
- **Sessions persist** when you detach

Ask: "Any questions? Want to practice anything again?"

## Tips for Teaching

- Go slow - tmux has a learning curve
- If they get lost, have them `tmux kill-server` and start fresh
- Remind them about Karabiner if installed: "Caps Lock + A is even easier!"
- Encourage experimentation
