# Setup Claude Code Project

Guide users through setting up Claude Code best practices for any repository.

## When to Use

- After cloning a new project
- When starting a new codebase
- When someone asks "how do I set up Claude Code for this project?"
- At the end of onboarding, prompt: "Want to set up Claude Code best practices for your projects?"

---

## Overview

Say: "Let's set up your project to get the most out of Claude Code. We'll cover:"

1. **CLAUDE.md** - Project context and instructions
2. **Skills** - Custom slash commands for your workflows
3. **Agents** - Specialized sub-agents for complex tasks
4. **Hooks** - Automated checks and validations

Ask: "Which project should we set up? (Give me the path or cd into it)"

---

## Part 1: CLAUDE.md

Say: "CLAUDE.md is the most important file - it tells Claude about your project."

### Check if it exists:

```bash
ls CLAUDE.md 2>/dev/null && echo "CLAUDE.md exists" || echo "No CLAUDE.md found"
```

### If it doesn't exist, create one:

Say: "Let's create a CLAUDE.md. I'll analyze your project first."

```bash
# Check project type
ls package.json 2>/dev/null && echo "Node.js project"
ls go.mod 2>/dev/null && echo "Go project"
ls Cargo.toml 2>/dev/null && echo "Rust project"
ls pyproject.toml setup.py requirements.txt 2>/dev/null && echo "Python project"
ls *.sln 2>/dev/null && echo ".NET project"
```

Say: "Based on your project, here's a starter CLAUDE.md:"

```markdown
# Project Name

Brief description of what this project does.

## Architecture

- Describe the main components
- Key directories and their purposes
- Important patterns used

## Development

### Setup
```bash
# Commands to set up the project
```

### Running
```bash
# Commands to run the project
```

### Testing
```bash
# Commands to run tests
```

## Code Style

- Formatting rules (prettier, eslint, etc.)
- Naming conventions
- File organization patterns

## Important Context

- Key decisions and why they were made
- Things Claude should know about this codebase
- Common pitfalls to avoid

## Do NOT

- List things Claude should avoid doing
- Protected files or directories
- Dangerous operations for this project
```

Ask: "Want me to help fill this in based on your codebase?"

### CLAUDE.md Best Practices

Say: "Tips for a great CLAUDE.md:"

1. **Keep it updated** - Add new context as the project evolves
2. **Be specific** - "Use camelCase for variables" not "follow conventions"
3. **Include examples** - Show code patterns you want followed
4. **Document decisions** - Why did you choose X over Y?
5. **List gotchas** - What trips people up in this codebase?

---

## Part 2: Skills (Slash Commands)

Say: "Skills are custom slash commands for common workflows."

### Check existing skills:

```bash
ls -la .claude/skills/ 2>/dev/null || echo "No skills directory"
```

### Create skills directory:

```bash
mkdir -p .claude/skills
```

### Common Skills to Create

Say: "Here are skills most projects benefit from:"

#### /deploy - Deployment workflow
```bash
mkdir -p .claude/skills/deploy
```

```markdown
# Deploy Skill

Guide deployment to [staging/production].

## Steps
1. Run tests
2. Build the project
3. Deploy to target environment
4. Verify deployment

## Commands
- Staging: `npm run deploy:staging`
- Production: `npm run deploy:prod`

## Checklist
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Changelog updated
```

#### /review - Code review helper
```markdown
# Review Skill

Review code changes before committing.

## Steps
1. Run `git diff` to see changes
2. Check for common issues:
   - Console.logs left in
   - TODO comments
   - Unused imports
   - Type errors
3. Run tests
4. Suggest improvements
```

#### /debug - Debugging helper
```markdown
# Debug Skill

Help debug issues in the codebase.

## Steps
1. Ask what the issue is
2. Check relevant logs
3. Identify affected files
4. Suggest debugging steps
5. Help fix the issue
```

Ask: "What common workflows do you do repeatedly? I can create skills for them."

---

## Part 3: Agents

Say: "Agents are specialized sub-agents for complex tasks."

### Common Agents

| Agent Type | Use Case |
|------------|----------|
| `explore` | Understand unfamiliar codebases |
| `test-runner` | Run and analyze test results |
| `reviewer` | Review PRs and suggest improvements |
| `refactor` | Safely refactor code patterns |

### Creating Custom Agents

Say: "Custom agents live in `.claude/agents/`. Example structure:"

```
.claude/
├── agents/
│   ├── db-migration/
│   │   └── AGENT.md
│   └── api-designer/
│       └── AGENT.md
└── skills/
```

Ask: "Do you have complex workflows that would benefit from a specialized agent?"

---

## Part 4: Hooks

Say: "Hooks run automatically on certain events."

### Common Hooks

| Hook | When it runs | Use case |
|------|--------------|----------|
| `pre-commit` | Before git commit | Lint, format, type-check |
| `post-edit` | After Claude edits a file | Auto-format |
| `pre-push` | Before git push | Run tests |

### Example: Auto-format on edit

```bash
mkdir -p .claude/hooks
```

Create `.claude/hooks/post-edit.sh`:
```bash
#!/bin/bash
# Auto-format edited files
npx prettier --write "$1"
```

Ask: "Want to set up any hooks for your project?"

---

## Part 5: Iterative Improvement

Say: "Your CLAUDE.md and skills should evolve with your project."

### When to Update CLAUDE.md

- After making architectural decisions
- When you find yourself repeating instructions to Claude
- After encountering a bug Claude could have avoided
- When onboarding new team members

### Prompts to Remember

Say: "Use these prompts to improve your setup over time:"

- "Add this to CLAUDE.md so you remember next time"
- "Create a skill for this workflow"
- "What's missing from our CLAUDE.md?"
- "Review CLAUDE.md and suggest improvements"

---

## Quick Setup Checklist

Say: "Here's a checklist for project setup:"

```
[ ] CLAUDE.md exists with project context
[ ] .claude/skills/ directory created
[ ] At least one custom skill for common workflow
[ ] Important "Do NOT" rules documented
[ ] Build/test commands documented
[ ] Code style preferences documented
```

---

## Wrap Up

Say: "Your project is now set up for Claude Code! Remember:"

- **Update CLAUDE.md often** - It's a living document
- **Create skills for repetitive tasks** - Save time and ensure consistency
- **Document decisions** - Help Claude (and future you) understand why
- **Use /compact** - When context gets long, Claude can recover from CLAUDE.md

Ask: "Any specific workflows you want to create skills for?"
