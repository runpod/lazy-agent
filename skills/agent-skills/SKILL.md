---
name: agent-skills
description: Learn about Agent Skills - how AI agents use skills, create new skills, and understand skill discovery in real-time. Use when user asks about skills, wants to create a skill, or wants to understand how Claude uses skills.
---

# Agent Skills: Learn, Understand, Create

This skill teaches you about Agent Skills - the open format for extending AI agent capabilities - and helps you create your own.

## What Can I Help With?

1. **Tutorial Mode** - Learn how skills work step-by-step
2. **Real-Time Explanation** - Understand how I discover and use skills as I work
3. **Create a Skill** - Interactive walkthrough to create your own skill
4. **Explore Examples** - Look at existing skills and learn from them

Ask: "What would you like to explore?"

- "Teach me about skills" → Tutorial Mode
- "How do you use skills?" → Real-Time Explanation
- "Help me create a skill" → Creation Walkthrough
- "Show me examples" → Explore existing skills

---

## Tutorial Mode: Understanding Agent Skills

### What Are Skills?

**Skills are instructions that give AI agents specialized capabilities.**

Think of skills like recipe cards for an AI:
- They tell me **what to do** when faced with specific tasks
- They provide **step-by-step instructions** I can follow
- They include **context and knowledge** I might not otherwise have

### How Skills Work: The 3-Phase Process

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   DISCOVERY     │────▶│   ACTIVATION    │────▶│   EXECUTION     │
│                 │     │                 │     │                 │
│ I see skill     │     │ I load full     │     │ I follow the    │
│ names & brief   │     │ SKILL.md into   │     │ instructions    │
│ descriptions    │     │ context         │     │ step by step    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

#### Phase 1: Discovery (Always Running)
- At startup, I load the **name** and **description** of each available skill
- This is lightweight - just enough to know what's available
- When you say something, I check: "Does this match any skill descriptions?"

#### Phase 2: Activation (On Demand)
- When your request matches a skill's description, I load the full instructions
- Only the relevant skill's complete content enters my context
- This keeps me fast while giving me deep knowledge when needed

#### Phase 3: Execution (Following Instructions)
- I follow the skill's instructions step-by-step
- I may load additional reference files if the skill includes them
- I can run scripts if the skill bundles executable code

### Why This Matters

**Progressive disclosure** means I stay fast but can access unlimited specialized knowledge:

| Without Skills | With Skills |
|---------------|-------------|
| Limited to training data | Extended with new capabilities |
| Same context every task | Specialized context per task |
| Can't learn your workflows | Custom skills for your needs |

### The SKILL.md File

Every skill lives in a folder with a `SKILL.md` file:

```
my-skill/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: detailed docs
└── templates/        # Optional: file templates
```

The SKILL.md has two parts:

**1. Frontmatter (YAML)** - The "metadata":
```yaml
---
name: my-skill-name
description: When to use this skill and what it does.
---
```

**2. Body (Markdown)** - The instructions:
```markdown
# My Skill

## How to do X
1. First step...
2. Second step...

## Examples
...
```

Ask: "Want to see this in action? Say 'show me how you discovered this skill' and I'll explain the process I went through."

---

## Real-Time Explanation Mode

Say: "Let me explain how I'm using skills right now, as I work."

### How I Found This Skill

When you asked about skills, here's what happened:

1. **Your message arrived**: You mentioned "skills" or "create a skill" or similar
2. **I checked my skill index**: I have access to these skills (run to show):

```bash
ls -1 .claude/skills/
```

3. **Description matching**: I compared your request to each skill's description
4. **This skill matched**: The description mentions "learn about Agent Skills", "create new skills", "understand how Claude uses skills"
5. **Full content loaded**: You're now reading the complete SKILL.md instructions

### Watch Me Work

As I help you, I'll narrate my process:

- **"Checking skill index..."** - I'm scanning available skills
- **"Activating [skill-name]..."** - I'm loading a skill's full instructions
- **"Following step 3 of [skill-name]..."** - I'm executing skill instructions
- **"Loading reference file..."** - I'm reading additional skill resources

Ask: "Want me to explain my actions as I help you with something? Just say 'narrate mode on' and I'll explain each step."

---

## Create a Skill: Interactive Walkthrough

Say: "Let's create a skill together. I'll guide you through each step."

### Step 1: What Does Your Skill Do?

Ask: "What task or workflow should this skill help with?"

Good examples:
- "Deploy my app to production"
- "Review code for security issues"
- "Set up a new Next.js project"
- "Debug database connection issues"

### Step 2: Name Your Skill

Rules for skill names:
- Lowercase letters, numbers, hyphens only
- No spaces, no underscores
- Max 64 characters
- Can't start/end with hyphen

Ask: "What should we call this skill? (e.g., `deploy-production`, `security-review`, `nextjs-setup`)"

### Step 3: Write the Description

The description is **critical** - it determines when I'll use the skill.

Good description formula:
```
[What it does]. [When to use it]. [Keywords that should trigger it].
```

Example:
```yaml
description: Deploy the application to production with safety checks. Use when deploying, pushing to prod, or releasing. Handles pre-deploy validation, deployment, and post-deploy verification.
```

