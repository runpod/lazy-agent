---
name: fork
description: Spawn multiple parallel Claude instances to explore different approaches simultaneously.
args: N "prompt" [paths...] - N instances (2-6), task prompt, optional paths to clone
---

# Fork - Parallel Claude Instances

Spawn multiple Claude instances to explore different approaches in parallel using mprocs.

**Syntax**: `/fork N [prompt] [paths...]`

**Time estimate**: Setup takes ~30 seconds per instance

---

## Prerequisites

Check if mprocs is installed:

```bash
which mprocs || echo "mprocs not found"
```

If not installed, say: "mprocs is required for /fork. Install it with `brew install mprocs`."

Stop and ask the user to install mprocs before proceeding.

---

## What is /fork?

Say: "/fork spawns multiple isolated Claude instances, each working on a copy of your code in parallel."

Say: "This lets you explore different approaches simultaneously - like having multiple developers brainstorm at once."

---

## Step 1: Parse Arguments

Extract from the user's /fork command:

| Argument | Required | Default | Valid Range |
|----------|----------|---------|-------------|
| `N` | Yes | - | 2-6 instances |
| `prompt` | Yes | - | Non-empty string |
| `paths` | No | Current directory | Valid paths |

**Validation:**
- N must be between 2 and 6 (screen real estate limitation)
- Prompt must not be empty
- Paths must exist if specified

Example commands:
- `/fork 3 "implement auth"` - 3 instances, current directory
- `/fork 2 "refactor this" ./src ./lib` - 2 instances on specific paths

---

## Step 2: Create Temp Workspaces

Say: "Creating isolated workspaces for each Claude instance..."

For each instance, create an isolated workspace:

```bash
# Create temp directory for this fork session
FORK_SESSION=$(mktemp -d -t fork-XXXXXX)
echo "Fork session: $FORK_SESSION"

# Get the source path(s) - default to current directory
SOURCE_PATHS="${paths:-$(pwd)}"

# For each instance 1..N:
for i in $(seq 1 $N); do
    WORKSPACE="$FORK_SESSION/instance-$i"
    mkdir -p "$WORKSPACE"

    # Clone specified paths (or current dir) into workspace
    for path in $SOURCE_PATHS; do
        if [ -d "$path" ]; then
            cp -R "$path" "$WORKSPACE/"
        elif [ -f "$path" ]; then
            cp "$path" "$WORKSPACE/"
        fi
    done

    echo "Created workspace: $WORKSPACE"
done
```

---

## Step 3: Generate mprocs.yaml

Create a mprocs configuration file dynamically:

```bash
# Generate mprocs config
cat > "$FORK_SESSION/mprocs.yaml" << EOF
procs:
EOF

# Add each instance
for i in $(seq 1 $N); do
    cat >> "$FORK_SESSION/mprocs.yaml" << EOF
  instance-$i:
    cwd: "$FORK_SESSION/instance-$i"
    shell: "claude \"$PROMPT\""
EOF
done

echo "Generated mprocs config at: $FORK_SESSION/mprocs.yaml"
```

---

## Step 4: Launch mprocs

Say: "Launching $N parallel Claude instances..."

```bash
mprocs --config "$FORK_SESSION/mprocs.yaml"
```

Say: "Use these controls in mprocs:"

| Key | Action |
|-----|--------|
| `Tab` | Switch between instances |
| `1-6` | Jump to specific instance |
| `q` | Quit all instances |
| `Ctrl+C` | Kill current instance |

Say: "Each instance works on its own isolated copy of the workspace."

---

## Step 5: After Completion

When mprocs exits, inform the user:

Say: "Fork session complete!"

```
Workspaces are at: $FORK_SESSION

instance-1/ through instance-N/ contain each Claude's work.
```

Say: "Next steps:"
1. Compare results in each instance directory
2. Cherry-pick the best approach
3. Copy successful changes back to your project
4. Clean up with: `rm -rf $FORK_SESSION`

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `/fork 3 "task"` | 3 instances on current dir |
| `/fork 2 "task" ./src` | 2 instances on ./src only |
| `/fork 4 "explore options" .` | 4 instances on current dir explicitly |

**In mprocs:**

| Key | Action |
|-----|--------|
| `Tab` | Switch between instances |
| `1-6` | Jump to instance by number |
| `q` | Quit all instances |

---

## Limitations

- **Maximum 6 instances** - screen real estate constraint
- **Large directories take time to clone** - consider specifying specific paths
- **Each instance is independent** - no automatic result merging
- **No git history** - cloned workspaces don't include .git by default

---

## Cleanup

Temp workspaces persist after the session ends. To clean up:

```bash
# Remove specific session (path shown when fork started)
rm -rf /tmp/fork-XXXXXX

# Remove all fork sessions
rm -rf /tmp/fork-*
```

---

## Troubleshooting

**"mprocs not found"**
- Install with: `brew install mprocs`

**"Permission denied"**
- Check that source paths are readable
- Ensure /tmp is writable

**"Too many instances"**
- Maximum is 6 instances
- Reduce N and try again

**"Workspace creation failed"**
- Check disk space
- Verify paths exist

---

## Example Session

```
User: /fork 3 "implement user authentication"

Claude: Checking prerequisites...
mprocs: /opt/homebrew/bin/mprocs

Creating isolated workspaces...
Fork session: /tmp/fork-abc123
Created workspace: /tmp/fork-abc123/instance-1
Created workspace: /tmp/fork-abc123/instance-2
Created workspace: /tmp/fork-abc123/instance-3

Launching 3 parallel Claude instances...

[mprocs UI appears with 3 Claude instances]

User: [after working in mprocs, presses 'q' to quit]

Claude: Fork session complete!

Workspaces are at: /tmp/fork-abc123

Compare the results:
- instance-1/ - Session 1's approach
- instance-2/ - Session 2's approach
- instance-3/ - Session 3's approach

Cherry-pick the best solution and copy it back to your project.
Clean up when done: rm -rf /tmp/fork-abc123
```

---

## Why Use /fork?

- **Explore alternatives**: Try different architectures simultaneously
- **Race conditions**: Have multiple Claudes tackle the same problem differently
- **A/B testing**: Compare implementation approaches before committing
- **Learning**: See multiple valid solutions to understand tradeoffs
