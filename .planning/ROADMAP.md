# Roadmap: Lazy Agent Enhancements

## Overview

Progressive enhancement of lazy-agent onboarding tool with developer productivity tools: claude-yolo for YOLO mode management, claude-notify for desktop notifications, and Get Shit Done for structured project workflows.

## Domain Expertise

None

## Milestones

- ✅ **v1.0 zsh-z Support** - Phase 1 (shipped 2026-01-15)
- ✅ **v1.1 Developer Tools** - Phases 2-5 (shipped 2026-01-15)
- 🚧 **v1.2 Fork Command** - Phases 6-7 (in progress)

## Phases

<details>
<summary>✅ v1.0 zsh-z Support (Phase 1) - SHIPPED 2026-01-15</summary>

### Phase 1: Add zsh-z to setup-shell
**Goal**: Add zsh-z plugin section to setup-shell skill following existing patterns
**Depends on**: Nothing (first phase)
**Research**: Unlikely (internal documentation, existing patterns)
**Plans**: 1 plan

Plans:
- [x] 01-01: Add zsh-z section to setup-shell SKILL.md

</details>

<details>
<summary>✅ v1.1 Developer Tools (Phases 2-5) - SHIPPED 2026-01-15</summary>

**Milestone Goal:** Add essential developer productivity tools to onboarding with installation guides and skills

#### Phase 2: Add claude-yolo
**Goal**: Add claude-yolo wrapper for YOLO mode management with installation and usage docs
**Depends on**: Phase 1
**Research**: Unlikely (GitHub docs already reviewed)
**Plans**: 1 plan

Plans:
- [x] 02-01: Create setup-claude-yolo skill and update config

#### Phase 3: Add claude-notify
**Goal**: Add claude-notify desktop notifications with installation guide and skill
**Depends on**: Phase 2
**Research**: Unlikely (GitHub docs already reviewed)
**Plans**: 1 plan

Plans:
- [x] 03-01: Create setup-claude-notify skill and update onboard

#### Phase 4: Add Get Shit Done
**Goal**: Add GSD meta-prompting system with installation guide and skill
**Depends on**: Phase 3
**Research**: Unlikely (GitHub docs already reviewed)
**Plans**: 1 plan

Plans:
- [x] 04-01: Create setup-gsd skill and update onboard

#### Phase 5: Onboarding updates
**Goal**: Update onboarding wizard and CLAUDE.md to guide users through new tools
**Depends on**: Phase 4
**Research**: Unlikely (internal patterns)
**Plans**: 1 plan

Plans:
- [x] 05-01: Update CLAUDE.md, config.example.json, and onboard skill

</details>

### 🚧 v1.2 Fork Command (In Progress)

**Milestone Goal:** Add `/fork` command for spawning multiple parallel Claude instances using mprocs

#### Phase 6: Add mprocs to setup
**Goal**: Add mprocs to setup.sh wizard and doctor.sh verification
**Depends on**: Phase 5
**Requirements**: FORK-01, FORK-02
**Research**: Unlikely (brew install mprocs)
**Plans**: 1 plan

Plans:
- [x] 06-01: Add mprocs to setup.sh, doctor.sh, config.example.json

#### Phase 7: Create /fork skill
**Goal**: Create skill that spawns N parallel Claude instances with cloned workspaces
**Depends on**: Phase 6
**Requirements**: FORK-03, FORK-04, FORK-05
**Research**: Unlikely (shell scripting, mprocs docs)
**Plans**: 1 plan

Plans:
- [ ] 07-01: Create fork skill with workspace cloning and mprocs integration

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Add zsh-z to setup-shell | v1.0 | 1/1 | Complete | 2026-01-15 |
| 2. Add claude-yolo | v1.1 | 1/1 | Complete | 2026-01-15 |
| 3. Add claude-notify | v1.1 | 1/1 | Complete | 2026-01-15 |
| 4. Add Get Shit Done | v1.1 | 1/1 | Complete | 2026-01-15 |
| 5. Onboarding updates | v1.1 | 1/1 | Complete | 2026-01-15 |
| 6. Add mprocs to setup | v1.2 | 1/1 | Complete | 2026-01-16 |
| 7. Create /fork skill | v1.2 | 0/1 | Not started | - |
