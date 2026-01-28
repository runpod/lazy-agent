# Architecture

**Analysis Date:** 2026-01-15

## Pattern Overview

**Overall:** CLI Orchestration + Configuration Distribution + Skill-Based Guidance System

**Key Characteristics:**
- Interactive wizard pattern (prompts gather preferences)
- Configuration-driven setup (config.json drives all decisions)
- Modular skill system (task-specific AI guidance modules)
- Stateless setup scripts (each run is independent)

## Layers

**Entry Point Layer:**
- Purpose: User-facing CLI entry points
- Contains: Interactive prompts, health checks, update logic
- Files: `setup.sh`, `doctor.sh`, `update.sh`
- Depends on: Configuration layer, Dotfiles layer
- Used by: Users directly via terminal

**Configuration Layer:**
- Purpose: Store and manage user preferences
- Contains: JSON configuration files, Claude Code settings
- Files: `config.json`, `config.example.json`, `.claude/settings.local.json`
- Depends on: Nothing (source of truth)
- Used by: Entry points, AI Guidance layer

**AI Guidance Layer:**
- Purpose: Claude-powered interactive setup assistance
- Contains: SKILL.md files, onboarding instructions
- Files: `AGENTS.md`, `.claude/skills/*/SKILL.md`
- Depends on: Configuration layer (reads config.json)
- Used by: Claude Code when user asks for help

**Dotfiles Layer:**
- Purpose: Deploy terminal configuration files
- Contains: tmux, Ghostty, Karabiner configs
- Files: `dotfiles/.tmux.conf`, `dotfiles/.config/*`, `dotfiles/install.sh`
- Depends on: Nothing (source configs)
- Used by: Entry points, Installation scripts

**Documentation Layer:**
- Purpose: Step-by-step guides and reference materials
- Contains: Markdown documentation, cheatsheets
- Files: `steps/*.md`, `reference/*.md`, `exercises/*/README.md`
- Depends on: Nothing (read-only content)
- Used by: AI Guidance layer, users directly

## Data Flow

**Interactive Setup Flow:**

1. User runs: `./setup.sh`
2. Script prompts for preferences via `gum` or standard input
3. Generates `config.json` with user choices
4. Optionally runs `./dotfiles/install.sh` to symlink configs
5. User runs: `claude` to start AI-assisted setup
6. Claude loads `AGENTS.md` (symlinked from `CLAUDE.md`)
7. Claude reads `config.json` to personalize experience
8. Onboard skill invokes specialized skills as needed
9. `doctor.sh` verifies all tools installed successfully

**State Management:**
- File-based: All state lives in `config.json` and installed dotfiles
- Stateless execution: Each script run is independent
- No database or persistent runtime state

## Key Abstractions

**Skill:**
- Purpose: Self-contained AI guidance module for specific task
- Examples: `onboard/`, `setup-ghostty/`, `tmux-tutorial/`, `setup-karabiner/`
- Pattern: SKILL.md file with structured markdown instructions
- Location: `.claude/skills/*/SKILL.md`

**Step:**
- Purpose: Human-readable documentation for manual reference
- Examples: `01-prerequisites.md`, `05-claude-code.md`, `07-gastown.md`
- Pattern: Numbered markdown files with verification checklists
- Location: `steps/*.md`

**Dotfile:**
- Purpose: Terminal/application configuration file
- Examples: `.tmux.conf`, `.config/ghostty/config`
- Pattern: Symlinked from repo to home directory
- Location: `dotfiles/*`

## Entry Points

**setup.sh:**
- Location: `setup.sh` (project root)
- Triggers: User runs `./setup.sh` manually
- Responsibilities: Gather preferences, generate config.json, offer dotfile installation

**doctor.sh:**
- Location: `doctor.sh` (project root)
- Triggers: User runs `./doctor.sh` for health check
- Responsibilities: Verify installations, display status, suggest fixes

**update.sh:**
- Location: `update.sh` (project root)
- Triggers: User runs `./update.sh` to sync changes
- Responsibilities: Git pull, conditional dotfile re-sync

**AGENTS.md (Claude entry):**
- Location: `AGENTS.md` (symlinked as `CLAUDE.md`)
- Triggers: Claude Code reads on startup, user asks "help me get started"
- Responsibilities: Define onboarding personality, orchestrate skills

## Error Handling

**Strategy:** Exit on error (`set -e`) with colored status output

**Patterns:**
- Universal `set -e` at script start for fail-fast behavior
- Helper functions return 0/1 for success/failure
- Color-coded output: GREEN=success, RED=error, YELLOW=warning
- Verification checklists in documentation for manual confirmation

## Cross-Cutting Concerns

**Logging:**
- Console output with ANSI color codes
- No file-based logging
- Status indicators: ✓ (installed), ✗ (missing), ○ (optional)

**Validation:**
- Pre-flight checks in `doctor.sh` verify dependencies
- `dotfiles/install.sh` analyzes existing configs before overwriting
- Configuration schema implicit (no formal validation)

**Security:**
- API keys stored in `~/.zshrc.local` (gitignored)
- `config.json` in `.gitignore` to prevent secret leakage
- Gastown warnings in `steps/07-gastown.md` about experimental multi-agent software

---

*Architecture analysis: 2026-01-15*
*Update when major patterns change*
