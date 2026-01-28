# Codebase Structure

**Analysis Date:** 2026-01-15

## Directory Layout

```
lazy-agent/
├── .claude/               # Claude Code project configuration
│   ├── settings.local.json  # Permission rules
│   └── skills/              # 12 specialized task skills
├── .devcontainer/         # VS Code dev container config
├── .planning/             # Planning artifacts (this directory)
│   └── codebase/          # Codebase documentation
├── dotfiles/              # Configuration files to symlink
│   ├── .config/           # Application configs
│   └── .tmux.conf         # tmux configuration
├── exercises/             # Practice projects
│   └── hello-world/       # Express.js + tmux practice
├── reference/             # Cheatsheets and documentation
├── steps/                 # Step-by-step setup guides
├── AGENTS.md              # Master Claude instructions
├── CLAUDE.md -> AGENTS.md # Symlink for Claude Code
├── config.json            # User config (gitignored)
├── config.example.json    # Template configuration
├── doctor.sh              # Health check script
├── README.md              # Project documentation
├── setup.sh               # Interactive setup wizard
└── update.sh              # Git sync + dotfile refresh
```

## Directory Purposes

**.claude/:**
- Purpose: Claude Code project-specific configuration
- Contains: Permission settings, skill definitions
- Key files: `settings.local.json` (Bash permissions)
- Subdirectories: `skills/` (12 SKILL.md files)

**.claude/skills/:**
- Purpose: Reusable AI guidance modules
- Contains: `onboard/`, `setup-ghostty/`, `setup-shell/`, `tmux-tutorial/`, `setup-karabiner/`, `setup-linear/`, `setup-notion/`, `setup-gcalcli/`, `setup-claude-project/`, `setup-glow/`, `setup-zoxide/`, `fzf-tips/`
- Key files: Each contains `SKILL.md` with structured guidance
- Subdirectories: One per skill (flat structure within each)

**dotfiles/:**
- Purpose: Terminal configuration files for symlink installation
- Contains: tmux config, Ghostty config, Karabiner config
- Key files: `.tmux.conf`, `install.sh`, `README.md`
- Subdirectories: `.config/ghostty/`, `.config/karabiner/`

**steps/:**
- Purpose: Human-readable setup documentation
- Contains: Numbered markdown guides for each setup phase
- Key files: `01-prerequisites.md`, `05-claude-code.md`, `07-gastown.md`, `08-linear-and-mcp.md`
- Subdirectories: None (flat structure)

**reference/:**
- Purpose: Quick reference materials and cheatsheets
- Contains: tmux cheatsheet (HTML/MD/CSS), tool links, vim keys
- Key files: `tmux-cheatsheet.html`, `tools-and-links.md`, `vim-keys.md`
- Subdirectories: None

**exercises/:**
- Purpose: Hands-on practice projects
- Contains: Simple starter projects for learning
- Key files: `hello-world/README.md`
- Subdirectories: One per exercise

## Key File Locations

**Entry Points:**
- `setup.sh` - Interactive configuration wizard
- `doctor.sh` - Environment health check
- `update.sh` - Repository and config sync

**Configuration:**
- `config.json` - User preferences (generated, gitignored)
- `config.example.json` - Template configuration
- `.claude/settings.local.json` - Claude Code permissions

**Core Logic:**
- `dotfiles/install.sh` - Symlink installer with backup logic
- `AGENTS.md` - Master onboarding instructions

**Testing:**
- `doctor.sh` - Manual verification (no automated tests)

**Documentation:**
- `README.md` - Project overview
- `steps/*.md` - Step-by-step guides
- `reference/*.md` - Quick reference materials

## Naming Conventions

**Files:**
- kebab-case.sh: Shell scripts (`setup.sh`, `doctor.sh`, `update.sh`)
- kebab-case.md: Markdown documentation (`tools-and-links.md`)
- UPPERCASE.md: Important project files (`README.md`, `CLAUDE.md`, `AGENTS.md`)
- ##-name.md: Numbered step files (`01-prerequisites.md`, `05-claude-code.md`)

**Directories:**
- kebab-case: All directories (`setup-ghostty`, `hello-world`)
- Plural for collections: `steps/`, `skills/`, `exercises/`
- Dot-prefix for config: `.claude/`, `.config/`, `.planning/`

**Special Patterns:**
- SKILL.md: Skill definition file (one per skill directory)
- .md symlinks: `CLAUDE.md -> AGENTS.md`
- Dot-prefix configs: `.tmux.conf`, `.config/`

## Where to Add New Code

**New Skill:**
- Primary code: `.claude/skills/{skill-name}/SKILL.md`
- Documentation: Update `AGENTS.md` step list if onboarding-related

**New Step Guide:**
- Implementation: `steps/##-{name}.md`
- Numbering: Follow existing sequence (01, 02, 03...)
- Update: `AGENTS.md` step list reference

**New Dotfile:**
- Implementation: `dotfiles/{filename}` or `dotfiles/.config/{app}/config`
- Installer update: Add symlink logic to `dotfiles/install.sh`

**New Reference Material:**
- Implementation: `reference/{name}.md`
- Types: Cheatsheets, tool links, keyboard shortcuts

**New Exercise:**
- Implementation: `exercises/{name}/README.md`
- Structure: README with instructions, any starter code

## Special Directories

**.planning/codebase/:**
- Purpose: Codebase documentation generated by map-codebase
- Source: Auto-generated by Explore agents
- Committed: Yes (reference for planning)

**dotfiles/.config/:**
- Purpose: XDG-style application configs
- Source: Manually maintained, symlinked to ~/.config/
- Committed: Yes (source of truth for configs)

**.devcontainer/:**
- Purpose: VS Code dev container configuration
- Source: Manually maintained for container testing
- Committed: Yes

---

*Structure analysis: 2026-01-15*
*Update when directory structure changes*
