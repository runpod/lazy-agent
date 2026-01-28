#!/bin/bash
# Lazy Agent - Mini Game Training
# Quick launcher for the TUI with games and training

set -e

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

cd "$(dirname "$0")/lazy-tui"

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo -e "${YELLOW}Bun not installed. Installing...${NC}"
    curl -fsSL https://bun.sh/install | bash
    export PATH="$HOME/.bun/bin:$PATH"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${CYAN}Installing dependencies...${NC}"
    bun install
fi

echo -e "${GREEN}Starting Lazy Agent TUI...${NC}"
echo ""
echo "Keybindings:"
echo "  g - Mini Games"
echo "  m - Switch personality mode (default/wizard/pirate)"
echo "  t - Tools browser"
echo "  s - Setup wizard"
echo "  ? - Help"
echo "  q - Quit"
echo ""

bun run start
