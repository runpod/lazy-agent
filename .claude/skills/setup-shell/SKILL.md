# Shell Setup (Zsh + Oh My Zsh + Powerlevel10k)

Set up a beautiful, powerful shell with Oh My Zsh and Powerlevel10k prompt.

**Time estimate: 3-5 minutes**

---

## What You'll Get

- **Zsh** - Better shell than bash
- **Oh My Zsh** - Plugin framework and nice defaults
- **Powerlevel10k** - Beautiful, informative prompt

Ask: "Ready to upgrade your shell?"

---

## Step 1: Check Current Shell

```bash
echo $SHELL
```

Say: "If it says `/bin/zsh` or similar, you already have Zsh!"

If bash, install Zsh:
```bash
brew install zsh
chsh -s $(which zsh)
```

---

## Step 2: Install Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Say: "This might ask you to confirm. Say yes!"

Ask: "Did it install? Your terminal might have changed appearance."

---

## Step 3: Install Powerlevel10k

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Then set the theme in `~/.zshrc`:
```bash
# Find and change this line:
ZSH_THEME="powerlevel10k/powerlevel10k"
```

Or run:
```bash
sed -i '' 's/ZSH_THEME="robbyrussell"/ZSH_THEME="powerlevel10k\/powerlevel10k"/' ~/.zshrc
```

---

## Step 4: Reload Shell

```bash
source ~/.zshrc
```

Say: "The Powerlevel10k configuration wizard should appear!"

---

## Step 5: Configure Powerlevel10k

Say: "Follow the wizard prompts. It will ask about:"
- Icon appearance (pick what looks right)
- Prompt style (I recommend 'Rainbow' or 'Lean')
- Features you want to show

Say: "Answer the questions based on what looks good to you. You can always reconfigure later with `p10k configure`."

Ask: "Did you complete the wizard? Your prompt should look different now!"

---

## Step 6: Verify

Say: "Let's check everything works. Try `cd`-ing into a git repo:"

```bash
cd /path/to/any/git/repo
```

Ask: "Do you see git branch info in your prompt?"

---

## Success!

Say: "Your shell is set up! Features you have now:"

- **Tab completion** - Better than bash
- **Git info in prompt** - Branch, status, etc.
- **Command history** - Up arrow and Ctrl+R
- **Plugins** - Oh My Zsh has tons of them

Say: "To reconfigure the prompt anytime: `p10k configure`"

---

## Useful Plugins

Say: "Want some useful plugins? Edit `~/.zshrc` and add to the plugins line:"

```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

Install the extra plugins:
```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Then `source ~/.zshrc`.

---

## Troubleshooting

### Icons look like boxes?

You need a Nerd Font. Install one:
```bash
brew install --cask font-jetbrains-mono-nerd-font
```

Then set it in your terminal preferences.

### Prompt looks wrong?

Reconfigure:
```bash
p10k configure
```

### Oh My Zsh not loading?

Check your shell:
```bash
echo $SHELL
```

Should be `/bin/zsh`. If not:
```bash
chsh -s $(which zsh)
```

Then restart your terminal.
