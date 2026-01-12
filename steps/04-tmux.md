# Step 4: tmux - Terminal Multiplexer

## What is tmux?

tmux lets you:
- **Split your terminal** into multiple panes
- **Create tabs** (called "windows" in tmux)
- **Keep sessions alive** even when you disconnect
- **Navigate with keyboard only** - no mouse needed

Think of it as a window manager for your terminal.

## Why tmux?

1. **Persistent sessions** - Close your terminal, your work continues
2. **Remote work** - SSH into a server, start tmux, disconnect, reconnect later - everything is still there
3. **Organized workspace** - One session per project, multiple panes for code/tests/logs
4. **Vim-style navigation** - Move between panes with Ctrl+h/j/k/l

## Installation

```bash
brew install tmux
tmux -V
```

## Apply Configuration

We'll use the dotfiles tmux config which has vim-style bindings.

```bash
# Link the config from dotfiles (RECOMMENDED)
ln -sf ~/Developer/.dotfiles/.tmux.conf ~/.tmux.conf
```

The dotfiles config includes:
- `Ctrl+h/j/k/l` for vim-style pane navigation
- `|` and `-` for intuitive splits
- Neovim integration (seamless navigation between vim and tmux)
- Mouse support
- Sensible defaults

If you want to see what's in it or create your own:

```bash
cat > ~/.tmux.conf << 'EOF'
### --- Prefix ---
set -g prefix C-b
unbind C-b
bind C-b send-prefix

# Terminal colors
set -g default-terminal "tmux-256color"
set -as terminal-overrides ',*:Tc'

### --- Reload Config ---
unbind r
bind r source-file ~/.tmux.conf \; display-message "Config reloaded!"

### --- Sensible Defaults ---
set -g mouse on
set -g history-limit 10000
set -g allow-rename off
setw -g mode-keys vi

### --- Status Bar ---
set -g status-interval 5
set -g status-left "#[fg=green]#S"
set -g status-right "#[fg=cyan]%Y-%m-%d #[fg=white]%H:%M"
set -g status-justify centre

### --- Vim-style Navigation ---
bind -n C-h select-pane -L
bind -n C-j select-pane -D
bind -n C-k select-pane -U
bind -n C-l select-pane -R

### --- Splits ---
bind | split-window -h
bind - split-window -v

### --- Resize ---
bind -r h resize-pane -L 5
bind -r j resize-pane -D 5
bind -r k resize-pane -U 5
bind -r l resize-pane -R 5
bind m resize-pane -Z
EOF
```

## Core Concepts

### The Prefix Key

Almost all tmux commands start with the **prefix key**: `Ctrl+b`

You press `Ctrl+b`, release, then press the next key.

Example: To split vertically, press `Ctrl+b`, release, press `|`

### Sessions, Windows, Panes

```
Session (project workspace)
├── Window 1 (like a tab)
│   ├── Pane 1 (split)
│   └── Pane 2 (split)
└── Window 2
    └── Pane 1
```

## Essential Commands

### Starting tmux

```bash
# New session
tmux

# New named session
tmux new -s myproject

# List sessions
tmux ls

# Attach to session
tmux attach -t myproject

# Detach from session (keep it running)
# Press: Ctrl+b d
```

### Pane Management

| Action | Keybinding |
|--------|------------|
| Split horizontally | `Prefix + -` |
| Split vertically | `Prefix + \|` |
| Navigate (vim-style) | `Ctrl + h/j/k/l` |
| Resize pane | `Prefix + h/j/k/l` |
| Zoom/unzoom pane | `Prefix + m` |
| Close pane | `Ctrl + d` or `exit` |

### Window (Tab) Management

| Action | Keybinding |
|--------|------------|
| New window | `Prefix + c` |
| Next window | `Prefix + n` |
| Previous window | `Prefix + p` |
| Select window | `Prefix + 0-9` |
| Rename window | `Prefix + ,` |
| Close window | `Prefix + &` |

### Session Management

| Action | Keybinding |
|--------|------------|
| Detach | `Prefix + d` |
| List sessions | `Prefix + s` |
| Rename session | `Prefix + $` |

## Let's Practice!

### Exercise 1: Create Your First Session

```bash
# Start a new session called "learning"
tmux new -s learning
```

You're now inside tmux! Notice the green bar at the bottom.

### Exercise 2: Split Panes

1. Press `Ctrl+b` then `|` (vertical split)
2. Press `Ctrl+b` then `-` (horizontal split)
3. Navigate: `Ctrl+h` (left), `Ctrl+l` (right), `Ctrl+j` (down), `Ctrl+k` (up)

### Exercise 3: Zoom

1. Press `Ctrl+b` then `m` to zoom current pane
2. Press again to unzoom

### Exercise 4: Windows

1. Press `Ctrl+b` then `c` (new window)
2. Notice the status bar shows `[0] [1]`
3. Press `Ctrl+b` then `0` to go back to first window

### Exercise 5: Detach and Reattach

1. Press `Ctrl+b` then `d` (detach)
2. You're back in regular terminal
3. Run `tmux ls` to see your session
4. Run `tmux attach -t learning` to go back

## Workflow Example

A typical development workflow:

```bash
# Start a project session
tmux new -s myapp

# Window 0: Editor
# (already here)

# Create Window 1: Server
Ctrl+b c
npm run dev

# Create Window 2: Git/misc
Ctrl+b c

# Navigate between windows
Ctrl+b 0  # Editor
Ctrl+b 1  # Server
Ctrl+b 2  # Git

# In editor window, split for tests
Ctrl+b |
npm test --watch
```

## Verification Checklist

- [ ] `tmux -V` shows version
- [ ] Can create a named session
- [ ] Can split panes with `|` and `-`
- [ ] Can navigate with `Ctrl+h/j/k/l`
- [ ] Can zoom with `Prefix + m`
- [ ] Can detach and reattach

## Common Issues

### Ctrl+h/j/k/l not working?

Make sure the config is loaded:
```bash
tmux source-file ~/.tmux.conf
```

### Mouse not working?

The config enables mouse, but you need to reload:
```bash
# Inside tmux, press:
Ctrl+b r
```

### Colors look wrong?

Add this to your `.zshrc`:
```bash
export TERM=xterm-256color
```

## Interactive Tutorial

For more practice, run the web tutorial:

```bash
cd tmux-tutorial
npm install
npm run dev
# Open http://localhost:3000
```

## Next Step

Now let's set up Claude Code and learn how to use it effectively.
