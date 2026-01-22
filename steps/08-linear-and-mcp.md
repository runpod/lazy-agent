---
title: Linear, Beads, and MCP Tools
time_estimate: 5 min
required: false
recommended: true
dependencies:
  - 05-claude-code
---

# Step 8: Linear, Beads, and MCP Tools

## Overview

This step sets up:
- **Beads** - Git-backed issue tracker with Linear sync
- **Linear MCP** - Claude Code integration with Linear
- **Notion MCP** - Claude Code integration with Notion

## Part 1: Beads (Git-Backed Issue Tracking)

Beads (`bd`) is a git-backed issue tracker that syncs bidirectionally with Linear. Issues live in your repo as JSONL files.

### Install Beads

```bash
# Option 1: Homebrew (recommended)
brew install steveyegge/beads/bd

# Option 2: npm
npm install -g @beads/bd

# Option 3: Go
go install github.com/steveyegge/beads/cmd/bd@latest

# Option 4: Shell script
curl -fsSL https://raw.githubusercontent.com/steveyegge/beads/main/scripts/install.sh | bash
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
| `bd ready` | List tasks with no open blockers |
| `bd create "Title"` | Create a new issue |
| `bd show ISSUE-ID` | Show issue details |
| `bd update ISSUE-ID` | Update an issue |
| `bd close ISSUE-ID` | Close an issue |

## Part 2: Linear Sync with Beads

Beads has **built-in** Linear sync via `bd linear` commands. No separate MCP needed for sync.

### Get Linear Credentials

1. **API Key**: Linear → Settings → API → Personal API keys → Create key
2. **Team ID**: Linear → Settings → General → find the Team ID (UUID format)

### Configure Beads for Linear

```bash
# Set API key
bd config set linear.api_key "lin_api_YOUR_KEY_HERE"

# Set team ID (required!)
bd config set linear.team_id "YOUR_TEAM_UUID"
```

Or use environment variables:

```bash
# Add to ~/.zshrc.local
export LINEAR_API_KEY="lin_api_YOUR_KEY_HERE"
```

### Check Linear Status

```bash
bd linear status
```

This shows:
- Configuration status (API key, team ID)
- Last sync timestamp
- Issues linked to Linear

### Sync Commands

```bash
# Pull issues from Linear into Beads
bd linear sync --pull

# Push local Beads issues to Linear
bd linear sync --push

# Full bidirectional sync (pull, resolve conflicts, push)
bd linear sync

# Preview without making changes
bd linear sync --dry-run
```

### Example Linear Workflow

```bash
# Initial setup
bd config set linear.api_key "lin_api_abc123..."
bd config set linear.team_id "team-uuid-456"

# Check connection
bd linear status

# Pull all issues from Linear
bd linear sync --pull

# Work locally
bd create "Fix auth bug" -t bug -p 1
bd update bd-abc --status in_progress

# Push changes back to Linear
bd linear sync --push

# Or do full bidirectional sync
bd linear sync
```

## Part 3: MCP Tools for Claude Code

MCP (Model Context Protocol) tools extend Claude Code to interact with external services directly.

Use the `claude mcp add` CLI command to configure MCP servers. Configuration is stored in `~/.claude.json`.

### Add Linear MCP

Linear's official MCP uses browser OAuth - no API key needed!

```bash
# Add Linear MCP globally (available in all projects)
claude mcp add --transport http linear https://mcp.linear.app/mcp --scope user
```

### Add Notion MCP

Notion's official MCP also uses browser OAuth - no API key or integration setup needed!

```bash
# Add Notion MCP globally (available in all projects)
claude mcp add --transport http notion https://mcp.notion.com/mcp --scope user
```

### Verify MCP Servers

```bash
claude mcp list
```

You should see:
```
linear: https://mcp.linear.app/mcp (HTTP) - ✓ Connected
notion: https://mcp.notion.com/mcp (HTTP) - ⚠ Needs authentication
```

### Authenticate MCP Servers

For servers showing "Needs authentication":

1. Start a new Claude Code session: `claude`
2. Type `/mcp` to open the MCP authentication menu
3. Follow the browser prompts to log in

### MCP Scopes

| Scope | Flag | Config Location | Use Case |
|-------|------|-----------------|----------|
| User | `--scope user` | `~/.claude.json` | Available in all projects |
| Project | `--scope project` | `.mcp.json` in project root | Shared with team via git |
| Local | (default) | `~/.claude.json` (per-project) | Only this project, not shared |

## Part 4: Using the Integrations

### With Beads (Local Issue Tracking)

```bash
# In Claude Code, use slash commands
/beads list
/beads create "Fix login bug"
/beads ready
/beads sync   # Note: this uses bd sync, for Linear use bd linear sync
```

### With Linear MCP (Direct API Access)

Once configured, Claude can interact with Linear directly:

```
> show me my Linear issues

> create a Linear issue: "Add dark mode to settings"

> what's the status of TEAM-123?
```

### With Notion MCP

```
> search my Notion for "project roadmap"

> update the Notion page "Sprint Planning" with today's notes

> look at my Notion profile and fill out this config for me
```

### Beads + Linear Together

Beads and Linear MCP serve different purposes:
- **Beads**: Local git-backed issues that sync to Linear (for agents working across sessions)
- **Linear MCP**: Direct API access to Linear (for quick queries and updates)

Use both together:
```bash
# Create issue locally with Beads
bd create "Implement feature X" -t feature -p 2

# Sync to Linear
bd linear sync --push

# Query via Linear MCP in Claude
> show me all P1 bugs in Linear
```

## Verification Checklist

- [ ] `bd --version` works
- [ ] `bd init` in a test project succeeds
- [ ] `claude mcp list` shows Linear and Notion
- [ ] Linear shows "Connected" or authenticated via `/mcp`
- [ ] Notion shows "Connected" or authenticated via `/mcp`
- [ ] `bd linear status` shows configured (if using Linear sync)

## Troubleshooting

### Beads Linear sync not working?

1. Check Beads Linear configuration:
   ```bash
   bd linear status
   ```

2. Test the API key:
   ```bash
   bd linear sync --pull --dry-run
   ```

3. Check for errors:
   ```bash
   bd linear sync --pull 2>&1 | head -20
   ```

### MCP tools not showing up in Claude?

1. Restart Claude Code after config changes
2. Verify the config file location: `~/.claude/settings.json`
3. Check the MCP server is installed: `which npx`
4. Test manually: `npx -y @mseep/linear-mcp --help`

### "Team ID not configured"

```bash
# Find your team ID in Linear URL or settings
bd config set linear.team_id "YOUR_TEAM_UUID"
```

### Notion integration not finding pages?

Make sure you've shared the pages with your integration:
1. Open the Notion page
2. Click "Share" in the top right
3. Invite your integration by name

## Next Steps

With these tools configured:
- **Beads** tracks issues locally in git, synced to Linear
- **Linear MCP** lets Claude query/update Linear directly
- **Notion MCP** lets Claude access your Notion workspace

This creates a powerful workflow where AI assistance integrates with your project management tools.
