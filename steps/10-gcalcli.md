# Step 10: Google Calendar CLI (gcalcli)

## What is gcalcli?

A lightweight CLI for Google Calendar. Check your agenda, add events, search meetings - all from the terminal. No MCP needed - uses minimal context.

## Installation

```bash
brew install gcalcli
```

## OAuth Setup (Interactive Walkthrough)

You'll create your own Google OAuth app. This takes ~5 minutes and means you own your credentials.

### Step 1: Open Google Cloud Console

Go to: https://console.cloud.google.com/

Are you logged in? Continue when ready.

### Step 2: Create or Select a Project

- If prompted, create a new project named `gcalcli` or `personal-tools`
- Or select an existing project

### Step 3: Enable Google Calendar API

1. In the search bar at the top, type **"Google Calendar API"**
2. Click on **"Google Calendar API"** in the results
3. Click the blue **"Enable"** button

Confirm: Do you see "API Enabled"?

### Step 4: Set Up OAuth Consent Screen

1. Go to **APIs & Services → OAuth consent screen** (left sidebar)
2. Choose:
   - **Internal** if you have Google Workspace (@yourcompany.com)
   - **External** if using personal Gmail
3. Fill in required fields:
   - App name: `gcalcli`
   - User support email: your email
   - Developer contact email: your email
4. Click **Save and Continue** through the rest (skip scopes, add yourself as test user if External)

### Step 5: Create OAuth Credentials

1. Go to **Credentials** in the left sidebar
2. Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
3. Application type: **Desktop app**
4. Name: `gcalcli`
5. Click **Create**

You'll see your **Client ID** and **Client Secret**. Keep this window open!

### Step 6: Authenticate gcalcli

Run:
```bash
gcalcli init
```

When prompted:
1. Paste your **Client ID**
2. Paste your **Client Secret**
3. A browser opens - click **Allow** to authorize

### Step 7: Verify It Works

```bash
gcalcli agenda
```

You should see your upcoming calendar events!

## Common Commands

| Command | Description |
|---------|-------------|
| `gcalcli agenda` | Show upcoming events |
| `gcalcli agenda "today" "next week"` | Custom date range |
| `gcalcli list` | List your calendars |
| `gcalcli quick "Lunch tomorrow noon"` | Quick add (natural language) |
| `gcalcli add --title "Meeting" --when "3pm" --duration 60` | Add event |
| `gcalcli search "standup"` | Search events |
| `gcalcli delete "Event title"` | Delete event |

## Tips

- Use `--calendar "Work"` to specify which calendar
- Use `--details all` for verbose output
- Credentials are stored in `~/.gcalcli_oauth`

## Troubleshooting

- **Auth failed**: Run `gcalcli init` again
- **Wrong calendar**: Use `gcalcli list` to see calendars
- **Token expired**: Delete `~/.gcalcli_oauth` and re-authenticate

## Links

- GitHub: https://github.com/insanum/gcalcli
- Docs: https://github.com/insanum/gcalcli#readme
