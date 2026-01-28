# Lazy Agent Enhancements

## What This Is

Ongoing enhancements to lazy-agent - a CLI onboarding wizard for developer terminal setup. Each milestone adds new capabilities.

## Core Value

Streamline developer onboarding with essential productivity tools and clear guidance.

## Milestones

### v1.0 - zsh-z Support (SHIPPED 2026-01-15)
Added zsh-z directory jumping plugin documentation.

### v1.1 - Developer Tools (SHIPPED 2026-01-15)
Added claude-yolo alias, claude-notify, Get Shit Done to onboarding.

### v1.2 - Fork Command (CURRENT)
Add `/fork` command for spawning multiple parallel Claude instances using mproc.

## Requirements

### v1.2 Active

- [ ] FORK-01: Add mproc to setup.sh wizard
- [ ] FORK-02: Add mproc to doctor.sh checks
- [ ] FORK-03: Create /fork skill for spawning parallel Claude instances
- [ ] FORK-04: Support syntax: `/fork N [prompt] [optional paths]`
- [ ] FORK-05: Clone specified folders to temp workspaces for each instance

### Out of Scope

- GUI for managing forked instances
- Automatic merging of results from parallel instances

## Context

**mproc:**
- Terminal multiplexer for running multiple processes
- GitHub: https://github.com/pterm/mproc (or similar)
- Allows viewing multiple Claude sessions side-by-side

**Use Case:**
- User wants to explore multiple approaches in parallel
- `/fork 3 "implement auth" ./src` spawns 3 Claude instances
- Each works on a cloned copy of ./src
- User can compare results and pick best approach

## Constraints

- Must work with existing lazy-agent patterns
- mproc must be optional (graceful fallback if not installed)
- Cloned workspaces should be in temp directories

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use mproc for parallel display | Native terminal multiplexing | Pending |
| Clone to temp directories | Isolate parallel experiments | Pending |
| Make /fork a skill | Consistent with other Claude commands | Pending |

---
*Last updated: 2026-01-15 - v1.2 Fork Command milestone started*
