---
title: First Project
time_estimate: 10 min
required: true
dependencies:
  - 05-claude-code
---

# Step 6: Putting It All Together

## The Goal

Let's create a small project using everything we've learned:
- Ghostty as our terminal
- tmux for window management
- Claude Code to help us build

## Exercise: Build a Simple Web Server

We'll create a Node.js server that serves the tmux tutorial.

### Step 1: Set Up tmux Session

```bash
# Open Ghostty
# Create a new tmux session for this project
tmux new -s hello-claude

# Split into panes:
# Ctrl+b | (vertical split)
# Ctrl+b - (horizontal split on right side)

# Layout:
# ┌─────────────┬─────────────┐
# │             │   tests/    │
# │   claude    │   output    │
# │             ├─────────────┤
# │             │   server    │
# └─────────────┴─────────────┘
```

### Step 2: Navigate to Project

In the left pane (your Claude pane):

```bash
cd ~/Developer/work/hello-claude/tmux-tutorial
```

### Step 3: Start Claude Code

```bash
claude
```

### Step 4: Ask Claude to Help

Try these prompts:

```
> look at the project and help me understand what we're building

> install the dependencies

> start the development server in the right pane
```

### Step 5: Practice Navigation

While Claude is working:

1. `Ctrl+l` - Move to right pane
2. `Ctrl+j` - Move to bottom-right pane
3. `Ctrl+h` - Move back to left pane
4. `Ctrl+b m` - Zoom the current pane
5. `Ctrl+b m` - Unzoom

### Step 6: View the Tutorial

Once the server is running, open http://localhost:3000 in your browser.

You should see the interactive tmux tutorial!

### Step 7: Explore with Claude

```
> explain how the tmux tutorial web app works

> add a new section about copy mode

> make the keyboard shortcuts animate when hovered
```

## Challenges

Try these on your own:

### Challenge 1: Add a New Page
Ask Claude to add a page about session management.

### Challenge 2: Improve Styling
Ask Claude to add dark mode support.

### Challenge 3: Add Interactivity
Ask Claude to add a quiz that tests tmux knowledge.

## Workflow Tips

### Tip 1: Keep Claude Visible
Use the largest pane for Claude so you can see suggestions clearly.

### Tip 2: Dedicated Output Pane
Keep one pane for command output (tests, server logs).

### Tip 3: Quick Window Switching
Name your tmux windows:
- `Ctrl+b ,` then type "editor"
- Now you can see "editor" in the status bar

### Tip 4: Session Per Project
```bash
tmux new -s project-a
# work on project a

# Later, switch projects:
Ctrl+b d  # detach
tmux new -s project-b
# work on project b

# Come back to project a:
tmux attach -t project-a
# Everything is still there!
```

## You Did It!

You now have:
- A beautiful, fast terminal (Ghostty)
- A gorgeous, informative prompt (Powerlevel10k)
- Powerful session management (tmux)
- An AI coding assistant (Claude Code)

## What's Next?

1. **Customize** - Tweak your configs to match your preferences
2. **Practice** - Use tmux for a week until the shortcuts are muscle memory
3. **Explore** - Check out the reference materials in `reference/`
4. **Share** - Help the next person get set up!

## Quick Reference

Keep these handy:
- `reference/tmux-cheatsheet.md` - All the tmux shortcuts
- The tmux tutorial at http://localhost:3000

## Troubleshooting

### Something broke?
Ask Claude! That's what it's here for.

### Want to reset tmux config?
```bash
rm ~/.tmux.conf
# Then re-run the setup from step 4
```

### Want to change prompt style?
```bash
p10k configure
```

### Need more help?
Check out:
- tmux manual: `man tmux`
- Claude Code docs: https://docs.anthropic.com/claude-code
- Ghostty docs: https://ghostty.org/docs

---

**Congratulations on completing the setup!** You're now equipped with a powerful, modern development environment. Happy coding!
