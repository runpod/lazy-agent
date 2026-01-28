# Coding Conventions

**Analysis Date:** 2026-01-15

## Naming Patterns

**Files:**
- kebab-case.sh for shell scripts (`setup.sh`, `doctor.sh`, `update.sh`)
- kebab-case.md for documentation (`tools-and-links.md`, `vim-keys.md`)
- ##-kebab-case.md for numbered steps (`01-prerequisites.md`, `05-claude-code.md`)
- UPPERCASE.md for important files (`README.md`, `CLAUDE.md`, `AGENTS.md`, `SKILL.md`)

**Functions (Bash):**
- lowercase_snake_case for function names
- Examples from `dotfiles/install.sh`: `analyze_config()`, `check()`, `check_app()`, `check_file()`
- Examples from `setup.sh`: `prompt()`, `confirm()`

**Variables (Bash):**
- UPPERCASE_SNAKE_CASE for constants and colors
- Examples: `GREEN`, `RED`, `YELLOW`, `NC`, `DOTFILES_DIR`, `FORCE_INSTALL`
- lowercase for local variables: `local question="$1"`, `local default="$2"`

**Directories:**
- kebab-case for all directories (`setup-ghostty`, `hello-world`, `terminal-power-tools`)
- Plural for collections (`steps/`, `skills/`, `exercises/`, `dotfiles/`)

## Code Style

**Formatting:**
- 4-space indentation in Bash scripts
- ~80 character line length (soft limit)
- Double quotes for variable interpolation: `"$variable"`
- Single quotes for literals: `'literal string'`

**Shell Scripts:**
- Shebang: `#!/bin/bash`
- Error handling: `set -e` at script start
- Color codes defined as constants at top of file:
  ```bash
  GREEN='\033[0;32m'
  RED='\033[0;31m'
  YELLOW='\033[1;33m'
  NC='\033[0m'
  ```

**Linting:**
- No automated linting configured
- Manual consistency enforced through review

## Import Organization

**Not applicable** - Bash scripts use sourcing sparingly. No complex import patterns.

**Path Handling:**
- Absolute paths preferred via: `DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"`
- Relative paths avoided in scripts

## Error Handling

**Patterns:**
- `set -e` for exit-on-error (all scripts)
- Function returns: `return 0` for success, `return 1` for failure
- Error output: `echo -e "${RED}✗${NC} Error message"`

**When to exit:**
- Missing dependencies: Exit with error message
- Failed operations: Continue with warning if non-critical
- User cancellation: Exit cleanly with message

**Example pattern from `doctor.sh`:**
```bash
check() {
    local name="$1"
    local cmd="$2"
    if command -v "$cmd" &> /dev/null; then
        echo -e "  ${GREEN}✓${NC} $name"
        return 0
    else
        echo -e "  ${RED}✗${NC} $name"
        return 1
    fi
}
```

## Logging

**Framework:**
- Console output with ANSI color codes
- No file-based logging

**Patterns:**
- Status indicators: `✓` (success), `✗` (error), `○` (optional)
- Color coding: GREEN=success, RED=error, YELLOW=warning, CYAN=info, DIM=subtle
- Progress messages: Active voice ("Installing...", "Checking...")

## Comments

**When to Comment:**
- Explain "why" not "what" for non-obvious decisions
- Document external dependencies and URLs
- Describe configuration options

**Section Headers:**
- `### --- Section Name ---` pattern in shell scripts
- `##` headers in markdown for major sections

**Example from `.tmux.conf`:**
```bash
# Using C-a (easier to reach than C-b, conflicts less with vim)
set-option -g prefix C-a

# WezTerm/Ghostty compatibility
set-option -g default-terminal "tmux-256color"
```

**TODO Comments:**
- Not commonly used in this codebase
- Prefer documenting gaps in step files

## Function Design

**Size:**
- Keep functions short and focused
- Extract reusable logic into helper functions

**Parameters:**
- Use positional parameters: `$1`, `$2`, etc.
- Document expected parameters in function comments
- Use `local` for function-scoped variables

**Return Values:**
- Use exit codes (0 = success, 1 = failure)
- Echo output for string returns
- Avoid complex return patterns

## Module Design

**Bash Scripts:**
- Self-contained: Each script handles its own dependencies
- No sourcing between scripts (except common color definitions)
- Entry point at bottom of script

**Documentation:**
- One topic per file in `steps/`
- One skill per directory in `.claude/skills/`
- Cross-references via explicit paths

**Dotfiles:**
- One config per application
- Comments explaining non-obvious settings
- Version/compatibility notes where relevant

---

*Convention analysis: 2026-01-15*
*Update when patterns change*
