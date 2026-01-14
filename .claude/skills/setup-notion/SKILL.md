# Notion Integration Setup

Set up Notion MCP so I can search and read your Notion docs.

**Time estimate: 1-2 minutes**

---

## What You'll Get

Once set up, you can ask me:
- "Search my Notion for the API docs"
- "What does our architecture doc say about auth?"
- "Find the onboarding checklist in Notion"

Ask: "Do you use Notion? Want to set up the integration?"

---

## Step 1: Add Notion MCP

Say: "Notion's MCP uses browser OAuth - no API keys or integration setup needed!"

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp --scope user
```

---

## Step 2: Verify

```bash
claude mcp list
```

Ask: "Do you see Notion in the list? It might show 'Needs authentication'."

---

## Step 3: Authenticate

Say: "Now let's authenticate. Type `/mcp` in Claude Code."

Say: "Select **Notion** and complete the browser login."

Say: "You'll be asked which pages to grant access to. Select the ones you want me to be able to read."

Ask: "Did the authentication complete?"

---

## Step 4: Test It

Say: "Let's test! Ask me to search your Notion:"

Example: "Search my Notion for [something you know exists]"

Ask: "Did I find results from your Notion?"

---

## Success!

Say: "You're all set! Now you can ask me things like:"

- "Search Notion for project roadmap"
- "What's in my Notion page about X?"
- "Find the meeting notes from last week"
- "Summarize the PRD in Notion"

---

## Troubleshooting

### I can't find your pages?

OAuth only grants access to pages you explicitly approved. To add more:

```bash
claude mcp remove notion
claude mcp add --transport http notion https://mcp.notion.com/mcp --scope user
```

Then authenticate again and select additional pages.

### MCP not showing Notion?

```bash
claude mcp list
```

If not there:
```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp --scope user
```

### Authentication keeps failing?

Try a fresh start:
```bash
claude mcp remove notion
claude mcp add --transport http notion https://mcp.notion.com/mcp --scope user
```

Then restart Claude Code and try `/mcp` again.
