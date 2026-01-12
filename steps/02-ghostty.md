# Step 2: Ghostty Terminal

## What is Ghostty?

Ghostty is a terminal emulator built by Mitchell Hashimoto (founder of HashiCorp, creator of Vagrant, Terraform, etc.). It's:

- **GPU-accelerated** - Renders using your graphics card, incredibly smooth
- **Fast** - Optimized for performance
- **Native** - Built for macOS, feels like a real Mac app
- **Modern** - Supports all the latest terminal features

## Why Ghostty over iTerm2?

| Feature | Ghostty | iTerm2 |
|---------|---------|--------|
| Speed | Blazing fast | Good |
| GPU rendering | Yes | Partial |
| Memory usage | Low | Higher |
| Native feel | Excellent | Good |
| Config | Simple text file | GUI + text |

## Installation

### Install via Homebrew

```bash
brew install --cask ghostty
```

### Verify installation

```bash
ls /Applications/Ghostty.app
```

## First Launch

1. Open Ghostty from Applications or Spotlight (`Cmd+Space`, type "Ghostty")
2. You'll see a minimal terminal window
3. Try typing `echo "Hello Ghostty!"`

## Basic Configuration

Ghostty uses a simple config file at `~/.config/ghostty/config`.

### Option 1: Use the Dotfiles (Recommended)

If the dotfiles repo has a Ghostty config:

```bash
# Check if config exists in dotfiles
ls ~/Developer/.dotfiles/.config/ghostty/config

# If it exists, symlink it
mkdir -p ~/.config/ghostty
ln -sf ~/Developer/.dotfiles/.config/ghostty/config ~/.config/ghostty/config
```

### Option 2: Create Basic Config

If no dotfiles config exists, create one:

```bash
mkdir -p ~/.config/ghostty

cat > ~/.config/ghostty/config << 'EOF'
# Font - using Nerd Font for icons
font-family = "JetBrainsMono Nerd Font"
font-size = 14

# Window
window-padding-x = 10
window-padding-y = 10

# Theme
theme = dark

# Cursor
cursor-style = block
cursor-style-blink = false

# Scrollback
scrollback-limit = 10000
EOF
```

## Install a Good Font

Ghostty looks best with a "Nerd Font" - these include icons for your prompt.

```bash
brew install --cask font-jetbrains-mono-nerd-font
```

## Restart Ghostty

Quit (`Cmd+Q`) and reopen Ghostty to see your changes.

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| New tab | `Cmd+T` |
| Close tab | `Cmd+W` |
| Next tab | `Cmd+Shift+]` |
| Previous tab | `Cmd+Shift+[` |
| Split right | `Cmd+D` |
| Split down | `Cmd+Shift+D` |
| Navigate splits | `Cmd+Option+Arrow` |
| Increase font | `Cmd++` |
| Decrease font | `Cmd+-` |
| Toggle fullscreen | `Cmd+Enter` |

## Verification Checklist

- [ ] Ghostty opens without errors
- [ ] Font looks good (icons should show properly later with p10k)
- [ ] You can create new tabs
- [ ] You can split panes

## Pro Tip

Even though Ghostty has built-in splits, we'll primarily use **tmux** for splitting. Why? Because tmux sessions persist even if you close the terminal, and the keybindings work the same whether you're local or SSH'd into a server.

## Next Step

Now let's set up Zsh with Oh My Zsh and Powerlevel10k for a beautiful prompt.
