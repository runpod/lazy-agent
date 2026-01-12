# Step 7: Gastown - Multi-Agent Workspaces

## What is Gastown?

Gastown (`gt`) is a tool for managing multi-agent AI workspaces called "rigs". It coordinates:

- **Agent spawning** across distributed teams
- **Work distribution** and handoffs
- **Merge queues** for coordinating changes
- **Collaborative workflows** with multiple Claude instances

Think of it as a project manager for AI agents working together on a codebase.

GitHub: https://github.com/steveyegge/gastown

## Installation

### Option 1: Homebrew (Recommended for macOS)

```bash
brew tap steveyegge/gastown
brew install gt
```

### Option 2: Go Install

If you have Go installed:

```bash
go install github.com/steveyegge/gastown/cmd/gt@latest
```

Make sure `~/go/bin` is in your PATH:

```bash
echo 'export PATH="$HOME/go/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Option 3: Download Binary

```bash
# Check releases at https://github.com/steveyegge/gastown/releases
# Download the appropriate binary for your system
```

## Verify Installation

```bash
gt --version
gt --help
```

## Core Concepts

### Rigs

A rig is a workspace with multiple AI agents. Think of it like a team of developers.

### Gates

Gates are synchronization points where agents coordinate their work.

### Hooks

Hooks are pieces of work that agents pick up and work on.

### Merge Queue

The merge queue (`gt mq`) manages how changes get integrated.

## Basic Commands

| Command | Description |
|---------|-------------|
| `gt hook` | Show or attach work on your hook |
| `gt done` | Signal work is ready for merge queue |
| `gt handoff` | Hand off to a fresh session |
| `gt park` | Park work for async resumption |
| `gt mq` | Merge queue operations |
| `gt convoy` | Track batches of work across rigs |

## Getting Started with a Rig

```bash
# Initialize a new rig in your project
cd your-project
gt init

# See what's on your hook
gt hook

# When you're done with work
gt done
```

## Workflow Example

```bash
# 1. Pick up work
gt hook attach ISSUE-123

# 2. Work on it with Claude Code
claude
# ... do the work ...

# 3. Signal completion
gt done

# 4. Or hand off to another session
gt handoff "Finished the API, need frontend work"
```

## Configuration

Gastown configuration lives in your project's `.gt/` directory or in `~/.config/gt/`.

## Integration with Claude Code

Gastown works seamlessly with Claude Code:

1. Use `gt hook` to see your assigned work
2. Run `claude` to work on it
3. Use `gt done` when finished
4. Claude Code can read Gastown context from project files

## Verification Checklist

- [ ] `gt --version` shows version
- [ ] `gt --help` shows available commands
- [ ] Understand rigs, gates, and hooks concepts

## Learn More

- GitHub: https://github.com/steveyegge/gastown
- Documentation in the repo's README and docs/

## Next Steps

You now have:
- A beautiful terminal (Ghostty)
- A powerful shell (Zsh + Powerlevel10k)
- Session management (tmux)
- AI coding assistant (Claude Code)
- Multi-agent coordination (Gastown)

You're ready to collaborate with AI agents at scale!
