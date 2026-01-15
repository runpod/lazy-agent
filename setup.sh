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

# Check for existing config
EXISTING_CONFIG=false
if [ -f "config.json" ] && command -v jq &> /dev/null; then
    EXISTING_CONFIG=true
    echo -e "${GREEN}Found existing config.json - showing your previous choices as defaults.${NC}"
    echo -e "${DIM}Press Enter to keep current value, or type new choice.${NC}"
    echo ""

    # Load existing values
    PREV_NAME=$(jq -r '.user.name // "Developer"' config.json)
    PREV_KARABINER=$(jq -r '.setup.optional_tools.karabiner // false' config.json)
    PREV_POWERTOOLS=$(jq -r '.setup.optional_tools.terminal_power_tools // false' config.json)
    PREV_NOTION=$(jq -r '.setup.optional_tools.notion_mcp // false' config.json)
    PREV_LINEAR=$(jq -r '.setup.optional_tools.linear_mcp // false' config.json)
    PREV_LAZYGIT=$(jq -r '.setup.optional_tools.lazygit // false' config.json)
    PREV_GH=$(jq -r '.setup.optional_tools.gh_cli // false' config.json)
    PREV_BROWSER=$(jq -r '.setup.optional_tools.browser_agent // false' config.json)
    PREV_DOCKER=$(jq -r '.setup.optional_tools.docker // false' config.json)
    PREV_GCALCLI=$(jq -r '.setup.optional_tools.gcalcli // false' config.json)
    PREV_YOLO=$(jq -r '.setup.optional_tools.claude_yolo // false' config.json)
    PREV_NOTIFY=$(jq -r '.setup.optional_tools.claude_notify // false' config.json)
    PREV_GSD=$(jq -r '.setup.optional_tools.get_shit_done // false' config.json)
    PREV_GASTOWN=$(jq -r '.setup.optional_tools.gastown // false' config.json)
    PREV_BEADS=$(jq -r '.setup.optional_tools.beads // false' config.json)
elif [ -f "config.json" ]; then
    echo -e "${YELLOW}Found config.json but jq not installed. Starting fresh.${NC}"
    echo -e "${DIM}Install jq to preserve previous choices: brew install jq${NC}"
    echo ""
fi

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
    local default="${2:-false}"  # Second param is previous value
    local default_prompt="y/N"
    local default_match="^[Yy]"

    # If previous was true, default to Y
    if [ "$default" = "true" ]; then
        default_prompt="Y/n"
        default_match="^[Nn]"
    fi

    if [ "$USE_GUM" = true ]; then
        if [ "$default" = "true" ]; then
            gum confirm --default=true "$question" && echo "true" || echo "false"
        else
            gum confirm "$question" && echo "true" || echo "false"
        fi
    else
        read -p "$question [$default_prompt]: " answer
        if [ -z "$answer" ]; then
            echo "$default"
        elif [ "$default" = "true" ]; then
            # Default is yes, so only "n" changes it
            [[ "$answer" =~ ^[Nn] ]] && echo "false" || echo "true"
        else
            # Default is no, so only "y" changes it
            [[ "$answer" =~ ^[Yy] ]] && echo "true" || echo "false"
        fi
    fi
}

# Gather info
DEFAULT_NAME="${PREV_NAME:-Developer}"
NAME=$(prompt "What's your name?" "$DEFAULT_NAME")

echo ""
echo -e "${CYAN}=== Core Setup ===${NC}"
echo -e "${DIM}These are installed for everyone (~10 min total):${NC}"
echo "  - Ghostty (terminal emulator)"
echo "  - Zsh + Oh My Zsh + Powerlevel10k"
echo "  - tmux (terminal multiplexer)"
echo "  - Claude Code"
echo ""

echo -e "${CYAN}=== Keyboard Optimization ===${NC}"
echo -e "${DIM}~2 min install, requires granting permissions${NC}"
INSTALL_KARABINER=$(confirm "Install Karabiner? (Caps Lock → Escape/Ctrl)" "$PREV_KARABINER")

echo ""
echo -e "${CYAN}=== Terminal Enhancements ===${NC}"
echo -e "${DIM}~1 min, just brew installs${NC}"
INSTALL_POWERTOOLS=$(confirm "Install power tools? (fzf, bat, eza, jq, httpie)" "$PREV_POWERTOOLS")

