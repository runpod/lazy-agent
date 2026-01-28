# Step 11: CLI Essentials [QUICK]

These tools take about a minute to install and make your terminal much nicer.

## Installation (all at once)

```bash
brew install fzf ripgrep bat eza fd zoxide git-delta jq httpie glow
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

### ripgrep (rg) - Fast Grep
Blazingly fast search through code. Respects .gitignore.

```bash
# Search for a pattern
rg "TODO"

# Search specific file types
rg "function" --type ts

# Case insensitive
rg -i "error"
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

### fd - Better find
Fast, user-friendly alternative to find.

```bash
# Find files by name
fd "README"

# Find by extension
fd -e ts

# Find and execute
fd -e json -x cat {}
```

### zoxide - Smarter cd
Learns your habits. Jump to frequently used directories.

```bash
# Jump to a directory you've visited
z projects

# Jump to best match
z lazy

# Add to shell (already in our dotfiles)
eval "$(zoxide init zsh)"
```

### delta - Better git diff
Beautiful side-by-side diffs with syntax highlighting.

```bash
# Works automatically with git
git diff

# Or pipe to it
diff file1 file2 | delta
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
# GET request
http GET api.example.com

# POST with JSON
http POST api.example.com name=Josh

# With headers
http GET api.example.com Authorization:"Bearer token"
```

### glow - Markdown Viewer
Beautiful markdown rendering in terminal.

```bash
# View a file
glow README.md

# Browse directory
glow .

# Fetch and render
glow https://example.com/README.md
```

## Quick Setup

Add these aliases to `~/.zshrc.local`:

```bash
# Better defaults
alias cat="bat"
alias ls="eza"
alias ll="eza -la"
alias tree="eza --tree"
alias grep="rg"
alias find="fd"
```

Then reload:
```bash
source ~/.zshrc
```

## Verification

```bash
fzf --version
rg --version
bat --version
eza --version
fd --version
zoxide --version
delta --version
jq --version
http --version
glow --version
```

All installed? You're done! These tools work automatically now.
