# Hello Josh - Claude Code Onboarding

A self-guided wizard to set up your development environment, powered by Claude Code.

## Quick Start

1. **Install Claude Code** (if you don't have it):
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. **Clone this repo**:
   ```bash
   git clone https://github.com/zackmckennarunpod/hello-claude.git
   cd hello-claude
   ```

3. **Run Claude Code**:
   ```bash
   claude
   ```

4. **Edit `config.json`** with your name and preferences

5. **Run Claude Code and say**: "help me get started"

Claude will read your config and guide you through a personalized setup.

## What You'll Set Up

- **Ghostty** - A fast, GPU-accelerated terminal emulator
- **Zsh + Oh My Zsh** - A powerful shell with plugins
- **Powerlevel10k** - A beautiful, informative prompt
- **tmux** - Terminal multiplexer for managing sessions
- **Claude Code** - AI-powered coding assistant
- **Gastown** - Multi-agent workspace coordination
- **Beads** - Git-backed issue tracking with Linear sync
- **Linear MCP** - Claude Code integration with Linear
- **Notion MCP** - Claude Code integration with Notion
- **Playwright** - Browser automation and testing

## What You'll Learn

- How to navigate tmux like a pro (vim-style keybindings)
- How to split and manage terminal panes
- How to use Claude Code effectively
- Terminal productivity tips

## Interactive Tmux Tutorial

After setup, there's a web-based tutorial for learning tmux:

```bash
cd tmux-tutorial
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Files in This Repo

```
hello-claude/
├── CLAUDE.md           # Instructions for Claude (the wizard brain)
├── config.json         # Personalization config (edit this!)
├── README.md           # You are here
├── steps/              # Step-by-step setup guides
│   ├── 01-prerequisites.md
│   ├── 02-ghostty.md
│   ├── 03-zsh-and-p10k.md
│   ├── 04-tmux.md
│   ├── 05-claude-code.md
│   ├── 06-first-project.md
│   ├── 07-gastown.md
│   ├── 08-linear-and-mcp.md
│   └── 09-playwright.md
├── tmux-tutorial/      # Interactive web tutorial
│   ├── src/
│   ├── public/
│   └── package.json
├── exercises/          # Practice projects
│   └── hello-world/
└── reference/          # Quick reference cards
    └── tmux-cheatsheet.md
```

## Need Help?

Just ask Claude! That's the whole point.

If Claude Code isn't installed yet, you can:
- Follow the steps manually in `steps/` directory
- Check out the [Claude Code documentation](https://docs.anthropic.com/claude-code)

## Credits

Dotfiles: https://github.com/zackmckennarunpod/.dotfiles
