# Step 17: /fork - Parallel Claude Instances

**Time**: ~1 minute
**Type**: QUICK
**Requires**: mprocs, tmux

## What is /fork?

The `/fork` skill lets you spawn multiple Claude instances in parallel, each working on an isolated copy of your code. It's like having multiple developers brainstorm simultaneously.

## Prerequisites

Make sure mprocs and tmux are installed:

```bash
brew install mprocs tmux
```

## How It Works

1. **You run**: `/fork 3 "implement auth"`
2. **Claude creates**: 3 git worktrees (isolated copies with full git history)
3. **Claude launches**: mprocs inside a tmux session
4. **You attach**: `tmux attach -t fork-XXXX`
5. **You explore**: Tab between instances, compare approaches
6. **You cleanup**: Run the generated cleanup script

## Adding /fork to Your Projects

The skill is already in this repo at `.claude/skills/fork/SKILL.md`.

To add it to another project:

```bash
mkdir -p .claude/skills/fork
curl -o .claude/skills/fork/SKILL.md \
  https://raw.githubusercontent.com/justinwlin/lazy-agent/main/.claude/skills/fork/SKILL.md
```

## Quick Demo

Try it now:

```
/fork 2 "say hello world"
```

Then attach to the session:

```bash
tmux attach -t fork-XXXX  # use the session name shown
```

## Controls

**In mprocs:**
| Key | Action |
|-----|--------|
| `Tab` | Switch between instances |
| `1-6` | Jump to specific instance |
| `q` | Quit all instances |

**In tmux:**
| Key | Action |
|-----|--------|
| `Ctrl+b d` | Detach (keep running) |

## Use Cases

- **Explore alternatives**: Try different architectures simultaneously
- **A/B testing**: Compare implementation approaches
- **Learning**: See multiple valid solutions to understand tradeoffs
- **Speed**: Let multiple Claudes race to a solution

## Cleanup

Each fork session generates a cleanup script:

```bash
/tmp/fork-XXXX/cleanup-fork.sh
```

Or clean up all sessions:

```bash
tmux ls | grep fork | cut -d: -f1 | xargs -I{} tmux kill-session -t {}
git worktree list | grep /tmp/fork | awk '{print $1}' | xargs -I{} git worktree remove {} --force
rm -rf /tmp/fork-*
```

## Next Steps

You now have parallel Claude superpowers! Use `/fork` whenever you want to explore multiple approaches without committing to one direction.
