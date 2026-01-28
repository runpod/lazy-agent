# Testing Patterns

**Analysis Date:** 2026-01-15

## Test Framework

**Runner:**
- No automated test framework
- Manual verification via `doctor.sh` health check script

**Assertion Library:**
- Not applicable

**Run Commands:**
```bash
./doctor.sh                    # Run health check
./doctor.sh | grep "✗"         # Show only failures
```

## Test File Organization

**Location:**
- No dedicated test files
- Verification logic embedded in `doctor.sh`

**Naming:**
- Not applicable (no test files)

**Structure:**
```
lazy-agent/
├── doctor.sh              # Health check / verification script
├── steps/*.md             # Each contains verification checklist
└── AGENTS.md              # Contains verification commands section
```

## Test Structure

**Verification Pattern:**
```bash
# From doctor.sh
check() {
    local name="$1"
    local cmd="$2"
    local install_hint="$3"

    if command -v "$cmd" &> /dev/null; then
        local version=$($cmd --version 2>/dev/null | head -1 || echo "installed")
        echo -e "  ${GREEN}✓${NC} $name ${DIM}($version)${NC}"
        return 0
    else
        echo -e "  ${RED}✗${NC} $name ${DIM}- $install_hint${NC}"
        return 1
    fi
}

check_app() {
    local name="$1"
    local app_path="$2"
    local install_hint="$3"

    if [ -d "$app_path" ]; then
        echo -e "  ${GREEN}✓${NC} $name"
        return 0
    else
        echo -e "  ${RED}✗${NC} $name ${DIM}- $install_hint${NC}"
        return 1
    fi
}
```

**Patterns:**
- Check command exists: `command -v "$cmd" &> /dev/null`
- Check application exists: `[ -d "/Applications/App.app" ]`
- Check file exists: `[ -f "$path" ]`
- Display version on success, install hint on failure

## Mocking

**Framework:**
- Not applicable (no mocking framework)

**Patterns:**
- Not applicable

**What to Mock:**
- Not applicable

## Fixtures and Factories

**Test Data:**
- Not applicable (no automated tests)

**Location:**
- Not applicable

## Coverage

**Requirements:**
- No coverage requirements
- Manual verification checklists in documentation

**Configuration:**
- Not applicable

**View Coverage:**
- Not applicable

## Test Types

**Manual Verification:**
- `doctor.sh` performs environment health checks
- Each `steps/*.md` file includes verification checklist
- `AGENTS.md` includes verification commands section (lines 102-134)

**Example verification checklist from `steps/01-prerequisites.md`:**
```markdown
## Verification Checklist

- [ ] `brew --version` shows version number
- [ ] `git --version` shows version number
- [ ] `git config user.name` shows your name
- [ ] `git config user.email` shows your email
```

**Verification Categories in `doctor.sh`:**
- Core tools: brew, git, zsh
- Terminal: tmux, Ghostty
- Shell enhancements: Oh My Zsh, Powerlevel10k
- Claude tools: Claude Code
- Multi-agent (optional): Gastown, Beads
- MCP servers: Linear, Notion
- Dotfiles: .tmux.conf, ghostty config

## Common Patterns

**Command Existence Check:**
```bash
if command -v "tool" &> /dev/null; then
    echo "Tool is installed"
else
    echo "Tool is missing"
fi
```

**Application Check:**
```bash
if [ -d "/Applications/Ghostty.app" ]; then
    echo "Ghostty is installed"
fi
```

**File Existence Check:**
```bash
if [ -f "$HOME/.tmux.conf" ]; then
    echo "tmux config exists"
fi
```

**Version Display:**
```bash
$cmd --version 2>/dev/null | head -1
```

**Snapshot Testing:**
- Not used in this codebase

---

## Testing Philosophy

This project is an **onboarding and configuration distribution tool**, not a software application. Testing focuses on:

1. **Environment verification** via `doctor.sh`
2. **Documentation-driven validation** via step-by-step checklists
3. **Interactive confirmation** during AI-guided setup

Traditional unit/integration testing is not applicable because:
- No application code to test
- Setup scripts are idempotent (run multiple times safely)
- User confirmation is part of the process

---

*Testing analysis: 2026-01-15*
*Update when test patterns change*
