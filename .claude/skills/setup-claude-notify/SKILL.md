# Claude-Notify Setup

Get desktop notifications when Claude Code finishes tasks, encounters errors, or needs input.

**Time estimate: 1-2 minutes**

---

## Why This Matters

Say: "Claude-notify sends desktop alerts so you can work on other things while Claude runs long tasks. You'll know immediately when:"
- A task completes
- An error occurs
- Claude needs your approval (bash commands)

Ask: "Want to set this up? It's quick and very useful for background work."

---

## Step 1: Install

```bash
brew tap mylee04/tools
brew install claude-notify
```

Ask: "Did it install? Run `cn --help` to check."

---

## Step 2: Enable Globally

```bash
cn on
```

Say: "This enables notifications for all Claude Code sessions."

---

## Step 3: Verify It Works

```bash
cn status
```

Say: "You should see 'Notifications: enabled'. Now start a Claude Code session and you'll get notified when tasks complete."

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `cn on` | Enable notifications globally |
| `cn off` | Disable notifications globally |
| `cnp on` | Enable for current project only |
| `cnp off` | Disable for current project |
| `cn status` | Check current configuration |
| `cnp voice on` | Enable voice alerts (macOS) |

---

## Per-Project Settings

Say: "You can override global settings per project:"

```bash
cnp on      # Enable just for this project
cnp off     # Disable just for this project
```

Say: "Project settings are stored in `.claude/settings.json` in the project root."

---

## Voice Notifications (macOS)

Say: "Want Claude to speak when tasks complete?"

```bash
cnp voice on
```

---

## Troubleshooting

### Notifications not appearing?

1. Check it's enabled: `cn status`
2. Ensure system notifications are allowed for Terminal/iTerm/Ghostty
3. Try disabling and re-enabling: `cn off && cn on`

---

## Wrap Up

Say: "That's it! Now you can let Claude work in the background and you'll be notified when it needs you."

Say: "This is especially useful with tmux - start Claude in one pane, work in another, and get notified when it's done."

Ask: "Any questions about claude-notify?"
