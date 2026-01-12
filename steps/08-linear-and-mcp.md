# Step 8: Linear, Beads, and MCP Tools

## Overview

This step sets up:
- **Linear** - Project management and issue tracking
- **Beads** - Git-backed issue tracker that syncs with Linear
- **Linear MCP** - Claude Code integration with Linear
- **Notion MCP** - Claude Code integration with Notion

## Part 1: Beads (Git-Backed Issue Tracking)

Beads (`bd`) is a git-backed issue tracker that syncs with Linear. Issues live in your repo and sync bidirectionally.

### Install Beads

```bash
# Option 1: Homebrew (recommended)
brew install steveyegge/beads/bd

# Option 2: npm
npm install -g @beads/bd

# Option 3: Go
go install github.com/steveyegge/beads/cmd/bd@latest
```

### Verify Installation

```bash
bd --version
```

### Initialize in a Project

```bash
cd your-project
bd init
```

This creates a `.beads/` directory for tracking issues.

### Basic Beads Commands

| Command | Description |
|---------|-------------|
| `bd list` | List all issues |
| `bd create` | Create a new issue |
| `bd show ISSUE-ID` | Show issue details |
| `bd update ISSUE-ID` | Update an issue |
| `bd sync` | Sync with Linear |

## Part 2: Linear Sync Setup

### Get Linear API Key

1. Go to Linear: https://linear.app
2. Settings → API → Personal API keys
3. Create a new key with appropriate scopes
4. Save the key securely

### Configure Beads for Linear Sync

```bash
# Set your Linear API key
export LINEAR_API_KEY="lin_api_xxxxx"

# Or add to your ~/.zshrc.local
echo 'export LINEAR_API_KEY="your-key-here"' >> ~/.zshrc.local
```

### Sync with Linear

```bash
# Initial sync (pulls issues from Linear)
bd sync

# Push local issues to Linear
bd sync --push
```

## Part 3: MCP Tools for Claude Code

MCP (Model Context Protocol) tools extend Claude Code to interact with external services.

### Install Linear MCP

The Linear MCP tool lets Claude Code read and create Linear issues directly.

```bash
# Install the Linear MCP server
npm install -g @anthropic/mcp-server-linear
```

### Configure Claude Code for Linear MCP

Add to your Claude Code config (`~/.config/claude-code/settings.json`):

```json
{
  "mcpServers": {
    "linear": {
      "command": "mcp-server-linear",
      "env": {
        "LINEAR_API_KEY": "your-linear-api-key"
      }
    }
  }
}
```

Or create/update the config:

```bash
mkdir -p ~/.config/claude-code

cat > ~/.config/claude-code/settings.json << 'EOF'
{
  "mcpServers": {
    "linear": {
      "command": "mcp-server-linear",
      "env": {
        "LINEAR_API_KEY": "${LINEAR_API_KEY}"
      }
    }
  }
}
EOF
```

### Install Notion MCP

The Notion MCP tool lets Claude Code read and update Notion pages.

```bash
# Install the Notion MCP server
npm install -g @anthropic/mcp-server-notion
```

### Get Notion API Key

1. Go to: https://www.notion.so/my-integrations
2. Create a new integration
3. Copy the "Internal Integration Token"
4. Share your Notion pages/databases with the integration

### Configure Claude Code for Notion MCP

Update your Claude Code config:

```json
{
  "mcpServers": {
    "linear": {
      "command": "mcp-server-linear",
      "env": {
        "LINEAR_API_KEY": "${LINEAR_API_KEY}"
      }
    },
    "notion": {
      "command": "mcp-server-notion",
      "env": {
        "NOTION_API_KEY": "${NOTION_API_KEY}"
      }
    }
  }
}
```

### Set Environment Variables

Add to `~/.zshrc.local`:

```bash
# Linear
export LINEAR_API_KEY="lin_api_xxxxx"

# Notion
export NOTION_API_KEY="secret_xxxxx"
```

Then reload:

```bash
source ~/.zshrc
```

## Part 4: Using the Integrations

### With Claude Code + Linear MCP

```
> show me my Linear issues

> create a new issue in Linear: "Add dark mode to settings page"

> update issue LIN-123 to In Progress
```

### With Claude Code + Notion MCP

```
> search my Notion for "project roadmap"

> update the Notion page "Sprint Planning" with today's notes
```

### With Beads

```
> /beads list

> /beads create "Fix login bug"

> /beads sync
```

## Verification Checklist

- [ ] `bd --version` works
- [ ] `bd init` in a test project succeeds
- [ ] LINEAR_API_KEY is set in environment
- [ ] NOTION_API_KEY is set in environment
- [ ] Claude Code recognizes the MCP tools (restart Claude after config)
- [ ] `bd sync` connects to Linear (if you have access)

## Troubleshooting

### MCP tools not working?

1. Restart Claude Code after changing config
2. Check environment variables are set: `echo $LINEAR_API_KEY`
3. Verify the MCP server is installed: `which mcp-server-linear`

### Beads sync failing?

1. Check API key: `echo $LINEAR_API_KEY`
2. Verify you have access to the Linear workspace
3. Run `bd sync --verbose` for detailed output

### Permission errors?

Make sure your API keys have the right scopes:
- Linear: Read/write issues, comments
- Notion: Read/write content for shared pages

## Next Steps

With these tools configured, Claude Code can:
- Read and update your Linear issues
- Access your Notion workspace
- Keep local issues synced via Beads

This creates a powerful workflow where AI assistance is integrated with your project management.
