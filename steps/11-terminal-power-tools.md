---
title: Terminal Power Tools
time_estimate: 1 min
required: false
recommended: true
tags:
  - quick
---

# Step 11: Terminal Power Tools

These tools take 30 seconds to install and make your terminal much nicer.

## Installation (all at once)

```bash
brew install fzf bat eza jq httpie
```

## What You Get

### fzf - Fuzzy Finder
Search anything interactively. Game changer.

```bash
# Search command history
Ctrl+R

# Find files
fzf

# Pipe anything to it
cat file.txt | fzf
```

### bat - Better cat
Syntax highlighting, line numbers.

```bash
bat README.md
bat src/*.ts
```

### eza - Better ls
Icons, colors, git status.

```bash
eza -la
eza --tree --level=2
```

Add alias to your shell:
```bash
alias ls="eza"
alias ll="eza -la"
```

### jq - JSON Swiss Army Knife
Parse and filter JSON.

```bash
curl api.example.com | jq '.data'
cat package.json | jq '.dependencies'
```

### httpie - Better curl
Human-friendly HTTP requests.

```bash
http GET api.example.com
http POST api.example.com name=Josh
```

## Quick Setup

Add these aliases to `~/.zshrc.local`:

```bash
# Better defaults
alias cat="bat"
alias ls="eza"
alias ll="eza -la"
alias tree="eza --tree"
```

Then reload:
```bash
source ~/.zshrc
```

## Verification

```bash
fzf --version
bat --version
eza --version
jq --version
http --version
```

All installed? You're done! These tools work automatically now.
