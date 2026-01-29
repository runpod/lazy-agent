#!/bin/bash
# Launch the Lazy Agent TUI

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TUI_DIR="$SCRIPT_DIR/lazy-tui"

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "Bun is required but not installed."
    echo "Install it with: curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

cd "$TUI_DIR"

# Install deps if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    bun install
fi

# Run the TUI
bun start
