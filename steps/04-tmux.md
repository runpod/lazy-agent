---
title: tmux - The Session Revolution
time_estimate: 10 min
required: true
dependencies:
  - 01-prerequisites
---

# Step 4: tmux - The Session Revolution

> **Time:** ~10 minutes
> **Why this matters:** tmux sessions are the foundation for working with multiple AI agents. Without understanding sessions, you're missing 90% of what makes this setup powerful.

## The Problem tmux Solves

Before tmux, here's what working with AI agents looked like:

```
Terminal 1: Claude working on backend API
Terminal 2: Claude working on frontend
Terminal 3: Claude running tests
Terminal 4: Your manual debugging

Reality: 4 separate windows, no connection, context lost when you close them
```

Close your laptop? **Everything is gone.** Switch to a different task? You're juggling windows. Want to hand off to another agent? Good luck explaining where you left off.

## The tmux Mental Model

**Think of tmux sessions as persistent workspaces that exist independently of your terminal.**

```
Your Terminal                    tmux Server (runs in background)
┌─────────────┐                 ┌─────────────────────────────────┐
│             │                 │  Session: "api-work"            │
│   You see   │ ◄──attached──►  │    └─ Claude working on /api    │
│   this      │                 │                                 │
│             │                 │  Session: "frontend"            │
└─────────────┘                 │    └─ Claude working on /ui     │
                                │                                 │
                                │  Session: "tests"               │
                                │    └─ Test runner watching      │
                                └─────────────────────────────────┘
```

Key insight: **Sessions persist even when you're not looking at them.**

- Close your terminal → Sessions keep running
- Detach from a session → Agent keeps working
- Attach to a different session → Instant context switch

## Why This Changes Everything for AI Agents

### 1. Instant Agent Switching

Without tmux:
```bash
# Want to check on frontend agent?
# Close current terminal or open new one
# Navigate to project
# Scroll through history to find context
# Try to remember what was happening
# ⏱️ Time: 30-60 seconds of mental overhead
```

With tmux:
```bash
# Want to check on frontend agent?
# Press: Ctrl+A then s
# Select "frontend" session
# You're there, full context, agent still running
# ⏱️ Time: 2 seconds
```

### 2. Parallel Agent Workflows

```
Session: "cdc-backend"          Session: "cdc-frontend"
┌────────────────────┐          ┌────────────────────┐
│ Claude Agent #1    │          │ Claude Agent #2    │
│ Working on:        │          │ Working on:        │
│ - API endpoints    │          │ - React components │
│ - Database models  │          │ - State management │
│                    │          │                    │
│ Status: Coding...  │          │ Status: Testing... │
└────────────────────┘          └────────────────────┘

You can switch between these INSTANTLY with Prefix+s
Both agents continue working when you're not watching
```

### 3. Session Persistence = Context Persistence

Agent context is expensive. Every time you start a new Claude session:
- Agent has to re-read files
- Agent loses conversation history
- You lose the "flow" of what was happening

With tmux sessions:
- Agent conversation stays intact
- Scrollback history preserved (50,000 lines!)
- Detach Friday, reattach Monday - everything's still there

### 4. The Handoff Pattern

This is how multi-agent work actually flows:

```bash
# Morning: Start API work
tmux new -s api-refactor
claude  # Agent starts working

# Agent gets stuck, needs different approach
# Don't kill it! Detach:
Ctrl+A d

# Start fresh agent with different strategy
tmux new -s api-refactor-v2
claude  # Fresh agent, fresh approach

# Original agent still there if you need to reference it
tmux attach -t api-refactor  # Check what it tried
```

## Installation

```bash
# macOS
brew install tmux

# Verify
tmux -V
# Should show: tmux 3.x
```

## Your First Session

Let's build the muscle memory:

```bash
# Create a named session
tmux new -s learning

# You're now INSIDE the session
# Your prompt should show you're in tmux
```

Try these in order:

