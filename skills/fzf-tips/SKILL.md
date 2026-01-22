# fzf Power Tips

Teach the user how to get the most out of fzf (fuzzy finder).

## Before You Start

Check if fzf is installed:
```bash
which fzf && echo "fzf: installed" || echo "fzf: NOT installed - run 'brew install fzf'"
```

If not installed:
```bash
brew install fzf
$(brew --prefix)/opt/fzf/install  # Install shell integrations
```

---

## Part 1: The Basics

Say: "fzf is a fuzzy finder - it lets you search through anything interactively."

Try it:
```bash
ls | fzf
```

Say: "Type to filter, use arrow keys to navigate, Enter to select."

---

## Part 2: History Search (Game Changer)

Say: "This is the most useful fzf feature. Press:"

`Ctrl + R`

Say: "Now you can fuzzy search your entire command history. Try typing part of a command you've run before."

Ask: "Did you find an old command? Press Enter to run it or Ctrl+C to cancel."

---

## Part 3: File Search

Say: "Quickly find and insert file paths. Press:"

`Ctrl + T`

Say: "This searches all files in the current directory. Select one and it gets inserted into your command."

Example:
```bash
cat <Ctrl+T>  # Then search for a file
```

Ask: "Try it - type `cat ` then press Ctrl+T to find a file."

---

## Part 4: Directory Jump

Say: "Change to any subdirectory instantly. Press:"

`Alt + C` (or `Esc` then `C` on Mac)

Say: "This searches directories and cd's into the one you select."

Ask: "Try jumping to a nested directory."

---

## Part 5: Preview Mode

Say: "You can preview file contents while searching:"

```bash
fzf --preview 'bat --color=always {}'
```

Say: "This shows a syntax-highlighted preview of each file as you navigate."

---

## Part 6: Piping to fzf

Say: "fzf works with any input. Some useful examples:"

**Search git branches:**
```bash
git branch | fzf | xargs git checkout
```

**Search processes to kill:**
```bash
ps aux | fzf | awk '{print $2}' | xargs kill
```

**Search and open in editor:**
```bash
fzf | xargs code  # or nvim
```

---

## Part 7: Pro Tips

Say: "Some advanced tricks:"

**Multi-select with Tab:**
- Press `Tab` to select multiple items
- `Shift+Tab` to deselect
- Enter to confirm all selections

**Exact match:**
- Prefix with `'` for exact match: `'exact`
- Prefix with `^` to match start: `^start`
- Suffix with `$` to match end: `end$`
- Use `!` to negate: `!exclude`

---

## Quick Reference

```
Ctrl + R     Search command history
Ctrl + T     Search files, insert path
Alt + C      Search directories, cd into selection

In fzf:
  Tab        Multi-select
  Ctrl+J/K   Move down/up (vim-style)
  Enter      Confirm selection
  Ctrl+C     Cancel

Search syntax:
  'word      Exact match
  ^word      Starts with
  word$      Ends with
  !word      Does not contain
```

---

## Wrap Up

Say: "The key shortcuts to remember:"
- **Ctrl+R** for history (use this constantly)
- **Ctrl+T** for finding files
- **Tab** for multi-select

Ask: "Want to practice any of these?"
