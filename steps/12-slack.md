# Step 12: Slack CLI (slackcat) [OPTIONAL]

> **This step is optional and takes ~2 minutes.**
>
> Ask the user: "Would you like to set up Slack CLI? This lets you post messages and share files to Slack from the terminal. You can always set this up later by asking me to 'set up slack'."

## What is slackcat?

Post messages, share files, and pipe command output directly to Slack channels.

## Installation

```bash
brew install slackcat
```

## Setup

1. Go to: https://slackcat.chat/configure
2. Select your Slack workspace
3. Click "Authorize"
4. Copy the token shown
5. Run:
```bash
slackcat --configure
```
6. Paste your token when prompted

## Verify It Works

```bash
echo "Hello from terminal!" | slackcat -c general --noop
```

(The `--noop` flag previews without sending)

Remove `--noop` to actually send:
```bash
echo "Testing slackcat setup ✅" | slackcat -c general
```

## Common Commands

| Command | Description |
|---------|-------------|
| `echo "msg" \| slackcat -c channel` | Post message to channel |
| `slackcat -c channel -m "message"` | Direct message |
| `slackcat -c channel file.txt` | Upload file |
| `cmd \| slackcat -c channel` | Pipe output to Slack |
| `slackcat -u @user -m "hey"` | DM a user |

## Examples

```bash
# Share deployment status
echo "Deployed v1.2.3 to production 🚀" | slackcat -c releases

# Share a file
slackcat -c design ~/Desktop/mockup.png

# Pipe git diff for code review
git diff | slackcat -c code-review --filename "changes.diff"
```

## Links

- Setup: https://slackcat.chat/configure
- GitHub: https://github.com/bcicen/slackcat
