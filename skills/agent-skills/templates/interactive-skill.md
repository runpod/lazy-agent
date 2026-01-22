---
name: SKILL_NAME
description: Guides users through PROCESS interactively. Use when USER_INTENT.
---

# SKILL_TITLE

Interactive walkthrough for PROCESS.

**Time estimate:** X-Y minutes
**Requires:** PREREQUISITES

## Before Starting

Ask: "CONFIRMATION_QUESTION?"

If they want to skip: "No problem! You can run `/SKILL_NAME` anytime later."

---

## Step 1: STEP_NAME

Say: "EXPLANATION_OF_WHAT_WE_RE_DOING"

Ask: "QUESTION_FOR_USER?"

Wait for response.

---

## Step 2: STEP_NAME

Based on their response:

If OPTION_A:
```bash
# Commands for option A
```

If OPTION_B:
```bash
# Commands for option B
```

Ask: "VERIFICATION_QUESTION?"

---

## Step 3: STEP_NAME

Say: "Now we'll NEXT_ACTION..."

```bash
# Commands
```

Ask: "Did EXPECTED_OUTCOME happen?"

If yes: Continue to next step.
If no: See Troubleshooting section.

---

## Step 4: FINAL_STEP

```bash
# Final commands
```

---

## Success!

Say: "CELEBRATION_MESSAGE"

Show useful commands or next steps:

```bash
# Common commands they'll use
```

---

## Troubleshooting

### PROBLEM_1

**Symptoms:** What they see

**Solution:**
1. Step 1
2. Step 2

### PROBLEM_2

**Symptoms:** What they see

**Solution:**
Steps to resolve...
