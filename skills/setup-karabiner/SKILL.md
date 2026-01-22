# Karabiner-Elements Setup

Configure Caps Lock as Escape (tap) and Control (hold) - a game changer for vim and tmux.

**Time estimate: 2-3 minutes**

---

## Why This Matters

Say: "Karabiner lets you turn Caps Lock into a superpower:"
- **Tap Caps Lock** → Escape (no more reaching!)
- **Hold Caps Lock** → Control (easier chords)
- **Caps Lock + A** → Ctrl+B (tmux prefix shortcut)

Ask: "Want to set this up? It's optional but highly recommended for vim/tmux users."

---

## Step 1: Install Karabiner

```bash
brew install --cask karabiner-elements
```

Ask: "Did it install? You might need to enter your password."

---

## Step 2: Open Karabiner & Grant Permissions

Say: "Open Karabiner-Elements from Applications (or Spotlight)."

Say: "macOS will ask for permissions. You need to:"
1. Go to **System Preferences** → **Privacy & Security** → **Input Monitoring**
2. Enable **Karabiner-Elements** and **karabiner_grabber**

Say: "You may need to restart Karabiner after granting permissions."

Ask: "Is Karabiner running? You should see a keyboard icon in your menu bar."

---

## Step 3: Install Our Config

Say: "Now let's install the config that sets up Caps Lock magic:"

```bash
./dotfiles/install.sh --with-karabiner
```

Or manually:
```bash
mkdir -p ~/.config/karabiner
ln -sf "$(pwd)/dotfiles/.config/karabiner/karabiner.json" ~/.config/karabiner/karabiner.json
```

---

## Step 4: Test Caps Lock as Escape

Say: "Let's test it! Open vim:"

```bash
vim
```

Say: "Press `i` to enter insert mode, type something, then **tap Caps Lock**."

Ask: "Did it exit insert mode? (Same as pressing Escape)"

Say: "Type `:q!` and Enter to quit vim."

---

## Step 5: Test Caps Lock as Control

Say: "Now let's test it as Control. In your terminal:"
- Hold Caps Lock + tap C

Ask: "Did it act like Ctrl+C? (Should interrupt/cancel)"

---

## Step 6: Test Tmux Prefix Shortcut

Say: "The best part - tmux prefix! Start tmux:"

```bash
tmux new -s test
```

Say: "Now press **Caps Lock + A**, release, then press **|**"

Ask: "Did you get a vertical split? That's Caps+A acting as the tmux prefix!"

Say: "Press Caps Lock + A, then d to detach."

---

## Success!

Say: "You're all set! Here's what Caps Lock does now:"

| Action | Keys |
|--------|------|
| Escape | Tap Caps Lock |
| Control | Hold Caps Lock |
| Tmux prefix (Ctrl+B) | Caps Lock + A |

Say: "Your hands will thank you - no more reaching for Escape or awkward Ctrl+B!"

---

## Troubleshooting

### Caps Lock not working as Escape?

1. Check Karabiner is running (menu bar icon)
2. Verify permissions in System Preferences
3. Try restarting Karabiner from the menu bar

### Config not loading?

```bash
ls -la ~/.config/karabiner/karabiner.json
```

Should be a symlink to our dotfiles. If not:
```bash
./dotfiles/install.sh --with-karabiner
```

### Want to disable it?

Open Karabiner-Elements and remove the rules, or:
```bash
rm ~/.config/karabiner/karabiner.json
```
