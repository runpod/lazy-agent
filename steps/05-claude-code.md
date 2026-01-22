---
title: Claude Code
time_estimate: 5 min
required: true
dependencies:
  - 01-prerequisites
---

# Step 5: Claude Code

## What is Claude Code?

Claude Code is an AI coding assistant that runs in your terminal. It can:

- **Read and understand your codebase**
- **Write and edit code**
- **Run commands** (with your permission)
- **Explain code** and help you learn
- **Debug issues** by looking at errors and logs

It's like pair programming with an AI that has read your entire project.

## Installation

```bash
npm install -g @anthropic-ai/claude-code
```

Verify:

```bash
which claude
claude --version
```

## First Run

```bash
claude
```

On first run, you'll be prompted to authenticate with your Anthropic account.

## Basic Usage

Just type naturally:

```
> help me understand this codebase

> what does the main function do?

> add a new endpoint for user authentication

> fix the bug in the login form

> run the tests
```

## Key Features

### Reading Files

Claude can read any file in your project:

```
> read src/index.ts and explain what it does
```

### Editing Files

Claude can edit files (with your approval):

```
> add error handling to the fetchUser function
```

You'll see a diff and can approve or reject.

### Running Commands

Claude can run shell commands:

```
> run the tests
> install lodash
> check git status
```

You approve each command before it runs.

### Multi-file Changes

Claude can make changes across multiple files:

```
> rename the User class to Person everywhere
> add TypeScript types to all the API functions
```

## Workflows

### Exploring a New Codebase

```
> give me an overview of this project structure

> what are the main entry points?

> how does authentication work?
```

### Bug Fixing

```
> I'm getting this error: [paste error]

> look at the logs and help me debug

> the login button doesn't work, help me fix it
```

### Feature Development

```
> I need to add a dark mode toggle

> create a new API endpoint for /users/:id

> write tests for the payment module
```

## Using Claude Code with tmux

This is where it gets powerful. Set up your tmux like this:

```
┌─────────────────────────────────────┐
│           Claude Code               │
├──────────────────┬──────────────────┤
│   Code Editor    │   Test Output    │
│   (nvim/code)    │   (npm test)     │
└──────────────────┴──────────────────┘
```

Navigate between panes with `Ctrl+h/j/k/l`, ask Claude for help, see the results immediately.

## Tips

### Be Specific

```
# Less effective
> fix the bug

# More effective
> fix the null pointer exception in src/auth.ts line 42
```

### Provide Context

```
# Less effective
> add validation

# More effective
> add email validation to the signup form that checks for valid format and shows an error message below the input
```

### Iterate

Don't try to do everything at once:

```
1. > create a basic user model
2. > add validation to the user model
3. > add a controller that uses the user model
4. > write tests for the controller
```

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Submit | `Enter` |
| Multiline input | `Shift+Enter` |
| Cancel | `Ctrl+C` |
| Clear screen | `Ctrl+L` |
| Exit | `Ctrl+D` or type `exit` |

## Configuration

Claude Code looks for a `CLAUDE.md` file in your project root. This file tells Claude about your project:

```markdown
# Project: My App

## Tech Stack
- Node.js with TypeScript
- React frontend
- PostgreSQL database

## Conventions
- Use functional components
- Tests go in __tests__ folders
- Use camelCase for variables

## Important Files
- src/index.ts - Main entry point
- src/config.ts - Configuration
```

## Verification Checklist

- [ ] `claude --version` works
- [ ] Can start Claude Code with `claude`
- [ ] Can read files
- [ ] Can ask questions about code
- [ ] Understand how to approve/reject changes

## Practice

Try these in a project:

1. Ask Claude to explain the project structure
2. Ask Claude to find a specific function
3. Ask Claude to add a comment to a file
4. Ask Claude to run `ls -la`

## Next Step

Let's put it all together with a hands-on exercise.
