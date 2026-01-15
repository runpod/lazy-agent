# Lazy Agent

LazyVim-style TUI for AI development environment setup.

## Install

```bash
# Clone the repo
git clone https://github.com/zackmckennarunpod/hello-claude.git
cd hello-claude/lazy-tui

# Install dependencies
bun install

# Link globally (makes 'lazy' command available)
bun link
```

## Run

```bash
lazy
```

Or run directly:
```bash
bun run start
```

## Keybindings

| Key | Action |
|-----|--------|
| `t` | Tools browser |
| `s` | Setup wizard |
| `c` | Launch Claude Code |
| `1` | Install core tools |
| `2` | Install recommended tools |
| `?` | Help |
| `q` | Quit |

## Tools Page Navigation

| Key | Action |
|-----|--------|
| `h/l` | Switch category tabs |
| `j/k` | Navigate tools list |
| `Enter` | Install selected tool |
| `ESC` | Back to home |
