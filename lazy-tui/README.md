# Lazy TUI

Interactive terminal UI for the Lazy Agent onboarding experience.

## Quick Start

```bash
# Install dependencies
bun install

# Run the TUI
bun start

# Or with hot reload for development
bun dev
```

## Features

### Setup Progress Tracker
Visual checklist showing all onboarding steps:
- Homebrew, Git, Zsh, tmux, CLI tools
- Ghostty, Claude Code, Language Servers
- Hooks, Skills, Dotfiles

### Mini-Games (Vim Practice)

Practice vim keybindings while having fun:

**Spell Caster**
- Type incantations to cast spells
- `j/k` to dodge between lanes
- `h/l` to switch elements (fire/ice/lightning)
- Match element to monster weakness for 2x damage
- Hidden timing bar for crit hits (easter egg)

**Pirate Survival** (Vampire Survivors style)
- Auto-attacking weapons
- Swarming enemies from all edges
- XP gems and level-up choices
- Multiple weapons and passive upgrades

**Flappy Terminal**
- Classic flappy gameplay
- Space to flap
- Navigate through pipes

## Navigation

| Key | Action |
|-----|--------|
| `j/k` or arrows | Navigate menus |
| `Enter` | Select |
| `ESC` | Go back |
| `q` | Quit |
| `m` | Switch agent personality |

## Home Screen Keys

| Key | Action |
|-----|--------|
| `t` | Tools browser |
| `s` | Setup wizard |
| `g` | Games |
| `c` | Launch Claude Code |
| `?` | Help |

## Tech Stack

- [Bun](https://bun.sh) - Runtime
- [OpenTUI](https://github.com/anthropics/opentui) - React for terminals
- React 19

## Development

```bash
# Run with hot reload
bun dev
```

## Structure

```
src/
├── index.tsx              # Main app, routing
├── components/
│   ├── SplashScreen.tsx   # Initial loading screen
│   ├── SetupPage.tsx      # Setup progress tracker
│   ├── GamesPage.tsx      # Games menu
│   ├── HelpPage.tsx       # Keybinding reference
│   ├── ToolsPage.tsx      # Tools info
│   ├── AgentBar.tsx       # Agent personality switcher
│   └── games/
│       ├── WizardGame.tsx # Spell Caster
│       ├── PirateGame.tsx # Pirate Survival
│       └── FlappyGame.tsx # Flappy Terminal
```