1. **Split the screen vertically:**
   ```
   Ctrl+A |
   ```
   (That's Ctrl+A, release, then pipe character)

2. **Split the right pane horizontally:**
   ```
   Ctrl+A -
   ```

3. **Navigate between panes:**
   ```
   Ctrl+h  (left)
   Ctrl+l  (right)
   Ctrl+j  (down)
   Ctrl+k  (up)
   ```
   (No prefix needed - these work directly!)

4. **Zoom a pane to full screen:**
   ```
   Ctrl+A m
   ```
   (Press again to unzoom)

5. **Detach from session:**
   ```
   Ctrl+A d
   ```

You're back at your regular terminal. But the session is still running!

```bash
# See it's still there
tmux ls
# Shows: learning: 1 windows...

# Reattach
tmux attach -t learning
# Everything exactly as you left it!
```

## Session Patterns for AI Development

### Pattern 1: Project Sessions

One session per project, named clearly:

```bash
tmux new -s cdc           # Main project
tmux new -s event-infra   # Infrastructure work
tmux new -s lazy-agent    # This onboarding project
```

Switch between them:
```
Ctrl+A s  → fuzzy search → select
```

### Pattern 2: Agent Sessions

One session per agent task:

```bash
tmux new -s "api-auth"        # Agent working on auth
tmux new -s "api-database"    # Agent working on DB layer
tmux new -s "frontend-forms"  # Agent working on forms
```

This lets you run multiple Claude agents truly in parallel.

### Pattern 3: Dev Layout Session

Standard development layout you use every day:

```bash
tmux new -s dev

# Create your ideal layout:
Ctrl+A |     # Split for code on left, terminal on right
Ctrl+A -     # Split right side for tests below terminal

# Layout:
# ┌──────────────┬──────────────┐
# │              │   terminal   │
# │    code      ├──────────────┤
# │              │    tests     │
# └──────────────┴──────────────┘
```

## The Power Move: Fuzzy Session Switching

Our dotfiles config includes a killer feature:

```
Ctrl+A s  →  Opens fuzzy finder with all sessions
```

Type a few characters, hit enter, you're there. This is why session switching feels instant - you're not clicking through menus or remembering session names.

## Session + Gastown = Multi-Agent Orchestra

When you get to Gastown (Step 7), sessions become even more powerful:

```bash
# Session for your main work
tmux new -s my-hook
gt hook  # See your assigned work
claude   # Work on it

# Meanwhile, in another session...
# (Another agent picks up a different hook)

# Detach, check on other agents
Ctrl+A d
tmux attach -t other-agent-session
```

Each Gastown "hook" can run in its own session. You're the conductor, switching between agents as needed.

## Common Commands Reference

### Session Management
| Command | What it does |
|---------|-------------|
| `tmux new -s name` | Create new named session |
| `tmux ls` | List all sessions |
| `tmux attach -t name` | Attach to session |
| `Ctrl+A d` | Detach from current session |
| `Ctrl+A s` | Fuzzy-search sessions |
| `Ctrl+A $` | Rename current session |

### Inside a Session
| Command | What it does |
|---------|-------------|
| `Ctrl+A \|` | Split pane vertically |
| `Ctrl+A -` | Split pane horizontally |
| `Ctrl+h/j/k/l` | Navigate panes (vim-style) |
| `Ctrl+A m` | Zoom/unzoom pane |
| `Ctrl+A c` | New window (tab) |
| `Ctrl+A n/p` | Next/previous window |

## Verification Checklist

Run through this to make sure you've got it:

- [ ] `tmux -V` shows version 3.x
- [ ] You can create a session: `tmux new -s test`
- [ ] You can split panes: `Ctrl+A |` and `Ctrl+A -`
- [ ] You can navigate: `Ctrl+h/j/k/l`
- [ ] You can detach: `Ctrl+A d`
- [ ] You can reattach: `tmux attach -t test`
- [ ] You can list sessions: `tmux ls`
- [ ] You can fuzzy-switch: `Ctrl+A s`

Clean up:
```bash
tmux kill-session -t test
```

## The Mindset Shift

Before tmux: Your terminal is your workspace. Close it, lose everything.

After tmux: Your terminal is just a **window** into persistent workspaces. The work continues whether you're watching or not. Switching between contexts takes 2 seconds, not 2 minutes.

This is why experienced developers never work without tmux. And it's why multi-agent AI workflows are only practical with session management.

## Troubleshooting

**"Command not found: tmux"**
```bash
brew install tmux
```

**"Sessions aren't persisting after reboot"**
That's expected! Sessions run in memory. Use `tmux-resurrect` plugin (included in our dotfiles) to save/restore sessions across reboots.

**"Ctrl+A isn't working"**
Make sure you installed the dotfiles:
```bash
./dotfiles/install.sh
tmux source ~/.tmux.conf
```

**"I'm stuck in copy mode"**
Press `q` or `Esc` to exit copy mode.

## What's Next?

You now understand WHY sessions matter. In the next steps, we'll put this to work:

- **Step 5: Claude Code** - Run AI agents in tmux sessions
- **Step 7: Gastown** - Orchestrate multiple agents across sessions
- **Reference**: See `reference/tmux-cheatsheet.md` for the full keybinding reference

---

**Key Takeaway**: tmux sessions are not just "nice to have" - they're the infrastructure that makes AI-assisted development practical. Every second you save context-switching adds up to hours saved per week.
