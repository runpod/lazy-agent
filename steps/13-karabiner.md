# Step 10: Karabiner-Elements - Keyboard Customization

## What is Karabiner-Elements?

Karabiner-Elements is a powerful keyboard customizer for macOS. The dotfiles configure it to turn Caps Lock into a superpower:

- **Tap Caps Lock** → Escape (perfect for vim)
- **Hold Caps Lock** → Control (for all Ctrl combos)
- **Caps Lock + A** → Ctrl+B (tmux prefix shortcut)

This means you never have to reach for Escape or do the awkward Ctrl+B chord again.

## Why This Matters

1. **Vim users**: Escape is used constantly. Caps Lock is right there on home row.
2. **Tmux users**: The prefix `Ctrl+B` is awkward. `Caps Lock + A` is much faster.
3. **Ergonomics**: Less hand movement = less strain = more productivity.

## Installation

```bash
brew install --cask karabiner-elements
```

After installation, you'll need to grant permissions:
1. Open Karabiner-Elements from Applications
2. Follow the prompts to enable Input Monitoring in System Preferences
3. You may need to restart after granting permissions

## Verify Installation

```bash
ls /Applications/Karabiner-Elements.app && echo "Karabiner: installed"
```

## Configuration from Dotfiles

The dotfiles already include a Karabiner config. The install script will set it up:

```bash
# Run the dotfiles installer (if not already done)
~/Developer/.dotfiles/install.sh
```

Or manually symlink just the Karabiner config:

```bash
mkdir -p ~/.config/karabiner
ln -sf ~/Developer/.dotfiles/.config/karabiner/karabiner.json ~/.config/karabiner/karabiner.json
```

### What the Config Does

The dotfiles Karabiner config at `~/.dotfiles/.config/karabiner/karabiner.json` includes:

1. **Caps Lock → Ctrl/Escape**
   - Tap Caps Lock = Escape
   - Hold Caps Lock = Control

2. **Ctrl+A → Ctrl+B (tmux prefix)**
   - Since Caps Lock = Ctrl, this means Caps+A = Ctrl+B
   - Much easier than reaching for Ctrl+B!

## Testing Your Setup

### Test 1: Caps Lock as Escape

1. Open a terminal
2. Start vim: `vim`
3. Press `i` to enter insert mode
4. Type some text
5. **Tap Caps Lock** - you should exit insert mode (same as pressing Escape)
6. Type `:q!` and Enter to quit

### Test 2: Caps Lock + A as Tmux Prefix

1. Start tmux: `tmux new -s test`
2. **Hold Caps Lock + A**, then release, then press `|`
3. You should get a vertical split (same as `Ctrl+B |`)
4. **Hold Caps Lock + A**, then press `d` to detach

If both tests work, you're all set!

## Key Bindings Summary

| Action | Old Way | New Way |
|--------|---------|---------|
| Escape (vim) | `Esc` key | Tap `Caps Lock` |
| Tmux prefix | `Ctrl + B` | `Caps Lock + A` |
| Any Ctrl combo | `Ctrl + X` | `Caps Lock + X` |

## Workflow Example

With this setup, a typical vim+tmux workflow becomes:

```
# Start tmux session
tmux new -s project

# Split vertically (Caps+A then |)
Caps+A, |

# Open vim in left pane
vim file.ts

# Edit in vim...
i          # Enter insert mode
(type)
CapsLock   # Exit insert mode (no reaching for Esc!)

# Navigate to right pane
Ctrl+l     # (vim-style pane navigation)

# Run tests
npm test

# Switch back to vim
Ctrl+h

# Zoom current pane (Caps+A then m)
Caps+A, m
```

## Troubleshooting

### Caps Lock not working as Escape?

1. Check that Karabiner-Elements is running (look for icon in menu bar)
2. Verify the config is symlinked: `ls -la ~/.config/karabiner/karabiner.json`
3. Make sure you've granted Input Monitoring permission
4. Try restarting Karabiner-Elements from the menu bar icon

### Config not loading?

Re-run the dotfiles installer:
```bash
~/Developer/.dotfiles/install.sh
```

Or manually symlink:
```bash
ln -sf ~/Developer/.dotfiles/.config/karabiner/karabiner.json ~/.config/karabiner/karabiner.json
```

### Want to customize further?

Edit the dotfiles config directly:
```bash
vim ~/Developer/.dotfiles/.config/karabiner/karabiner.json
```

Or use Karabiner-Elements GUI to add rules, then copy the changes back to dotfiles.

## Verification Checklist

- [ ] Karabiner-Elements installed and running
- [ ] Input Monitoring permission granted
- [ ] Config symlinked from dotfiles
- [ ] Tap Caps Lock produces Escape
- [ ] Caps Lock + A produces Ctrl+B (tmux prefix)

## Going Further

Karabiner can do much more:
- Remap any key to any other key
- Create application-specific bindings
- Handle multiple keyboards differently
- Create complex key sequences

Check out https://ke-complex-modifications.pqrs.org/ for community rules.

## Next Steps

With your keyboard optimized, you're ready to fly through tmux and vim without awkward key combinations. Your hands will thank you!
