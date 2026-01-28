# External Integrations

**Analysis Date:** 2026-01-15

## APIs & External Services

**Payment Processing:**
- Not applicable

**Email/SMS:**
- Not applicable

**External APIs:**
- Not applicable (this is a local development tool)

## Data Storage

**Databases:**
- None (file-based configuration only)

**File Storage:**
- Local filesystem only
- `config.json` - User preferences (gitignored)
- `~/.zshrc.local` - Environment variables (user's home directory)

**Caching:**
- None

## Authentication & Identity

**Auth Provider:**
- Anthropic Claude - OAuth via Claude Code CLI (`claude` command)
  - Authentication: Browser-based OAuth flow
  - Token storage: Managed by Claude Code CLI

**OAuth Integrations:**
- Linear - Project management integration
  - Integration: MCP server (`https://mcp.linear.app/mcp`)
  - Authentication: Browser OAuth (no API key needed for MCP)
  - Setup: `claude mcp add --transport http linear https://mcp.linear.app/mcp --scope user`
  - File: `steps/08-linear-and-mcp.md`

- Notion - Knowledge base integration
  - Integration: MCP server (`https://mcp.notion.com/mcp`)
  - Authentication: Browser OAuth
  - Setup: `claude mcp add --transport http notion https://mcp.notion.com/mcp --scope user`
  - File: `steps/08-linear-and-mcp.md`

- Google Calendar - Calendar CLI (gcalcli)
  - Integration: gcalcli CLI tool
  - Authentication: Google Cloud OAuth (interactive setup)
  - Requires: User creates Google Cloud project and OAuth credentials
  - File: `AGENTS.md` (lines 199-230 describe OAuth walkthrough)

## Monitoring & Observability

**Error Tracking:**
- None (local development tool)

**Analytics:**
- None

**Logs:**
- Console output only (no log aggregation)

## CI/CD & Deployment

**Hosting:**
- Not applicable (git repository, cloned locally)

**CI Pipeline:**
- None configured

## Environment Configuration

**Development:**
- Required env vars: None required for basic setup
- Optional env vars:
  - `ANTHROPIC_API_KEY` - Claude API access (if using API directly)
  - `LINEAR_API_KEY` - Only for Beads sync feature (`bd linear sync`)
- Secrets location: `~/.zshrc.local` (gitignored from user's shell config)

**Staging:**
- Not applicable

**Production:**
- Not applicable

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## MCP (Model Context Protocol) Servers

**Linear MCP:**
- Endpoint: `https://mcp.linear.app/mcp`
- Transport: HTTP
- Authentication: Browser OAuth
- Installation: `claude mcp add --transport http linear https://mcp.linear.app/mcp --scope user`
- Verification: `claude mcp list`
- File: `reference/tools-and-links.md` (lines 227-250)

**Notion MCP:**
- Endpoint: `https://mcp.notion.com/mcp`
- Transport: HTTP
- Authentication: Browser OAuth
- Installation: `claude mcp add --transport http notion https://mcp.notion.com/mcp --scope user`
- Verification: `claude mcp list`
- File: `reference/tools-and-links.md` (lines 261-291)

## Third-Party Tools

**Package Managers:**
- Homebrew (`https://brew.sh`) - macOS package manager
- npm registry - Node.js packages
- Go modules - Go packages

**Git-Based:**
- GitHub - Repository hosting
- Gastown (`github.com/steveyegge/gastown`) - Multi-agent workspaces
- Beads (`github.com/steveyegge/beads`) - Git-backed issue tracking

**Terminal Tools:**
- Ghostty - GPU-accelerated terminal (local app)
- tmux - Terminal multiplexer (local)
- fzf, bat, eza, jq, httpie - Terminal power tools (local)

**Browser Automation:**
- Playwright - Browser automation framework
  - Installation: `npm install -g playwright`
  - Browsers: Chromium, Firefox, WebKit
  - File: `steps/09-playwright.md`

## Integration Configuration Files

**Claude Code:**
- `.claude/settings.local.json` - Project-specific permissions
- `~/.config/claude-code/settings.json` - Global Claude settings

**Dotfiles:**
- `dotfiles/.tmux.conf` - tmux configuration
- `dotfiles/.config/ghostty/config` - Ghostty settings
- `dotfiles/.config/karabiner/karabiner.json` - Keyboard customization

**Environment:**
- `~/.zshrc.local` - Environment variables (gitignored)
- `config.json` - User preferences (gitignored)

---

*Integration audit: 2026-01-15*
*Update when adding/removing external services*
