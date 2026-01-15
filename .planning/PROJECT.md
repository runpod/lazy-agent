# Add zsh-z Plugin Support

## What This Is

Enhancement to lazy-agent that adds zsh-z (directory jumping plugin) as an optional Oh My Zsh plugin. Following the existing pattern of optional tools, this adds documentation and setup guidance for zsh-z integration.

## Core Value

Make directory navigation faster for users who want it, without complicating the default setup.

## Requirements

### Validated

- ✓ Onboarding wizard guides users through terminal setup — existing
- ✓ Skills system provides interactive Claude-guided installation — existing
- ✓ setup-shell skill exists for shell configuration — existing
- ✓ Optional tools pattern established (config.json toggles) — existing

### Active

- [ ] Add zsh-z documentation to setup-shell skill
- [ ] Explain how to enable in .zshrc plugins array
- [ ] Follow existing skill documentation patterns

### Out of Scope

- Code-simplifier agent — belongs in SuperClaude config, not onboarding tool
- Automated .zshrc modification — users manually add to plugins array
- New standalone skill — extend existing setup-shell skill instead

## Context

**Existing Pattern:**
- Skills live in `.claude/skills/{name}/SKILL.md`
- setup-shell skill already exists for shell configuration
- zsh-z is a built-in Oh My Zsh plugin (no installation needed)
- Users just need to add `z` to their plugins array in .zshrc

**zsh-z Plugin:**
- Tracks most-used directories
- Jump with `z foo` to go to most frecent directory matching "foo"
- Part of Oh My Zsh, no separate installation
- Needs to be enabled in .zshrc: `plugins=(... z)`

## Constraints

- **Consistency**: Follow existing skill documentation patterns
- **Scope**: Minimal change - just documentation addition

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Extend setup-shell instead of new skill | zsh-z is shell-related, keeps skills cohesive | — Pending |
| Manual .zshrc editing | Consistent with other Oh My Zsh plugin guidance | — Pending |
| Skip code-simplifier for lazy-agent | It's an autonomous agent for SuperClaude, not onboarding | ✓ Good |

---
*Last updated: 2026-01-15 after initialization*
