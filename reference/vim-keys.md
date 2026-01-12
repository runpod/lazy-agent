# Vim Key Reference

These keys work in tmux, Neovim, and many other tools.

## Navigation Keys

```
     k
     ↑
 h ← · → l
     ↓
     j
```

| Key | Direction | Mnemonic |
|-----|-----------|----------|
| `h` | Left | **H**ome (leftmost key) |
| `j` | Down | **J**ump down (j drops below line) |
| `k` | Up | **K**ick up |
| `l` | Right | Right (rightmost key) |

## Why These Keys?

On the original keyboard Bill Joy used when creating vi (the ADM-3A), these keys had arrows printed on them. The layout stuck!

## Where They Work

### tmux (this config)

| Context | Keys |
|---------|------|
| Navigate panes | `Ctrl + h/j/k/l` |
| Resize panes | `Prefix + h/j/k/l` |
| Copy mode | `h/j/k/l` |

### Neovim/Vim

| Context | Keys |
|---------|------|
| Move cursor | `h/j/k/l` |
| Move between splits | `Ctrl + w` then `h/j/k/l` |
| (With vim-tmux-navigator) | `Ctrl + h/j/k/l` |

### Other Common Places

- **Less/Man pages**: `j/k` to scroll
- **Lazygit**: `h/j/k/l` navigation
- **Many TUI apps**: Follow vim conventions

## Tips

1. **Practice in Neovim first** - Get comfortable with hjkl there
2. **Disable arrow keys** - Forces you to learn (optional but effective)
3. **Think in words** - `w` forward word, `b` back word, etc.

## Extended Motions (Vim)

| Key | Motion |
|-----|--------|
| `w` | Forward one word |
| `b` | Back one word |
| `e` | End of word |
| `0` | Start of line |
| `$` | End of line |
| `gg` | Start of file |
| `G` | End of file |
| `{` | Previous paragraph |
| `}` | Next paragraph |

## Muscle Memory Tip

Put your right hand on the keyboard with:
- Index finger on `j`
- Middle finger on `k`
- Ring finger on `l`
- Pinky ready for modifiers

This is the "home row" for vim navigation.
