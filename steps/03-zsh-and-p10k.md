# Step 3: Zsh, Oh My Zsh, and Powerlevel10k

## What We're Setting Up

- **Zsh** - A powerful shell (already default on macOS)
- **Oh My Zsh** - Framework for managing Zsh configuration and plugins
- **Powerlevel10k** - A beautiful, fast, customizable prompt

## Why This Matters

Your prompt is something you look at thousands of times a day. A good prompt:
- Shows you where you are (directory)
- Shows git status at a glance
- Shows if last command failed
- Looks good (you'll enjoy using your terminal more)

## Check Current Shell

```bash
echo $SHELL
```

Should show `/bin/zsh`. If not, we'll switch.

## Install Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

This will:
- Install Oh My Zsh to `~/.oh-my-zsh`
- Create a new `~/.zshrc` (backs up your old one)
- Set Zsh as your default shell

## Install Powerlevel10k

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Now set it as your theme. Edit `~/.zshrc`:

```bash
# Change this line in ~/.zshrc
# FROM: ZSH_THEME="robbyrussell"
# TO:   ZSH_THEME="powerlevel10k/powerlevel10k"

sed -i '' 's/ZSH_THEME="robbyrussell"/ZSH_THEME="powerlevel10k\/powerlevel10k"/' ~/.zshrc
```

## Configure Powerlevel10k

### Option 1: Use Dotfiles Config (Recommended)

If you want to use the pre-configured p10k setup:

```bash
# Link the p10k config from dotfiles
ln -sf ~/Developer/.dotfiles/.p10k.zsh ~/.p10k.zsh

# Link the zshrc from dotfiles
ln -sf ~/Developer/.dotfiles/.zshrc ~/.zshrc

# Reload
source ~/.zshrc
```

### Option 2: Run the Wizard

If you want to customize your own, restart your terminal (or run `exec zsh`), and the configuration wizard will start automatically.

If it doesn't start, run:

```bash
p10k configure
```

### Recommended Wizard Choices

The wizard asks many questions. Here are recommended choices:

1. **Does this look like a diamond?** - Yes (if font is correct)
2. **Does this look like a lock?** - Yes
3. **Does this look like an arrow?** - Yes
4. **Do all icons fit?** - Yes
5. **Prompt Style** - Rainbow or Lean (personal preference)
6. **Character Set** - Unicode
7. **Show current time?** - 24-hour format
8. **Prompt Separators** - Angled
9. **Prompt Heads** - Sharp
10. **Prompt Tails** - Flat
11. **Prompt Height** - Two lines
12. **Prompt Connection** - Solid
13. **Prompt Frame** - No frame
14. **Prompt Spacing** - Sparse
15. **Icons** - Many icons
16. **Prompt Flow** - Concise
17. **Enable Transient Prompt?** - Yes
18. **Instant Prompt Mode** - Verbose

You can always reconfigure later with `p10k configure`.

## Useful Oh My Zsh Plugins

Edit `~/.zshrc` and add these plugins:

```bash
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  docker
  npm
)
```

Install the extra plugins:

```bash
# Autosuggestions (suggests commands as you type)
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Syntax highlighting (colors valid/invalid commands)
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Reload your config:

```bash
source ~/.zshrc
```

## What Your Prompt Shows

After setup, your prompt will show:

```
┌── user@host ~/Developer/project main ●2 ✚1
└─❯
```

Breaking this down:
- `user@host` - Who and where you are
- `~/Developer/project` - Current directory
- `main` - Git branch
- `●2` - 2 staged files
- `✚1` - 1 unstaged change
- `❯` - Ready for input (turns red if last command failed)

## Verification Checklist

- [ ] Prompt shows with colors and icons
- [ ] Git status shows in git directories
- [ ] Autosuggestions appear (gray text as you type)
- [ ] Commands highlight (green = valid, red = invalid)

## Troubleshooting

### Icons look wrong?

Make sure Ghostty is using the Nerd Font:
```bash
grep font-family ~/.config/ghostty/config
```

Should show `JetBrainsMono Nerd Font` or similar.

### Prompt is slow?

Powerlevel10k is fast, but if you're in a huge git repo, it might lag. You can disable git status for specific directories.

## Next Step

Now let's set up tmux - this is where the real productivity magic happens.