echo ""
echo -e "${CYAN}=== Optional Integrations ===${NC}"

echo -e "${DIM}~1 min, uses browser OAuth (no API keys needed)${NC}"
INSTALL_NOTION=$(confirm "Notion integration? (Claude can search your docs)" "$PREV_NOTION")

echo -e "${DIM}~1 min, uses browser OAuth (no API keys needed)${NC}"
INSTALL_LINEAR=$(confirm "Linear integration? (Claude can manage issues)" "$PREV_LINEAR")

echo ""
echo -e "${CYAN}=== Developer Tools ===${NC}"

echo -e "${DIM}~1 min, beautiful git TUI${NC}"
INSTALL_LAZYGIT=$(confirm "lazygit? (terminal UI for git)" "$PREV_LAZYGIT")

echo -e "${DIM}~1 min, already have it? we'll skip${NC}"
INSTALL_GH=$(confirm "GitHub CLI? (gh - for PRs, issues, actions)" "$PREV_GH")

echo -e "${DIM}~2 min, Playwright-based browser automation for AI${NC}"
INSTALL_BROWSER_AGENT=$(confirm "Browser Agent? (AI-friendly browser automation)" "$PREV_BROWSER")

echo -e "${DIM}~3 min if not installed${NC}"
INSTALL_DOCKER=$(confirm "Docker? (container runtime)" "$PREV_DOCKER")

echo -e "${DIM}⚠️  ~5-10 min, requires Google Cloud Console OAuth setup${NC}"
INSTALL_GCALCLI=$(confirm "gcalcli? (Google Calendar in terminal)" "$PREV_GCALCLI")

echo ""
echo -e "${CYAN}=== Claude Code Extensions ===${NC}"

echo -e "${DIM}~10 sec, shell alias${NC}"
INSTALL_CLAUDE_YOLO=$(confirm "clyolo alias? (claude --dangerously-skip-permissions)" "$PREV_YOLO")

echo -e "${DIM}~1 min, Homebrew install${NC}"
INSTALL_CLAUDE_NOTIFY=$(confirm "claude-notify? (Desktop notifications when Claude finishes)" "$PREV_NOTIFY")

echo -e "${DIM}~1 min, npx install${NC}"
INSTALL_GSD=$(confirm "Get Shit Done? (Meta-prompting for structured projects)" "$PREV_GSD")

echo ""
echo -e "${CYAN}=== Multi-Agent Tools ===${NC}"
echo -e "${DIM}For coordinating multiple Claude sessions${NC}"

echo -e "${DIM}~1 min, Go install${NC}"
INSTALL_GASTOWN=$(confirm "Gastown? (multi-agent workspace coordination)" "$PREV_GASTOWN")

echo -e "${DIM}~1 min, Go install${NC}"
INSTALL_BEADS=$(confirm "Beads? (git-backed issue tracking)" "$PREV_BEADS")

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
      "claude_yolo": $INSTALL_CLAUDE_YOLO,
      "claude_notify": $INSTALL_CLAUDE_NOTIFY,
      "get_shit_done": $INSTALL_GSD,
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
[ "$INSTALL_CLAUDE_YOLO" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 1))
[ "$INSTALL_CLAUDE_NOTIFY" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 1))
[ "$INSTALL_GSD" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 1))
[ "$INSTALL_GASTOWN" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 1))
[ "$INSTALL_BEADS" = "true" ] && TOTAL_TIME=$((TOTAL_TIME + 1))

echo -e "Estimated setup time: ${GREEN}~${TOTAL_TIME} minutes${NC}"

if [ "$INSTALL_GCALCLI" = "true" ]; then
    echo ""
    echo -e "${YELLOW}Note: gcalcli requires creating a Google Cloud OAuth app.${NC}"
    echo -e "${YELLOW}Claude will walk you through this step-by-step.${NC}"
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
echo "  1. Start Claude Code:"
echo -e "     ${CYAN}claude${NC}"
echo ""
echo "  2. Say:"
echo -e "     ${CYAN}help me get started${NC}"
echo ""
echo "Claude will guide you through installing everything."
echo ""
