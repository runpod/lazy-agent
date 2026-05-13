# tmux Quick Reference

Assumes the lazy-agent custom tmux config (PREFIX = Ctrl+A, vim-style navigation).

## Prefix

`PREFIX` = Caps Lock + A (with Karabiner) or Ctrl + A

## Splits

| Binding | Action |
|---------|--------|
| `PREFIX` + `\|` | Vertical split |
| `PREFIX` + `-` | Horizontal split |

## Navigation

| Binding | Action |
|---------|--------|
| `Ctrl + h/j/k/l` | Move between panes (no prefix needed) |

## Panes

| Binding | Action |
|---------|--------|
| `PREFIX` + `z` | Zoom/unzoom pane |
| `PREFIX` + `x` | Kill pane |
| `PREFIX` + `b` | Break pane to window |
| `PREFIX` + `Space` | Cycle layouts |
| `PREFIX` + `>` / `<` | Swap panes |

## Sessions

| Binding | Action |
|---------|--------|
| `PREFIX` + `d` | Detach |
| `PREFIX` + `s` | Fuzzy search sessions |
| `PREFIX` + `n` | New session from project |
| `PREFIX` + `y` | Sync panes toggle |
| `tmux ls` | List sessions |
| `tmux attach` | Reattach to last session |
| `tmux attach -t NAME` | Attach to specific session |

## Popups

| Binding | Action |
|---------|--------|
| `PREFIX` + `g` | LazyGit |
| `PREFIX` + `t` | htop/top |

## Persistence (tmux-resurrect)

| Binding | Action |
|---------|--------|
| `PREFIX` + `Ctrl+s` | Save sessions |
| `PREFIX` + `Ctrl+r` | Restore sessions |

Sessions auto-save every 10 minutes.
