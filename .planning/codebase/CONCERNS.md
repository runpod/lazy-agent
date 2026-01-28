# Codebase Concerns

**Analysis Date:** 2026-01-15

## Tech Debt

**Missing Step Files:**
- Issue: 6 step files referenced in `AGENTS.md` don't exist
- Files referenced: `steps/02-ghostty.md`, `steps/03-zsh-and-p10k.md`, `steps/04-tmux.md`, `steps/10-gcalcli.md`, `steps/12-notion-mcp.md`, `steps/13-karabiner.md`
- Location: `AGENTS.md` lines 68-79
- Why: Steps documented before implementation, or removed without updating references
- Impact: Users following documented flow encounter missing files
- Fix approach: Create missing step files or update `AGENTS.md` to remove references

**Config Schema Incomplete:**
- Issue: `config.example.json` doesn't include all tools mentioned in skills
- Files: `config.example.json`, `setup.sh`
- Why: Skills added without updating config schema
- Impact: Users can't enable/disable some tools via config
- Fix approach: Audit all `.claude/skills/` and ensure matching config options

## Known Bugs

**Git Operations Edge Case:**
- Symptoms: `update.sh` fails on fresh repos with no previous commit
- Trigger: Run `./update.sh` immediately after cloning with single commit
- Files: `update.sh` lines 62-79
- Workaround: Ensure repo has at least 2 commits before running update
- Root cause: `git diff --name-only HEAD~1` fails when HEAD~1 doesn't exist
- Fix: Add check for commit count before using `HEAD~1`

## Security Considerations

**Curl Pipe to Bash:**
- Risk: Homebrew installation uses `curl | bash` pattern
- Files: `steps/01-prerequisites.md` line 31
- Current mitigation: Uses official Homebrew URL with HTTPS
- Recommendations: Add note to verify HTTPS and check URL before running

**API Key Documentation:**
- Risk: API key handling documented across multiple files, could confuse users
- Files: `steps/08-linear-and-mcp.md`, `reference/tools-and-links.md`, `.claude/skills/setup-linear/SKILL.md`
- Current mitigation: Keys stored in `~/.zshrc.local` (gitignored)
- Recommendations: Create single `.env.example` with all optional keys documented

## Performance Bottlenecks

**TPM Clone Always Runs:**
- Problem: `dotfiles/install.sh` always clones tmux plugin manager
- Files: `dotfiles/install.sh` lines 114-122
- Measurement: Adds ~3-5 seconds to install even if user doesn't want plugins
- Cause: No conditional check for user preference
- Improvement path: Make TPM installation conditional or prompt user

## Fragile Areas

**Dotfiles Symlink Logic:**
- Files: `dotfiles/install.sh`
- Why fragile: Symlink targets not validated before creation
- Common failures: Broken symlinks if source file moved
- Safe modification: Test symlink resolution after creation
- Test coverage: No automated tests, manual verification only

## Scaling Limits

- Not applicable (local development tool, not a service)

## Dependencies at Risk

**No Critical Dependencies at Risk**

All tools are well-maintained:
- Homebrew - Active community
- tmux - Stable, slow-changing
- Claude Code - Actively maintained by Anthropic
- Ghostty - New but actively developed

## Missing Critical Features

**No .env.example:**
- Problem: Environment variable documentation scattered
- Files: `reference/tools-and-links.md` lines 390-406 (only location)
- Current workaround: Users must search documentation
- Blocks: Clear onboarding for users needing API keys
- Implementation complexity: Low (create template file)

## Test Coverage Gaps

**No Automated Tests:**
- What's not tested: All shell scripts (`setup.sh`, `doctor.sh`, `update.sh`, `dotfiles/install.sh`)
- Risk: Regressions in setup logic go unnoticed
- Priority: Low (setup tool, not production application)
- Difficulty to test: Shell scripts harder to unit test, would need BATS or similar

**Documentation Verification:**
- What's not tested: Step file references in `AGENTS.md`
- Risk: Documentation promises files that don't exist (currently happening)
- Priority: Medium
- Difficulty to test: Simple script could verify all referenced paths exist

---

## What's Working Well

- Excellent safety documentation for Gastown (`steps/07-gastown.md`)
- Proper `set -e` error handling in all shell scripts
- Config properly gitignored to prevent secret leakage
- Comprehensive reference docs in `reference/tools-and-links.md`
- Clear personality and tone in documentation
- 12 well-structured skills in `.claude/skills/`
- Backup logic before overwriting configs in `dotfiles/install.sh`

---

*Concerns audit: 2026-01-15*
*Update as issues are fixed or new ones discovered*
