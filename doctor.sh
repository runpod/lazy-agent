#!/bin/bash
# Lazy Agent - Doctor
# Check what's installed and what's missing

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
DIM='\033[2m'
NC='\033[0m'

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║       ${GREEN}Lazy Agent Doctor${CYAN}               ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════╝${NC}"
echo ""

# Check function
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

check_file() {
    local name="$1"
    local file_path="$2"
    local install_hint="$3"

    if [ -f "$file_path" ] || [ -L "$file_path" ]; then
        echo -e "  ${GREEN}✓${NC} $name"
        return 0
    else
        echo -e "  ${YELLOW}○${NC} $name ${DIM}- $install_hint${NC}"
        return 1
    fi
}

MISSING=0

echo -e "${CYAN}=== Core Tools ===${NC}"
check "Homebrew" "brew" "Install from https://brew.sh" || MISSING=$((MISSING + 1))
check "Git" "git" "brew install git" || MISSING=$((MISSING + 1))
check "Zsh" "zsh" "brew install zsh" || MISSING=$((MISSING + 1))
check "tmux" "tmux" "brew install tmux" || MISSING=$((MISSING + 1))
check "Claude Code" "claude" "curl -fsSL https://claude.ai/install.sh | bash" || MISSING=$((MISSING + 1))
check "Node.js" "node" "brew install node" || MISSING=$((MISSING + 1))

echo ""
echo -e "${CYAN}=== Applications ===${NC}"
check_app "Ghostty" "/Applications/Ghostty.app" "brew install --cask ghostty" || MISSING=$((MISSING + 1))
check_app "Karabiner" "/Applications/Karabiner-Elements.app" "brew install --cask karabiner-elements (optional)"

echo ""
echo -e "${CYAN}=== Shell Setup ===${NC}"
check_file "Oh My Zsh" "$HOME/.oh-my-zsh" "sh -c \"\$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)\""
check_file "Powerlevel10k" "$HOME/.oh-my-zsh/custom/themes/powerlevel10k" "git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \${ZSH_CUSTOM:-\$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"

echo ""
echo -e "${CYAN}=== Dotfiles ===${NC}"
check_file "tmux config" "$HOME/.tmux.conf" "./dotfiles/install.sh"
check_file "Ghostty config" "$HOME/.config/ghostty/config" "./dotfiles/install.sh"
check_file "Karabiner config" "$HOME/.config/karabiner/karabiner.json" "./dotfiles/install.sh --with-karabiner (optional)"

echo ""
echo -e "${CYAN}=== Developer Tools ===${NC}"
check "lazygit" "lazygit" "brew install lazygit (optional)"
check "GitHub CLI" "gh" "brew install gh (optional)"
check "Docker" "docker" "brew install --cask docker (optional)"
check "fzf" "fzf" "brew install fzf (optional)"
check "bat" "bat" "brew install bat (optional)"
check "eza" "eza" "brew install eza (optional)"
check "jq" "jq" "brew install jq (optional)"
check "httpie" "http" "brew install httpie (optional)"
check "zoxide" "zoxide" "brew install zoxide (optional)"
check "glow" "glow" "brew install glow (optional)"
check "mprocs" "mprocs" "brew install mprocs (optional)"
check "browser-agent" "agent-browser" "npm install -g agent-browser (optional)"

echo ""
echo -e "${CYAN}=== Claude Code Extensions ===${NC}"
# Check for clyolo alias
if alias clyolo &>/dev/null 2>&1 || grep -q 'alias clyolo' ~/.zshrc 2>/dev/null; then
    echo -e "  ${GREEN}✓${NC} clyolo alias"
else
    echo -e "  ${YELLOW}○${NC} clyolo alias ${DIM}- add to ~/.zshrc: alias clyolo=\"claude --dangerously-skip-permissions\"${NC}"
fi
check "claude-notify" "cn" "brew install mylee04/tap/claude-notify (optional)"

echo ""
echo -e "${CYAN}=== Multi-Agent Tools ===${NC}"
check "Gastown" "gt" "go install github.com/steveyegge/gastown/cmd/gt@latest (optional)"
check "Beads" "bd" "brew install steveyegge/beads/bd (optional)"

echo ""
echo -e "${CYAN}=== Calendar ===${NC}"
check "gcalcli" "gcalcli" "brew install gcalcli (optional)"

echo ""
echo -e "${CYAN}=== MCP Servers ===${NC}"
if command -v claude &> /dev/null; then
    MCP_LIST=$(claude mcp list 2>/dev/null || echo "")
    if echo "$MCP_LIST" | grep -q "linear"; then
        echo -e "  ${GREEN}✓${NC} Linear MCP"
    else
        echo -e "  ${YELLOW}○${NC} Linear MCP ${DIM}- claude mcp add --transport http linear https://mcp.linear.app/mcp --scope user${NC}"
    fi
    if echo "$MCP_LIST" | grep -q "notion"; then
        echo -e "  ${GREEN}✓${NC} Notion MCP"
    else
        echo -e "  ${YELLOW}○${NC} Notion MCP ${DIM}- claude mcp add --transport http notion https://mcp.notion.com/mcp --scope user${NC}"
    fi
else
    echo -e "  ${DIM}(install Claude Code first)${NC}"
fi

echo ""
echo "─────────────────────────────────────────"

if [ $MISSING -gt 0 ]; then
    echo -e "${YELLOW}$MISSING core tool(s) missing.${NC}"
    echo ""
    echo "Run Claude Code and say 'help me get started' to install them."
else
    echo -e "${GREEN}All core tools installed!${NC}"
    echo ""
    echo "Optional tools can be installed anytime by asking Claude."
fi

echo ""
