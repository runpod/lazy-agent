# Neovim + LazyVim Setup

Set up Neovim with LazyVim - a modern, pre-configured Neovim distribution.

## Before You Start

Say: "This is OPTIONAL. Most Claude Code users are fine with VS Code or their existing editor. Neovim has a steep learning curve but is incredibly powerful once learned."

Ask: "Have you used Vim before? (Even just the basics like `i`, `Esc`, `:wq`)"

- If **yes**: "Great, LazyVim will feel familiar but way more powerful."
- If **no**: "I'd recommend starting with basic vim motions first. Want me to teach the basics, or skip this for now?"

---

## Part 1: Install Neovim

Check if already installed:
```bash
which nvim && nvim --version | head -1 || echo "Neovim not installed"
```

If not installed:
```bash
brew install neovim
```

Verify:
```bash
nvim --version | head -1
```

Ask: "Did it show Neovim version 0.9 or higher?"

---

## Part 2: Backup Existing Config (If Any)

Say: "Let's backup any existing Neovim config before installing LazyVim."

```bash
# Backup existing configs
mv ~/.config/nvim ~/.config/nvim.bak 2>/dev/null
mv ~/.local/share/nvim ~/.local/share/nvim.bak 2>/dev/null
mv ~/.local/state/nvim ~/.local/state/nvim.bak 2>/dev/null
mv ~/.cache/nvim ~/.cache/nvim.bak 2>/dev/null
echo "Backups created (if any existed)"
```

---

## Part 3: Install LazyVim

Say: "LazyVim is a pre-configured Neovim setup with sensible defaults, LSP, treesitter, and more."

```bash
git clone https://github.com/LazyVim/starter ~/.config/nvim
rm -rf ~/.config/nvim/.git
```

Say: "Now open Neovim and let it install plugins:"

```bash
nvim
```

Say: "Wait for all plugins to install. You'll see progress in the bottom. This takes 1-2 minutes."

Ask: "Did the plugins finish installing? Press `q` to close the Lazy window when done."

---

## Part 4: First Look

Say: "Let's explore what you just installed. Open Neovim:"

```bash
nvim
```

Say: "Press `Space` (the leader key) and wait. You'll see a menu of commands."

Key things to try:
- `Space + f + f` - Find files (fuzzy search)
- `Space + /` - Search in files (grep)
- `Space + e` - File explorer
- `Space + Space` - Find recent files

Ask: "Try `Space + f + f` to search for files. Does the fuzzy finder open?"

---

## Part 5: Essential Keybindings

Say: "Here are the most important keys in LazyVim:"

### Navigation
| Key | Action |
|-----|--------|
| `h/j/k/l` | Move left/down/up/right |
| `w/b` | Jump word forward/backward |
| `gg/G` | Go to top/bottom of file |
| `Ctrl+d/u` | Page down/up |

### Editing
| Key | Action |
|-----|--------|
| `i` | Insert mode (before cursor) |
| `a` | Insert mode (after cursor) |
| `o/O` | New line below/above |
| `dd` | Delete line |
| `yy` | Copy line |
| `p` | Paste |
| `u` | Undo |
| `Ctrl+r` | Redo |

### Leader Commands (Space + ...)
| Key | Action |
|-----|--------|
| `Space + f + f` | Find files |
| `Space + /` | Search in project |
| `Space + e` | File explorer |
| `Space + b + d` | Close buffer |
| `Space + q + q` | Quit |

Ask: "Try opening a file with `Space + f + f`, make a small edit, and save with `:w`"

---

## Part 6: tmux + Neovim Integration

Say: "Your tmux config already supports seamless navigation between tmux panes and Neovim splits!"

Try this:
1. Open a file in Neovim
2. Split with `Ctrl+w + v` (vertical) or `Ctrl+w + s` (horizontal)
3. Use `Ctrl+h/j/k/l` to navigate between Neovim splits AND tmux panes seamlessly

Ask: "Did the navigation work across both Neovim and tmux?"

---

## Part 7: Language Support

Say: "LazyVim auto-installs language servers. Open a file of your favorite language:"

```bash
nvim test.py   # or test.ts, test.go, etc.
```

Say: "You should see:"
- Syntax highlighting
- Auto-completion (start typing)
- Error diagnostics
- Hover info (press `K` on a symbol)

If language server isn't working:
```vim
:Mason
```

Say: "This opens the package manager. Search for your language and install the LSP."

---

## Part 8: Customization

Say: "LazyVim is customizable. Your config lives at:"

```
~/.config/nvim/
├── init.lua           # Entry point
├── lua/
│   ├── config/
│   │   ├── keymaps.lua    # Custom keybindings
│   │   ├── options.lua    # Editor options
│   │   └── lazy.lua       # Plugin manager config
│   └── plugins/
│       └── *.lua          # Add your plugins here
```

Say: "To add a plugin, create a file in `~/.config/nvim/lua/plugins/`"

Example - add a plugin:
```lua
-- ~/.config/nvim/lua/plugins/my-plugins.lua
return {
  { "github/copilot.vim" },  -- Example plugin
}
```

---

## Part 9: Quick Reference

```
MODES:
  Normal mode     Default, for navigation
  Insert mode     Press 'i' to enter, 'Esc' to exit
  Visual mode     Press 'v' to select text
  Command mode    Press ':' for commands

ESSENTIAL:
  :w              Save
  :q              Quit
  :wq             Save and quit
  :q!             Quit without saving
  u               Undo
  Ctrl+r          Redo

NAVIGATION:
  h/j/k/l         Left/down/up/right
  w/b             Word forward/backward
  0/$             Start/end of line
  gg/G            Top/bottom of file

EDITING:
  i/a             Insert before/after cursor
  o/O             New line below/above
  dd              Delete line
  yy              Copy line
  p               Paste

LAZYVIM (Space + ...):
  Space           Show command menu
  Space + f + f   Find files
  Space + /       Search in project
  Space + e       File explorer
  Space + b + d   Close buffer
```

---

## Part 10: Learning Path

Say: "Neovim takes time to master. Here's a learning path:"

1. **Week 1**: Basic navigation (hjkl), insert mode, save/quit
2. **Week 2**: Word motions (w/b), visual mode, copy/paste
3. **Week 3**: LazyVim features (fuzzy find, file explorer)
4. **Week 4**: Splits, buffers, tabs
5. **Ongoing**: Learn one new thing per day

Say: "Run `:Tutor` in Neovim for a built-in interactive tutorial."

---

## Alternatives

Say: "If LazyVim feels too heavy, alternatives include:"

| Option | Description |
|--------|-------------|
| **AstroNvim** | Similar to LazyVim, different defaults |
| **NvChad** | Faster, more minimal |
| **kickstart.nvim** | Minimal starting point to build your own |
| **Vanilla Neovim** | Configure everything yourself |

---

## Wrap Up

Say: "You now have a powerful, modern editor! Remember:"

- **Space** is your friend - it opens the command menu
- **:Tutor** for the built-in tutorial
- **:Mason** to install language servers
- **:Lazy** to manage plugins

Say: "It takes 2-4 weeks to get comfortable, but then you'll be incredibly fast."

Ask: "Any questions? Want to practice anything?"

## Tips for Teaching

- Go VERY slow - Neovim overwhelms beginners
- Focus on just hjkl and :wq for the first session
- Don't try to teach everything at once
- Suggest they keep VS Code as backup while learning
- Remind them: "It's okay to feel slow at first"
