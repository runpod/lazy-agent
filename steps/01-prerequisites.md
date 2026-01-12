# Step 1: Prerequisites

## What We're Installing

- **Homebrew** - The package manager for macOS. Think of it like an app store for developer tools.
- **Git** - Version control. You probably have this, but let's make sure.

## Why Homebrew?

Homebrew makes installing developer tools dead simple. Instead of downloading installers, extracting files, and moving things around, you just run:

```bash
brew install something
```

And it handles everything.

## Installation

### Check if Homebrew is installed

```bash
which brew
```

If this returns a path like `/opt/homebrew/bin/brew`, you're good!

### Install Homebrew (if needed)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After installation, you may need to add Homebrew to your PATH. The installer will tell you the exact commands, but typically:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### Verify Homebrew works

```bash
brew --version
```

### Install/Update Git

```bash
brew install git
git --version
```

## Configure Git (if not already done)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Clone the Dotfiles

We'll use Zack's dotfiles for tmux, zsh, and other configs:

```bash
mkdir -p ~/Developer
git clone https://github.com/zackmckennarunpod/.dotfiles ~/Developer/.dotfiles
```

The dotfiles include:
- `.tmux.conf` - tmux with vim-style navigation
- `.zshrc` - Zsh configuration
- `.p10k.zsh` - Powerlevel10k prompt theme
- `.config/ghostty/config` - Ghostty terminal config
- `install.sh` - Automated setup script

## Verification Checklist

- [ ] `brew --version` shows version number
- [ ] `git --version` shows version number
- [ ] `git config user.name` shows your name
- [ ] `git config user.email` shows your email
- [ ] `ls ~/Developer/.dotfiles` shows the dotfiles

## Next Step

Once Homebrew, Git, and dotfiles are ready, we'll install Ghostty - a beautiful, fast terminal.
