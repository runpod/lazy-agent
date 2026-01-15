# Get Shit Done Setup

Install and configure Get Shit Done - a meta-prompting system that prevents context degradation in long Claude Code sessions.

**Time estimate: 2-3 minutes**

---

## What is Get Shit Done?

Say: "GSD is a context engineering system that keeps Claude Code performing at peak quality during extended sessions."

Key benefits:
- **Prevents context rot** - Fresh 200k context per execution plan
- **Structured planning** - Breaks projects into atomic, verifiable tasks
- **Session continuity** - STATE.md preserves progress across sessions
- **Atomic commits** - Each completed task = one clean git commit

GitHub: https://github.com/glittercowboy/get-shit-done

---

## Step 1: Install GSD

Say: "Install with npx (no permanent installation needed):"

```bash
npx get-shit-done-cc
```

Say: "This runs the interactive installer. Choose 'global' for system-wide or 'local' for project-only."

**Non-interactive options:**
```bash
npx get-shit-done-cc --global   # System-wide
npx get-shit-done-cc --local    # Current project only
```

Ask: "Did the installer complete? You should see GSD skills added to Claude Code."

---

## Step 2: Verify Installation

Say: "Let's check if it's installed. Start Claude Code and type:"

```
/gsd:help
```

Ask: "Do you see a list of GSD commands?"

---

## Step 3: Configure Permissions (Recommended)

Say: "GSD works best with relaxed permissions so it can orchestrate without constant approval prompts."

**Option A: YOLO Mode (Full Automation)**
```bash
claude --dangerously-skip-permissions
```

**Option B: Granular Permissions**

Add to `.claude/settings.json`:
```json
{
  "permissions": {
    "allow": [
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git status:*)",
      "Bash(git diff:*)"
    ]
  }
}
```

Ask: "Which permission model would you prefer?"

---

## Step 4: GSD Workflow Overview

Say: "Here's how GSD structures your work:"

### For New Projects:
1. `/gsd:new-project` - Capture your idea through dialogue
2. `/gsd:create-roadmap` - Generate phases and milestones
3. `/gsd:plan-phase <N>` - Create detailed task plan
4. `/gsd:execute-phase <N>` - Run with fresh context

### For Existing Projects:
1. `/gsd:map-codebase` - Analyze existing code
2. `/gsd:new-project` - Plan changes on top
3. Continue with roadmap and execution

---

## Commands Reference

| Command | Purpose |
|---------|---------|
| `/gsd:new-project` | Start planning a new project |
| `/gsd:progress` | Check where you left off |
| `/gsd:plan-phase <N>` | Plan a specific phase |
| `/gsd:execute-phase <N>` | Execute with fresh context |
| `/gsd:resume-work` | Continue from last session |
| `/gsd:help` | Full command reference |

---

## Key Concepts

### Context Rot Prevention

Say: "As Claude's context fills up, quality degrades. GSD prevents this by:"
- Running each plan execution in a fresh context
- Keeping plans small enough to stay in Claude's sweet spot
- Using XML task formatting for precise instruction parsing

### Files GSD Creates

```
.planning/
├── PROJECT.md        # Vision and goals
├── ROADMAP.md        # Phase progression
├── STATE.md          # Session memory
└── phases/           # Detailed plans per phase
```

---

## Troubleshooting

### Commands not recognized?

```bash
npx get-shit-done-cc@latest --global
```

### Permission prompts interrupting flow?

Configure permissions in `.claude/settings.json` or use YOLO mode.

---

## Wrap Up

Say: "GSD transforms Claude Code from a helpful assistant into a structured development partner."

Key takeaways:
1. Start new projects with `/gsd:new-project`
2. Use `/gsd:progress` to see where you are
3. Each plan runs in fresh context - no quality degradation

Ask: "Any questions about Get Shit Done?"
