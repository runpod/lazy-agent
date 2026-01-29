# Skill Authoring Best Practices

Guidelines for creating effective, maintainable skills.

## Writing Good Descriptions

The description is the most important field - it determines when your skill gets activated.

### Formula

```
[What it does] + [When to use it] + [Trigger keywords]
```

### Examples

**Deploy skill:**
```yaml
description: Deploy application to production with safety checks and rollback capability. Use when pushing to production, releasing, or deploying. Handles pre-deploy tests, deployment, and post-deploy verification.
```

**Code review skill:**
```yaml
description: Review code changes for bugs, security issues, and best practices. Use when reviewing PRs, checking code quality, or before merging. Looks for common vulnerabilities, performance issues, and style violations.
```

### Anti-patterns

```yaml
# Too vague - won't match well
description: Helps with deployment.

# Too specific - won't match variations
description: Run npm run deploy:prod command.

# Missing triggers - hard to discover
description: Checks code quality.
```

## Structuring Instructions

### Use Clear Headers

```markdown
## Overview
What the skill accomplishes at a high level.

## Prerequisites
What must be in place before starting.

## Steps
Numbered, actionable steps.

## Verification
How to confirm success.

## Troubleshooting
Common issues and solutions.
```

### Be Explicit About Actions

**Good:**
```markdown
### Step 1: Check prerequisites

Run this command to verify the environment:

```bash
node --version && npm --version
```

If either fails, install Node.js first.
```

**Bad:**
```markdown
### Step 1
Make sure node is installed.
```

### Include User Prompts

For interactive skills, use clear prompts:

```markdown
Ask: "What environment should we deploy to? (staging/production)"

Wait for response before proceeding.

If staging: Continue to Step 2a.
If production: Continue to Step 2b.
```

## Progressive Disclosure

### Keep SKILL.md Focused

The main file should be <500 lines. Move details elsewhere:

```
my-skill/
├── SKILL.md              # Core instructions
├── references/
│   ├── API.md            # API documentation
│   └── TROUBLESHOOTING.md # Detailed troubleshooting
└── templates/
    └── config.yaml       # Config template
```

### Reference External Files

```markdown
For detailed API documentation, see [API Reference](references/API.md).

If you encounter errors, check [Troubleshooting](references/TROUBLESHOOTING.md).
```

## Error Handling

### Anticipate Failures

```markdown
### Step 2: Run database migration

```bash
npm run migrate
```

**If migration fails:**

1. Check database connection: `npm run db:check`
2. Verify credentials in `.env`
3. See [Database Troubleshooting](references/DATABASE.md)

**If migration succeeds:**

Continue to Step 3.
```

### Provide Rollback Instructions

```markdown
## Rollback Plan

If deployment fails:

1. Revert to previous version:
   ```bash
   git checkout HEAD~1
   npm run deploy:rollback
   ```

2. Verify rollback:
   ```bash
   curl https://app.example.com/health
   ```

3. Investigate in staging before retrying.
```

## Testing Skills

### Manual Testing

1. Create the skill
2. Start a new Claude session
3. Ask for help with the task
4. Verify the skill activates
5. Follow through the entire workflow
6. Note friction points

### Iteration Checklist

- [ ] Does the description trigger activation?
- [ ] Are steps clear and actionable?
- [ ] Do commands work on a fresh system?
- [ ] Are error cases handled?
- [ ] Is verification included?

## Common Patterns

### Setup/Installation Skills

```markdown
## Prerequisites Check

```bash
which [tool] && echo "Installed" || echo "Not installed"
```

## Installation

If not installed:

```bash
brew install [tool]
```

## Verification

```bash
[tool] --version
```

## Configuration

...
```

### Interactive Walkthrough Skills

```markdown
## Step 1: Gather Information

Ask: "What is [required input]?"

Store response for use in later steps.

## Step 2: Validate Input

```bash
# Validation command
```

If invalid, explain why and ask again.

## Step 3: Execute

Say: "Now I'll [action]..."

## Step 4: Confirm

Ask: "Did [expected result] happen?"
```

### Automation Skills

```markdown
## Automated Workflow

### 1. Pre-flight

```bash
# Verify prerequisites
```

### 2. Execute

```bash
# Main commands
```

### 3. Verify

```bash
# Check success
```

### 4. Notify

Say: "[Summary of what happened]"
```

## Versioning Skills

### When to Version

- Breaking changes to workflow
- New required prerequisites
- Changed command syntax

### Version in Metadata

```yaml
---
name: deploy
description: ...
metadata:
  version: "2.0"
  changelog: "Added rollback capability, requires kubectl 1.25+"
---
```

## Sharing Skills

### Project-Local vs Global

**Project-local** (`./.claude/skills/`):
- Specific to one project
- Version-controlled with the project
- Team members get it when they clone

**Global** (`~/.claude/skills/`):
- Available in all projects
- Personal productivity tools
- Cross-project workflows

### Team Sharing

1. Put skills in `.claude/skills/` in your repo
2. Document in README that custom skills exist
3. Consider adding skill discovery to onboarding
