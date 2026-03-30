---
name: "setup-ghostty"
description: "Installs and configures Ghostty GPU-accelerated terminal with Nerd Font and dotfiles config. Use when the user says 'install ghostty', 'set up ghostty', 'setup terminal', 'ghostty config', or wants a fast modern terminal emulator."
---

# Ghostty Terminal Setup

Installs and configures Ghostty — a fast, GPU-accelerated terminal — with Nerd Font and project dotfiles. Time estimate: 2-3 minutes.

## Step 1: Explain and Confirm

Ghostty is GPU-accelerated, has excellent font rendering, and feels native on macOS. Ask if the user wants to proceed.

---

## Step 1: Install Ghostty

```bash
brew install --cask ghostty
```

Ask: "Did it install? You might need to enter your password."

---

## Step 2: Install Nerd Font

Say: "Ghostty needs a Nerd Font for icons. Let's install JetBrains Mono:"

```bash
brew install --cask font-jetbrains-mono-nerd-font
```

---

## Step 3: Apply Config

Say: "Let's apply our Ghostty config:"

```bash
./dotfiles/install.sh
```

Or manually:
```bash
mkdir -p ~/.config/ghostty
ln -sf "$(pwd)/dotfiles/.config/ghostty/config" ~/.config/ghostty/config
```

---

## Step 4: Open Ghostty

Say: "Open Ghostty from Applications or Spotlight."

Ask: "Does it open? You should see a terminal with nice font rendering."

---

## Step 5: Verify Font

Say: "Let's check the Nerd Font is working. Run this:"

```bash
echo "  󰊢  󰊤"
```

Ask: "Do you see icons (git branch, folder, GitHub logo)? Or just boxes/question marks?"

If boxes: "The font might not be set. Open Ghostty preferences and select 'JetBrainsMono Nerd Font'."

---

## Success!

Say: "Ghostty is ready! Some tips:"

- **Cmd+T** - New tab
- **Cmd+W** - Close tab
- **Cmd+Enter** - Toggle fullscreen
- **Cmd+,** - Preferences

Say: "The config file is at `~/.config/ghostty/config` if you want to customize."

---

## Troubleshooting

### Font looks wrong?

Open Ghostty, press Cmd+, and set:
- Font: JetBrainsMono Nerd Font
- Size: 14 (or your preference)

### Theme not applied?

Check the config exists:
```bash
cat ~/.config/ghostty/config
```

If empty or missing:
```bash
./dotfiles/install.sh
```

### "Application not opened" security warning?

Go to System Preferences → Privacy & Security and click "Open Anyway".
