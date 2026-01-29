# Lazy Agent - Terminal Environment for AI Agents

Like LazyVim, but for terminal-based AI agent workflows. Get a beautiful, productive terminal setup in minutes.

## Who Is This For?

**Best for:** Developers who want to use Claude Code effectively and are comfortable (or want to become comfortable) with terminal-based workflows.

**You should know:**
- Basic command line navigation (`cd`, `ls`, `mkdir`)
- How to use a text editor (any editor is fine)
- Basic git concepts (clone, commit, push)

**You'll learn:**
- tmux (terminal multiplexer) - we'll teach you interactively
- Vim-style navigation - optional but powerful
- How to work effectively with Claude Code

**What to expect:**
- The wizard will guide you through each tool **one at a time**
- For each tool, Claude explains **what it does and why** before installing
- After installation, Claude shows you **how to use it** with hands-on examples
- You can skip any tool you don't want
- Total setup takes 15-30 minutes depending on your choices

**This is NOT:**
- A "run one script and you're done" installer
- A replacement for understanding your tools
- Magic - you'll still need to learn and practice

> **Note:** This wizard is designed for macOS primarily. Linux support is available but some tools (like Karabiner) are macOS-only. The wizard will detect your OS and skip incompatible steps.

## Quick Start

1. **Install Claude Code** (if you don't have it):
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. **Clone this repo**:
   ```bash
   git clone https://github.com/runpod/lazy-agent.git
   cd lazy-agent
   ```

3. **Run the setup wizard**:
   ```bash
   ./setup.sh
   ```

   Or manually:
   ```bash
   cp config.example.json config.json
   # Edit config.json with your name and preferences
   ```

4. **Run Claude Code and say**: "help me get started"

Claude will read your config and guide you through a personalized setup.

## Interactive TUI

There's also a visual TUI (Terminal User Interface) with progress tracking and mini-games:

```bash
./tui.sh
```

Or manually:
```bash
cd lazy-tui && bun install && bun start
```

The TUI includes:
- **Setup progress tracker** - Visual checklist of all setup steps
- **Mini-games** - Practice vim keys while having fun
  - Spell Caster (typing + vim navigation)
  - Pirate Survival (Vampire Survivors style)
  - Flappy Terminal
- **Help pages** - Quick reference for keybindings

## What You'll Set Up

### Core (Everyone)
- **Ghostty** - Fast, GPU-accelerated terminal
- **Zsh + Oh My Zsh + Powerlevel10k** - Beautiful shell with great defaults
- **tmux** - Terminal multiplexer with vim-style navigation
- **Claude Code** - AI-powered coding assistant

### Recommended
- **Karabiner-Elements** - Caps Lock → Escape/Ctrl (game changer for vim/tmux)
- **Terminal Power Tools** - fzf, bat, eza, jq, httpie

### Developer Tools
- **lazygit** - Beautiful git TUI
- **GitHub CLI** - PRs, issues, actions from terminal
- **Browser Agent** - AI-friendly browser automation
- **Docker** - Container runtime

### Optional Integrations
- **Notion MCP** - Let Claude search your Notion docs
- **Linear MCP** - Let Claude manage Linear issues
- **gcalcli** - Google Calendar in terminal

### Multi-Agent Tools (Advanced)
- **Gastown** - Coordinate multiple Claude sessions **[EXPERIMENTAL - USE WITH CAUTION]**
- **Beads** - Git-backed issue tracking with Linear sync

> **Warning**: Gastown is experimental software that gives AI agents significant
> autonomy. Only use on test projects and always work in a discardable git branch.

## What You'll Learn

- How to navigate tmux like a pro (vim-style keybindings)
- How to split and manage terminal panes
- How to use Claude Code effectively
- Terminal productivity tips

## Learning Tmux

Claude teaches you tmux interactively - no separate tutorial needed. Just say:
- "teach me tmux"
- "how do I split panes?"
- "show me the tmux keybindings"

There's also a printable cheatsheet at `reference/tmux-cheatsheet.html`.

## Files in This Repo

```
lazy-agent/
├── setup.sh            # Interactive setup wizard
├── tui.sh              # Launch the interactive TUI
├── doctor.sh           # Check what's installed
├── update.sh           # Pull updates and refresh configs
├── CLAUDE.md           # Instructions for Claude (the wizard brain)
├── config.example.json # Example config (copy to config.json)
├── README.md           # You are here
├── dotfiles/           # Included configs (tmux, ghostty, karabiner)
│   ├── .tmux.conf
│   ├── .config/ghostty/config
│   ├── .config/karabiner/karabiner.json
│   └── install.sh
├── steps/              # Step-by-step setup guides
│   ├── 01-prerequisites.md
│   ├── 04-tmux.md
│   ├── 05-claude-code.md
│   ├── 14-lsp.md
│   ├── 15-hooks.md
│   ├── 16-skills.md
│   ├── 17-best-practices.md
│   └── ...more
├── lazy-tui/           # Interactive TUI application
│   ├── src/
│   │   ├── index.tsx           # Main entry point
│   │   └── components/
│   │       ├── SetupPage.tsx   # Setup progress tracker
│   │       ├── GamesPage.tsx   # Mini-games menu
│   │       └── games/          # Vim practice games
│   └── package.json
├── reference/          # Cheatsheets and quick reference
│   ├── tmux-cheatsheet.html
│   └── tmux-cheatsheet.md
└── exercises/          # Practice projects
```

## Need Help?

Just ask Claude! That's the whole point.

If Claude Code isn't installed yet, you can:
- Follow the steps manually in `steps/` directory
- Check out the [Claude Code documentation](https://docs.anthropic.com/claude-code)

## Check Your Setup

See what's installed and what's missing:

```bash
./doctor.sh
```

## Updating

Pull the latest changes and update your configs:

```bash
./update.sh
```

This will:
- Pull latest from the repo
- Show what changed
- Optionally re-install dotfiles if they were updated

## Contributing

PRs welcome! This is meant to evolve as the tools change.

## Philosophy

Like LazyVim, we believe:
- **Sensible defaults** - Works out of the box
- **Opinionated but configurable** - We made choices, but you can change them
- **Self-contained** - One repo, everything you need
- **Evolvable** - The tools change, so should this
