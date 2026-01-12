#!/bin/bash

echo "========================================="
echo "  Setting up test environment"
echo "========================================="

# Install system dependencies
sudo apt-get update
sudo apt-get install -y tmux zsh golang-go

# Install Claude Code
echo "Installing Claude Code..."
npm install -g @anthropic-ai/claude-code

# Install Gastown
echo "Installing Gastown..."
go install github.com/steveyegge/gastown/cmd/gt@latest
echo 'export PATH="$HOME/go/bin:$PATH"' >> ~/.bashrc
export PATH="$HOME/go/bin:$PATH"

# Install Beads
echo "Installing Beads..."
go install github.com/steveyegge/beads/cmd/bd@latest

# Install MCP servers
echo "Installing MCP servers..."
npm install -g @anthropic/mcp-server-linear 2>/dev/null || echo "Linear MCP: install manually if needed"
npm install -g @anthropic/mcp-server-notion 2>/dev/null || echo "Notion MCP: install manually if needed"

# Install Playwright
echo "Installing Playwright..."
npm install -g playwright
npx playwright install chromium --with-deps 2>/dev/null || echo "Playwright browsers: install manually if needed"

# Clone the dotfiles repo
echo "Cloning dotfiles..."
mkdir -p ~/Developer
git clone https://github.com/zackmckennarunpod/.dotfiles ~/Developer/.dotfiles 2>/dev/null || echo "Dotfiles already cloned or unavailable"

echo ""
echo "========================================="
echo "  Ready to test!"
echo "========================================="
echo ""
echo "Installed:"
echo "  - tmux, zsh"
echo "  - Claude Code"
echo "  - Gastown (gt)"
echo "  - Beads (bd)"
echo "  - MCP servers (Linear, Notion)"
echo "  - Playwright"
echo ""
echo "Run: claude"
echo "Then say: help me get started"
echo ""
