# tmux Cheatsheet

Based on config from `dotfiles/.tmux.conf`

> **Core concept:** Sessions are persistent workspaces that run independently of your terminal.
> Create sessions for each project or agent task, switch between them instantly with `Prefix + s`.
> See `steps/04-tmux.md` for the full philosophy on why sessions matter for AI-assisted development.

## Prefix Key

All commands below start with **Prefix** unless noted:

```
Prefix = Ctrl + A  (our dotfiles rebind from default Ctrl+B)
```

## Session Management

| Action | Command |
|--------|---------|
| New session | `tmux new -s name` |
| List sessions | `tmux ls` |
| Attach to session | `tmux attach -t name` |
| **Detach** | `Prefix + d` |
| **List sessions** | `Prefix + s` |
| **Rename session** | `Prefix + $` |
| Kill session | `tmux kill-session -t name` |

## Windows (Tabs)

| Action | Keybinding |
|--------|------------|
| **New window** | `Prefix + c` |
| **Next window** | `Prefix + n` |
| **Previous window** | `Prefix + p` |
| **Select window** | `Prefix + 0-9` |
| **Rename window** | `Prefix + ,` |
| Close window | `Prefix + &` |
| List windows | `Prefix + w` |

## Pane Splits

| Action | Keybinding |
|--------|------------|
| **Split vertical** | `Prefix + \|` |
| **Split horizontal** | `Prefix + -` |
| Close pane | `Ctrl + d` or `exit` |

## Pane Navigation (No Prefix!)

| Action | Keybinding |
|--------|------------|
| **Move left** | `Ctrl + h` |
| **Move down** | `Ctrl + j` |
| **Move up** | `Ctrl + k` |
| **Move right** | `Ctrl + l` |

## Pane Resize (With Prefix)

| Action | Keybinding |
|--------|------------|
| **Resize left** | `Prefix + h` |
| **Resize down** | `Prefix + j` |
| **Resize up** | `Prefix + k` |
| **Resize right** | `Prefix + l` |
| **Toggle zoom** | `Prefix + m` |

## Copy Mode (Vim-Style)

| Action | Keybinding |
|--------|------------|
| **Enter copy mode** | `Prefix + [` |
| Exit copy mode | `q` or `Esc` |
| Move | `h/j/k/l` |
| Page down | `Ctrl + d` |
| Page up | `Ctrl + u` |
| Search forward | `/` |
| Search backward | `?` |
| Start selection | `Space` |
| Copy and exit | `Enter` |

## Config

| Action | Keybinding |
|--------|------------|
| **Reload config** | `Prefix + r` |

## Quick Reference

```
Navigation:     Ctrl + h/j/k/l  (no prefix)
Splits:         Prefix + | or -
Resize:         Prefix + h/j/k/l
Zoom:           Prefix + m
New window:     Prefix + c
Switch window:  Prefix + n/p/0-9
Detach:         Prefix + d
```

## Common Workflows

### Start a Project

```bash
tmux new -s myproject
```

### Create Dev Layout

```
Prefix + |    # Split for code
Prefix + -    # Split right side for tests
Ctrl + h      # Go back to main pane
```

### Leave and Return

```bash
# Detach
Prefix + d

# Later, return
tmux attach -t myproject
```

## Session-First Workflow (AI Development)

The key to multi-agent workflows: **one session per task**.

### Morning Startup

```bash
# Check what sessions are running
tmux ls

# Attach to where you left off, or create new
tmux attach -t project || tmux new -s project
```

### Running Multiple Agents

```bash
# Session 1: Backend agent
tmux new -s backend
claude  # Agent starts working
Ctrl+A d  # Detach (agent keeps running!)

# Session 2: Frontend agent
tmux new -s frontend
claude  # Different agent
Ctrl+A d  # Detach

# Switch between them instantly
Ctrl+A s  # Fuzzy search sessions
```

### The Handoff

When an agent gets stuck or you need fresh context:

```bash
# Don't kill the session - detach and reference later
Ctrl+A d
tmux new -s project-v2  # Fresh start
# Old session still there if you need to check what was tried
```

### End of Day

```bash
# Just detach - everything persists
Ctrl+A d

# Tomorrow: pick up exactly where you left off
tmux attach -t project
```
