---
title: Prerequisites
time_estimate: 5 min
required: true
---

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

## GitHub CLI (gh)

The GitHub CLI (`gh`) is essential for working with GitHub from your terminal. It's the best way to create PRs, view issues, check CI/CD logs, and more.

### Why gh?

- Create and manage pull requests without leaving the terminal
- View GitHub Actions logs when builds fail
- Authenticate once and forget about it
- Much faster than navigating GitHub's web UI

### Installation

```bash
brew install gh
```

### Authentication (Interactive)

This step requires you to authenticate with GitHub. Run:

```bash
gh auth login
```

You'll be prompted with choices:

1. **What account do you want to log into?**
   → Select `GitHub.com` (unless you use GitHub Enterprise)

2. **What is your preferred protocol for Git operations?**
   → Select `HTTPS` (recommended) or `SSH` if you prefer

3. **Authenticate Git with your GitHub credentials?**
   → Select `Yes`

4. **How would you like to authenticate GitHub CLI?**
   → Select `Login with a web browser` (easiest)

5. **Copy the one-time code** shown in the terminal

6. **Press Enter** to open the browser

7. **Paste the code** in the browser and authorize the app

8. **Return to terminal** - you should see "Logged in as YOUR_USERNAME"

### Verify Authentication

```bash
gh auth status
```

You should see something like:
```
github.com
  ✓ Logged in to github.com as YOUR_USERNAME
  ✓ Git operations for github.com configured to use https protocol.
  ✓ Token: gho_************************************
```

### Quick Test

Try these commands to verify everything works:

```bash
# See your repos
gh repo list --limit 5

# View a PR (if you have one)
gh pr list
```

### Common gh Commands

| Command | Description |
|---------|-------------|
| `gh pr create` | Create a pull request |
| `gh pr view` | View PR details |
| `gh pr checkout 123` | Checkout a PR locally |
| `gh pr merge` | Merge a PR |
| `gh issue list` | List issues |
| `gh issue create` | Create an issue |
| `gh run list` | List recent CI/CD runs |
| `gh run view --log-failed` | View failed CI logs |
| `gh repo clone owner/repo` | Clone a repository |

### Pro Tips

```bash
# Create PR with title and body
gh pr create --title "Add feature X" --body "Description here"

# View failed GitHub Actions logs (super useful!)
gh run view --log-failed

# Open current repo in browser
gh repo view --web

# Create repo from current directory
gh repo create --source=. --public
```

## Dotfiles (Included)

This repo includes starter dotfiles in the `dotfiles/` directory:
- `.tmux.conf` - tmux with vim-style navigation and Ctrl+A prefix
- `.config/ghostty/config` - Ghostty terminal config
- `.config/karabiner/karabiner.json` - Caps Lock → Escape/Ctrl (optional)

We'll install these in later steps.

## Verification Checklist

- [ ] `brew --version` shows version number
- [ ] `git --version` shows version number
- [ ] `git config user.name` shows your name
- [ ] `git config user.email` shows your email
- [ ] `gh --version` shows version number
- [ ] `gh auth status` shows you're logged in

## Next Step

Once Homebrew, Git, and GitHub CLI are ready, we'll install Ghostty - a beautiful, fast terminal.
