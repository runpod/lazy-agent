# Glow Setup

Install glow - a beautiful markdown viewer for the terminal.

## What is Glow?

Say: "Glow renders markdown beautifully in your terminal - with colors, formatting, and even images in supported terminals."

---

## Step 1: Install

```bash
brew install glow
```

Ask: "Did it install?"

---

## Step 2: Try It

Say: "Let's render a markdown file:"

```bash
glow README.md
```

Say: "You should see beautifully formatted markdown with:"
- Syntax-highlighted code blocks
- Colored headings
- Formatted lists and tables
- Clickable links

Ask: "Does it look good?"

---

## Step 3: Interactive Mode

Say: "Glow has a file browser mode:"

```bash
glow
```

Say: "This opens an interactive browser. Use:"
- Arrow keys to navigate
- Enter to view a file
- `q` to quit

---

## Step 4: Stash (Cloud Sync)

Say: "You can save markdown files to Glow's cloud stash:"

```bash
glow stash README.md
```

Say: "Then access them anywhere with `glow stash`"

Note: Requires creating a free account with `glow auth`

---

## Step 5: Pager Mode

Say: "Use glow as a pager for any command output:"

```bash
cat README.md | glow -
```

Say: "This is useful for piping markdown content."

---

## Step 6: Style Options

Say: "Glow has different styles:"

```bash
glow -s dark README.md     # Dark theme
glow -s light README.md    # Light theme
glow -s auto README.md     # Auto-detect
glow -s dracula README.md  # Dracula theme
```

Say: "Try different styles to find your favorite."

---

## Quick Reference

```
glow <file>        Render markdown file
glow               Interactive file browser
glow -             Read from stdin
glow -s <style>    Choose style (dark/light/auto/dracula)
glow -w <width>    Set max width
glow stash <file>  Save to cloud stash
```

---

## Pro Tips

Say: "Some useful tricks:"

**Preview in fzf:**
```bash
fzf --preview 'glow -s dark {}'
```

**Create an alias:**
```bash
alias md='glow'
```

**Render GitHub READMEs:**
```bash
glow github.com/user/repo
```

---

## Wrap Up

Say: "Now you can read markdown beautifully in your terminal!"

Say: "Try `glow README.md` in any project to quickly read docs."

Ask: "Any questions?"
