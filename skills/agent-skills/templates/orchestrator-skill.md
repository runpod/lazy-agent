---
name: SKILL_NAME
description: Orchestrates WORKFLOW by coordinating multiple sub-skills. Use when COMPREHENSIVE_TASK.
---

# SKILL_TITLE

Coordinates multiple skills to accomplish GOAL.

## Available Sub-Skills

These skills are invoked during the workflow:

| Skill | When invoked |
|-------|--------------|
| `/sub-skill-1` | WHEN_USED |
| `/sub-skill-2` | WHEN_USED |
| `/sub-skill-3` | WHEN_USED |

## Configuration

Check configuration before starting:

```bash
cat config.json  # or other config file
```

Use configuration to:
- Skip completed steps
- Customize behavior
- Set user preferences

---

## Workflow

### Phase 1: Discovery

Check current state:

```bash
# Discovery commands
```

Based on results, customize the journey.

### Phase 2: Core Setup

Walk through steps in order:

#### Step 1: NAME (if not complete)

If CONDITION:
- **Use the `/sub-skill-1` skill**

Otherwise:
- Skip (already complete)

#### Step 2: NAME (if not complete)

If CONDITION:
```bash
# Direct commands
```

Then **use the `/sub-skill-2` skill** for teaching.

#### Step 3: NAME (if not complete)

**Use the `/sub-skill-3` skill** for interactive setup.

### Phase 3: Optional Steps

Based on configuration:

#### Optional A (`config.option_a`)

If enabled, **use the `/optional-skill-a` skill**.

#### Optional B (`config.option_b`)

If enabled:
```bash
# Direct setup commands
```

### Phase 4: Wrap Up

1. Run verification:
```bash
# Verification script
```

2. Summarize what was installed/configured

3. Show key commands

4. Offer next steps:

Say: "Now that WORKFLOW is complete, would you like to NEXT_LOGICAL_STEP?"

If yes, **use the `/next-skill` skill**.

---

## Orchestration Principles

- **Don't repeat sub-skill instructions** - invoke the skill instead
- **Skip completed steps** - check state first
- **Adapt to configuration** - respect user preferences
- **Provide progress** - tell user where they are in the workflow
- **Offer choices** - let user skip optional parts

---

## Recovery

If workflow is interrupted:

1. Check what's already complete
2. Resume from last incomplete step
3. Don't redo successful steps

```bash
# State check commands
```
