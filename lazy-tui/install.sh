#!/bin/bash
# Lazy Agent TUI - Quick Install
# Usage: curl -fsSL https://raw.githubusercontent.com/zackmckennarunpod/hello-claude/main/lazy-tui/install.sh | bash

set -e

echo "Installing Lazy Agent TUI..."

# Check for bun
if ! command -v bun &> /dev/null; then
    echo "Bun not found. Installing bun..."
    curl -fsSL https://bun.sh/install | bash
    export PATH="$HOME/.bun/bin:$PATH"
fi

# Clone or update repo
INSTALL_DIR="$HOME/.lazy-agent"
if [ -d "$INSTALL_DIR" ]; then
    echo "Updating existing installation..."
    cd "$INSTALL_DIR"
    git pull
else
    echo "Cloning repository..."
    git clone https://github.com/zackmckennarunpod/hello-claude.git "$INSTALL_DIR"
fi

# Install dependencies and link
cd "$INSTALL_DIR/lazy-tui"
bun install
bun link

echo ""
echo "✓ Lazy Agent installed!"
echo ""
echo "Run 'lazy' to start the TUI."
echo ""
