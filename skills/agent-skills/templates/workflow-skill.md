---
name: SKILL_NAME
description: Automates WORKFLOW. Use when TRIGGERS. Handles STEPS_INVOLVED.
---

# Workflow: WORKFLOW_NAME

Automated workflow for TASK.

## Prerequisites

- [ ] Prerequisite 1
- [ ] Prerequisite 2
- [ ] Prerequisite 3

## Pre-flight Checks

Before running, verify:

```bash
# Check 1
COMMAND_1

# Check 2
COMMAND_2
```

If any check fails, see [Prerequisites](#prerequisites).

---

## Workflow Steps

### 1. PHASE_ONE_NAME

Purpose: WHY_THIS_PHASE

```bash
# Commands for phase 1
```

Expected output: DESCRIPTION

### 2. PHASE_TWO_NAME

Purpose: WHY_THIS_PHASE

```bash
# Commands for phase 2
```

Expected output: DESCRIPTION

### 3. PHASE_THREE_NAME

Purpose: WHY_THIS_PHASE

```bash
# Commands for phase 3
```

Expected output: DESCRIPTION

---

## Verification

Confirm success:

```bash
# Verification command
```

Expected: WHAT_SUCCESS_LOOKS_LIKE

---

## Rollback Plan

If something goes wrong:

### Partial Failure (after step 1)

```bash
# Rollback commands
```

### Full Failure (after step 2+)

```bash
# More comprehensive rollback
```

---

## Post-Workflow

After successful completion:

1. ACTION_ITEM_1
2. ACTION_ITEM_2
3. ACTION_ITEM_3

---

## Troubleshooting

### Issue: STEP_X_FAILS

**Cause:** Why this happens

**Fix:**
```bash
# Fix commands
```

### Issue: VERIFICATION_FAILS

**Cause:** Why this happens

**Fix:**
```bash
# Fix commands
```
