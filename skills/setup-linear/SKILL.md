# Linear Integration Setup

Set up Linear MCP and optionally Beads for git-backed issue tracking.

**Time estimate: 2-3 minutes**

---

## What You'll Get

- **Linear MCP**: I can read/create Linear issues directly
- **Beads** (optional): Git-backed issue tracking that syncs with Linear

Ask: "Do you use Linear for issue tracking?"

If no: "No problem! Skip this one."

---

## Step 1: Add Linear MCP

Say: "Linear's MCP uses browser OAuth - no API keys needed!"

```bash
claude mcp add --transport http linear https://mcp.linear.app/mcp --scope user
```

---

## Step 2: Verify

```bash
claude mcp list
```

Ask: "Do you see Linear in the list?"

---

## Step 3: Authenticate

Say: "Now we need to authenticate. Type `/mcp` in Claude Code."

Say: "Select **Linear** and complete the browser login."

Ask: "Did the authentication complete? Linear should show as connected."

---

## Step 4: Test It

Say: "Let's test! Ask me something like:"
- "Show me my Linear issues"
- "What's assigned to me in Linear?"

Ask: "Can you see your issues?"

---

## Optional: Beads (Git-Backed Issues)

Say: "Beads lets you track issues locally in git and sync with Linear. Want to set it up?"

If yes, continue:

### Install Beads

```bash
brew install steveyegge/beads/bd
```

Or with Go:
```bash
go install github.com/steveyegge/beads/cmd/bd@latest
```

### Initialize in a Project

```bash
cd your-project
bd init
```

### Configure Linear Sync

Say: "For Linear sync, you need an API key. Get one from:"
```
Linear → Settings → API → Personal API keys → Create key
```

Then:
```bash
bd config set linear.api_key "lin_api_YOUR_KEY"
bd config set linear.team_id "YOUR_TEAM_UUID"
```

### Test Sync

```bash
bd linear status
bd linear sync --pull --dry-run
```

---

## Success!

Say: "You're set up! Here's what you can do:"

**With Linear MCP:**
- "Show my Linear issues"
- "Create a Linear issue: Fix the login bug"
- "What's the status of TEAM-123?"

**With Beads:**
```bash
bd list              # List local issues
bd create "Title"    # Create issue
bd linear sync       # Sync with Linear
```

---

## Troubleshooting

### MCP not showing Linear?

```bash
claude mcp list
```

If not there, add it again:
```bash
claude mcp add --transport http linear https://mcp.linear.app/mcp --scope user
```

### Authentication failed?

Try removing and re-adding:
```bash
claude mcp remove linear
claude mcp add --transport http linear https://mcp.linear.app/mcp --scope user
```

Then `/mcp` to authenticate again.
