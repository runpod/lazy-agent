#!/bin/bash
# Lazy Agent - Interactive Setup
# Terminal environment for AI-powered development

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
DIM='\033[2m'
NC='\033[0m'

echo ""
echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║      ${GREEN}Lazy Agent Setup Wizard${BLUE}          ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════╝${NC}"
echo ""
echo "Like LazyVim, but for terminal-based AI workflows."
echo ""

# Check if gum is installed for pretty prompts
if command -v gum &> /dev/null; then
    USE_GUM=true
else
    USE_GUM=false
    echo -e "${YELLOW}Tip: Install 'gum' for a prettier experience: brew install gum${NC}"
    echo ""
fi

# Helper functions
prompt() {
    local question="$1"
    local default="$2"
    if [ "$USE_GUM" = true ]; then
        gum input --placeholder "$default" --prompt "$question "
    else
        read -p "$question [$default]: " answer
        echo "${answer:-$default}"
    fi
}

confirm() {
    local question="$1"
    if [ "$USE_GUM" = true ]; then
        gum confirm "$question" && echo "true" || echo "false"
    else
        read -p "$question [y/N]: " answer
        [[ "$answer" =~ ^[Yy] ]] && echo "true" || echo "false"
    fi
}

# Gather info
NAME=$(prompt "What's your name?" "Developer")

echo ""
echo -e "${CYAN}=== Core Setup ===${NC}"
echo -e "${DIM}These are installed for everyone (~10 min total):${NC}"
echo "  - Ghostty (terminal emulator)"
echo "  - Zsh + Oh My Zsh + Powerlevel10k"
echo "  - tmux (terminal multiplexer)"
echo "  - AI agent CLI (Claude Code recommended)"
echo ""

echo -e "${CYAN}=== Keyboard Optimization ===${NC}"
echo -e "${DIM}~2 min install, requires granting permissions${NC}"
INSTALL_KARABINER=$(confirm "Install Karabiner? (Caps Lock → Escape/Ctrl)")

echo ""
echo -e "${CYAN}=== Terminal Enhancements ===${NC}"
echo -e "${DIM}~1 min, just brew installs${NC}"
INSTALL_POWERTOOLS=$(confirm "Install power tools? (fzf, bat, eza, jq, httpie)")

echo ""
echo -e "${CYAN}=== Optional Integrations ===${NC}"

echo -e "${DIM}~1 min, uses browser OAuth (no API keys needed)${NC}"
INSTALL_NOTION=$(confirm "Notion integration? (your AI agent can search your docs)")

echo -e "${DIM}~1 min, uses browser OAuth (no API keys needed)${NC}"
INSTALL_LINEAR=$(confirm "Linear integration? (your AI agent can manage issues)")

echo ""
echo -e "${CYAN}=== Developer Tools ===${NC}"

echo -e "${DIM}~1 min, beautiful git TUI${NC}"
INSTALL_LAZYGIT=$(confirm "lazygit? (terminal UI for git)")

echo -e "${DIM}~1 min, already have it? we'll skip${NC}"
INSTALL_GH=$(confirm "GitHub CLI? (gh - for PRs, issues, actions)")

echo -e "${DIM}~2 min, Playwright-based browser automation for AI${NC}"
INSTALL_BROWSER_AGENT=$(confirm "Browser Agent? (AI-friendly browser automation)")

echo -e "${DIM}~3 min if not installed${NC}"
INSTALL_DOCKER=$(confirm "Docker? (container runtime)")

echo -e "${DIM}⚠️  ~5-10 min, requires Google Cloud Console OAuth setup${NC}"
INSTALL_GCALCLI=$(confirm "gcalcli? (Google Calendar in terminal)")

echo ""
echo -e "${CYAN}=== Multi-Agent Tools ===${NC}"
echo -e "${DIM}For coordinating multiple agent sessions${NC}"

echo -e "${DIM}~1 min, Go install${NC}"
INSTALL_GASTOWN=$(confirm "Gastown? (multi-agent workspace coordination)")

echo -e "${DIM}~1 min, Go install${NC}"
INSTALL_BEADS=$(confirm "Beads? (git-backed issue tracking)")

# Generate config.json
echo ""
echo -e "${GREEN}Generating config.json...${NC}"

cat > config.json << EOF
{
  "user": {
    "name": "$NAME"
  },
  "dotfiles": {
    "use_included": true,
    "install_karabiner": $INSTALL_KARABINER
  },
  "setup": {
    "optional_tools": {
      "karabiner": $INSTALL_KARABINER,
      "terminal_power_tools": $INSTALL_POWERTOOLS,
      "lazygit": $INSTALL_LAZYGIT,
      "gh_cli": $INSTALL_GH,
      "browser_agent": $INSTALL_BROWSER_AGENT,
      "docker": $INSTALL_DOCKER,
      "gcalcli": $INSTALL_GCALCLI,
      "gastown": $INSTALL_GASTOWN,
      "beads": $INSTALL_BEADS,
      "linear_mcp": $INSTALL_LINEAR,
      "notion_mcp": $INSTALL_NOTION
    }
  },
  "preferences": {
    "shell": "zsh",
    "editor": "neovim",
    "theme": "dark"
  }
}
EOF

echo -e "${GREEN}Created config.json${NC}"

# Summary
echo ""
echo -e "${CYAN}=== Summary ===${NC}"
TOTAL_TIME=10
[ "$INSTALL_KARABINER" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 2))
[ "$INSTALL_POWERTOOLS" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 1))
[ "$INSTALL_LAZYGIT" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 1))
[ "$INSTALL_GH" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 1))
[ "$INSTALL_BROWSER_AGENT" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 2))
[ "$INSTALL_DOCKER" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 3))
[ "$INSTALL_GCALCLI" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 7))
[ "$INSTALL_GASTOWN" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 1))
[ "$INSTALL_BEADS" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 1))

echo -e "Estimated setup time: ${GREEN}~${TOTAL_TIME} minutes${NC}"

if [ "$INSTALL_GCALCLI" = "true" ]; then
    echo ""
    echo -e "${YELLOW}Note: gcalcli requires creating a Google Cloud OAuth app.${NC}"
    echo -e "${YELLOW}Your AI agent will walk you through this step-by-step.${NC}"
fi

echo ""

# Install dotfiles
if [ "$(confirm "Install dotfiles now? (tmux config, Ghostty settings)")" = "true" ]; then
    if [ "$INSTALL_KARABINER" = "true" ]; then
        ./dotfiles/install.sh --with-karabiner
    else
        ./dotfiles/install.sh
    fi
fi

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║           Setup Complete!             ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"
echo ""
echo "Next steps:"
echo ""
echo "  1. Start your AI agent CLI:"
echo -e "     ${CYAN}claude${NC} (Claude Code)"
echo ""
echo "  2. Say:"
echo -e "     ${CYAN}help me get started${NC}"
echo ""
echo "Your AI agent will guide you through installing everything."
echo ""
