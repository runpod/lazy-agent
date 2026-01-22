# Step 16: Skills — Reusable Expertise

## Commands & Skills: Now Unified

As of late 2025, **commands and skills have merged**. They share the same schema, simplifying the mental model.

> "Merged slash commands and skills, simplifying the mental model with no change in behavior." — Claude Code Changelog

## The Two Modes

| Mode | How Triggered | Example |
|------|---------------|---------|
| Slash command | You type `/skill-name` | `/review`, `/commit` |
| Auto-skill | Claude triggers based on context | Detecting a PR review situation |

Same file format, different activation.

## Directory Structure

```
~/.claude/
├── skills/
│   ├── review/
│   │   └── SKILL.md
│   ├── commit/
│   │   └── SKILL.md
│   └── debug/
│       └── SKILL.md
└── CLAUDE.md
```

Project-level skills go in `.claude/skills/` in your repo.

## SKILL.md Format

```markdown
---
name: review
description: Review code for bugs, security issues, and best practices
---

# Code Review Skill

When reviewing code, follow this checklist:

## Security
- [ ] No hardcoded secrets or API keys
- [ ] Input validation on user data
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding)

## Performance
- [ ] No N+1 queries
- [ ] Appropriate indexing considered
- [ ] No unnecessary re-renders (React)

## Error Handling
- [ ] Errors are caught and logged
- [ ] User-friendly error messages
- [ ] Graceful degradation

## Code Quality
- [ ] Functions are small and focused
- [ ] Names are descriptive
- [ ] No commented-out code
- [ ] Tests cover critical paths
```

## Progressive Disclosure

Skills use **progressive disclosure** for token efficiency:

| Stage | What's Loaded | Token Cost |
|-------|---------------|------------|
| Startup | Only name + description | ~20 tokens |
| Triggered | Full SKILL.md content | Varies |
| As needed | Additional resources | Varies |

This is why skills are better than dumping everything in CLAUDE.md.

## When to Use Skills vs CLAUDE.md

| Content | Where | Why |
|---------|-------|-----|
| Always needed (identity, security) | CLAUDE.md | Loaded every conversation |
| Used <20% of conversations | Skill | Loaded on demand |
| Project-specific patterns | Project CLAUDE.md | Scoped to project |
| Reusable across projects | Global skill | Portable |

**Rule of thumb:** If instructions apply to less than 20% of your conversations, make it a skill.

## Example Skills

### `/commit` — Smart Commits

```markdown
---
name: commit
description: Create semantic git commits with proper messages
---

# Git Commit Skill

When creating commits:

1. **Analyze changes** with `git diff --staged`
2. **Determine type:**
   - `feat:` — New feature
   - `fix:` — Bug fix
   - `refactor:` — Code restructure
   - `docs:` — Documentation
   - `test:` — Tests
   - `chore:` — Maintenance

3. **Write message:**
   - First line: `type(scope): description` (50 chars max)
   - Body: Explain WHY, not WHAT
   - Reference issues: `Fixes #123`

4. **Verify:**
   - No secrets in diff
   - No console.logs
   - Tests pass
```

### `/debug` — Systematic Debugging

```markdown
---
name: debug
description: Systematic debugging approach for any issue
---

# Debug Skill

When debugging:

## 1. Reproduce
- Get exact steps to reproduce
- Identify: always happens? intermittent?

## 2. Isolate
- What changed recently?
- Does it happen in other environments?
- Minimal reproduction case

## 3. Hypothesize
- List 3 most likely causes
- Rank by probability

## 4. Test
- Test most likely hypothesis first
- Add logging/breakpoints
- Verify fix doesn't break other things

## 5. Document
- What was the root cause?
- How was it fixed?
- How to prevent in future?
```

### `/refactor` — Safe Refactoring

```markdown
---
name: refactor
description: Safe code refactoring with verification
---

# Refactor Skill

Before refactoring:

## Pre-flight
1. Ensure tests pass: `npm test`
2. Commit current state (safety checkpoint)
3. Identify scope of changes

## During
1. Make ONE type of change at a time
2. Use LSP for renames (not find-replace)
3. Run tests after each change
4. Keep commits atomic

## Post-flight
1. Run full test suite
2. Manual smoke test
3. Review diff before push
4. Document any breaking changes
```

### `/explain` — Code Explanation

```markdown
---
name: explain
description: Explain code at the right level of detail
---

# Explain Skill

When explaining code:

## Determine Audience
Ask: "What's your familiarity with [technology]?"

## Structure Explanation
1. **Purpose** — What does this code accomplish?
2. **How** — Walk through the logic
3. **Why** — Design decisions and tradeoffs
4. **Gotchas** — Common pitfalls

## Use Analogies
- Relate to familiar concepts
- Use diagrams when helpful

## Offer Depth
"Want me to go deeper on any part?"
```

## Creating Your Own Skills

1. **Identify patterns** — What do you ask Claude repeatedly?
2. **Create directory:** `mkdir -p ~/.claude/skills/my-skill`
3. **Write SKILL.md** with frontmatter and instructions
4. **Test:** Type `/my-skill` in Claude Code

## Skill Discovery

Claude automatically discovers skills from:
- `~/.claude/skills/*/SKILL.md` (global)
- `.claude/skills/*/SKILL.md` (project)

No registration needed — just create the file.

## Advanced: Skill with Resources

Skills can reference additional files:

```markdown
---
name: api-design
description: Design RESTful APIs following our standards
resources:
  - ./api-guidelines.md
  - ./error-codes.md
---

# API Design Skill

Follow the guidelines in the attached resources...
```

## Verification

```bash
# List available skills
ls ~/.claude/skills/

# Test a skill
claude
> /review   # Should trigger your review skill
```

## Tips

1. **Start small** — One skill for your most common task
2. **Iterate** — Refine based on what Claude gets wrong
3. **Share** — Good skills are portable across projects
4. **Version** — Keep skills in your dotfiles repo

## Next Step

Now let's cover best practices for effective Claude conversations — including why single-purpose chats matter.
