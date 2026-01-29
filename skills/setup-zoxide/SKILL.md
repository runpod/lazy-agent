# Zoxide Setup

Install and configure zoxide - a smarter `cd` command that learns your habits.

## What is Zoxide?

Say: "Zoxide remembers the directories you visit. Instead of typing long paths, just type part of the name:"

```bash
# Instead of:
cd ~/Developer/work/my-awesome-project

# Just type:
z project
# or even:
z awesome
```

Say: "It learns which directories you use most and jumps to the best match."

---

## Step 1: Install

```bash
brew install zoxide
```

Ask: "Did it install successfully?"

---

## Step 2: Add to Shell

Say: "Add zoxide to your shell config. Run:"

```bash
echo 'eval "$(zoxide init zsh)"' >> ~/.zshrc
source ~/.zshrc
```

Ask: "Done? Let's verify it works."

---

## Step 3: First Use

Say: "Zoxide needs to learn your directories first. Visit a few:"

```bash
cd ~/Developer
cd ~/Documents
cd ~/Downloads
cd ~
```

Say: "Now try jumping back:"

```bash
z dev      # Should jump to ~/Developer
z doc      # Should jump to ~/Documents or ~/Downloads
```

Ask: "Did it jump to the right place?"

---

## Step 4: Interactive Mode

Say: "If there are multiple matches, use interactive mode:"

```bash
zi doc
```

Say: "This opens fzf to let you choose between matches (Documents vs Downloads)."

Ask: "Try `zi` with an ambiguous term."

---

## Step 5: How It Works

Say: "Zoxide scores directories based on:"
- **Frecency** = Frequency + Recency
- Directories you visit often score higher
- Recently visited directories score higher

Say: "The more you use it, the smarter it gets."

---

## Commands Reference

```
z <query>     Jump to best match
zi <query>    Interactive selection (fzf)
z -           Jump to previous directory
zoxide query  See what z would match
zoxide edit   Manually edit the database
```

---

## Pro Tips

Say: "Some power-user tricks:"

**Multiple keywords:**
```bash
z work project api    # Matches path containing all three
```

**Exclude paths:**
```bash
z project --exclude ~/old-projects
```

**Check what would match:**
```bash
zoxide query project --list
```

---

## Wrap Up

Say: "That's it! The key command is just `z <partial-name>`"

Say: "It takes a day or two to build up the database, but then it's magical. You'll never type long paths again."

Ask: "Any questions about zoxide?"