Ask: "Describe what your skill does and when I should use it."

### Step 4: Create the Skill

Once I have the name and description, I'll create the skill:

```bash
mkdir -p .claude/skills/[SKILL-NAME]
```

Then write the SKILL.md with your instructions.

### Step 5: Write Instructions

Ask: "Walk me through the steps. What should I do first? Then what?"

I'll format your answers into structured instructions.

### Step 6: Test the Skill

After creation:
1. Start a new Claude session (or run `/clear`)
2. Ask me to do the task your skill handles
3. I should discover and use your new skill
4. Refine based on how well it works

---

## Skill Templates

### Basic Skill Template

```yaml
---
name: skill-name
description: What this skill does. When to use it. Relevant keywords.
---

# Skill Name

Brief description of what this skill helps accomplish.

## When to Use

- Trigger phrase 1
- Trigger phrase 2

## Steps

### Step 1: [Action Name]

Explanation of what to do.

```bash
# Commands to run
```

### Step 2: [Action Name]

More instructions...

## Verification

How to confirm the skill worked:

```bash
# Verification commands
```

## Troubleshooting

### Problem: X doesn't work
Solution: Do Y

### Problem: Error message Z
Solution: Check A, B, C
```

### Interactive Skill Template (with user prompts)

```yaml
---
name: interactive-skill
description: Guides users through a multi-step process interactively.
---

# Interactive Skill

## Overview

Say: "I'll guide you through [process]. Let's start with..."

## Step 1: Gather Information

Ask: "What is [required info]?"

Wait for response before proceeding.

## Step 2: Validate

Run validation:
```bash
# validation command
```

If validation fails, say: "[error explanation]"
If validation passes, continue to Step 3.

## Step 3: Execute

Say: "Great! Now I'll [action]..."

```bash
# execution command
```

## Step 4: Confirm

Ask: "Did [expected outcome] happen?"

If yes: Proceed to wrap-up.
If no: Troubleshoot...

## Wrap Up

Say: "[Summary of what was accomplished]"
```

### Workflow Automation Template

```yaml
---
name: workflow-name
description: Automates [workflow]. Use when [triggers].
---

# Workflow: [Name]

## Prerequisites

- [ ] Requirement 1
- [ ] Requirement 2

## Workflow Steps

### 1. Pre-flight Checks

```bash
# Check prerequisites
```

### 2. Main Action

```bash
# Primary commands
```

### 3. Post-Action Verification

```bash
# Verify success
```

## Rollback Plan

If something goes wrong:

```bash
# Rollback commands
```
```

---

## Explore Existing Skills

To see what skills are available in this project:

```bash
ls -la .claude/skills/
```

To read a specific skill:

```bash
cat .claude/skills/[skill-name]/SKILL.md
```

### Learn From Examples

Look at these skills for inspiration:

| Skill | What it demonstrates |
|-------|---------------------|
| `onboard` | Orchestrating multiple skills |
| `setup-gcalcli` | Interactive OAuth walkthrough |
| `tmux-tutorial` | Teaching through practice |
| `setup-claude-project` | Multi-part setup guide |

Ask: "Want me to show you a specific skill and explain how it's structured?"

---

## Quick Reference

### Skill Discovery Path

```
~/.claude/skills/           # Global skills (all projects)
./.claude/skills/           # Project-local skills
```

### Required Files

```
skill-name/
└── SKILL.md                # Must exist, must have frontmatter
```

### Optional Structure

```
skill-name/
├── SKILL.md
├── scripts/                # Executable code
│   └── run.sh
├── references/             # Additional docs
│   └── REFERENCE.md
└── templates/              # File templates
    └── template.md
```

### Frontmatter Fields

| Field | Required | Purpose |
|-------|----------|---------|
| `name` | Yes | Identifier (lowercase, hyphens) |
| `description` | Yes | When to activate skill |
| `license` | No | License for the skill |
| `compatibility` | No | Environment requirements |
| `metadata` | No | Custom key-value pairs |

---

## Advanced: How Agents Integrate Skills

For those building agent tools, here's how skill integration works:

### 1. Scan for Skills

```bash
find ~/.claude/skills ./.claude/skills -name "SKILL.md" 2>/dev/null
```

### 2. Parse Frontmatter

Extract `name` and `description` from YAML.

### 3. Build Skill Index

Store skills as: `{ name, description, path }`

### 4. Match User Intent

When user sends a message, check descriptions for relevance.

### 5. Load Full Skill

Read entire SKILL.md into context when activated.

### 6. Execute Instructions

Agent follows Markdown instructions.

---

## Resources

- **[Agent Skills Specification](https://agentskills.io/specification)** - Full format details
- **[Anthropic Skills Repo](https://github.com/anthropics/skills)** - Official examples
- **[Claude Code Docs](https://docs.anthropic.com/claude-code)** - Claude Code documentation

---

## What's Next?

Ask: "Now that you understand skills, what would you like to do?"

- "Create a skill for [my workflow]"
- "Show me more examples"
- "How do I share skills with my team?"
- "Help me improve an existing skill"
