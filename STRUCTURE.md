# Project Structure

This document defines the canonical layout for lazy-agent. Any AI agent adding content should follow this structure.

## Directory Layout

```
lazy-agent/
├── AGENTS.md              # AI agent instructions (symlinked as CLAUDE.md)
├── STRUCTURE.md           # This file - canonical structure reference
├── config.example.json    # User preferences template
│
├── steps/                 # Onboarding tutorial steps
│   ├── MANIFEST.yaml      # Step metadata and ordering (source of truth)
│   └── NN-topic.md        # Individual step files
│
├── skills/                # Agent skills (agentskills.io format)
│   ├── MANIFEST.yaml      # Skill metadata and categories (source of truth)
│   └── skill-name/
│       └── SKILL.md
│
├── reference/             # Quick reference docs (cheatsheets, etc.)
├── dotfiles/              # Configuration files to install
└── lazy-tui/              # Interactive TUI application (separate)
```

## Manifests Are the Source of Truth

**All content discovery should use manifests, not directory scanning.**

- `steps/MANIFEST.yaml` - Defines step order, metadata, and requirements
- `skills/MANIFEST.yaml` - Defines available skills and their categories

When adding new content, always update the relevant manifest.

---

## Adding a New Step

### 1. Create the step file

Create `steps/NN-topic.md` with YAML frontmatter:

```markdown
---
title: Your Step Title
time_estimate: 5 min
required: true          # or false
optional: false         # true for truly optional steps (gcalcli)
recommended: false      # true for encouraged-but-skippable steps
dependencies:           # optional - steps that must complete first
  - 01-prerequisites
---

# Step NN: Your Step Title

[Content here...]
```

### 2. Update the manifest

Add an entry to `steps/MANIFEST.yaml`:

```yaml
- id: "NN"
  file: NN-topic.md
  title: Your Step Title
  required: true
  time_estimate: "5 min"
```

### 3. Naming conventions

- File names: `NN-kebab-case-topic.md`
- Numbers should be sequential (01, 02, 03...)
- Gaps in numbering are OK (they allow inserting steps later)

---

## Adding a New Skill

### 1. Create the skill directory

Create `skills/skill-name/SKILL.md` following the [agentskills.io specification](https://agentskills.io/specification):

```markdown
---
name: skill-name
description: What this skill does and when to use it.
---

# Skill Title

[Instructions in markdown...]
```

### 2. Update the manifest

Add an entry to `skills/MANIFEST.yaml`:

```yaml
- name: skill-name
  category: setup         # setup, learning, or workflow
  description: What this skill does
```

### 3. Naming conventions

- Directory names: lowercase, hyphens only, max 64 characters
- Always include `SKILL.md` (uppercase) with YAML frontmatter
- Skills are invoked as `/skill-name`

---

## Step Metadata Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | yes | Unique identifier (usually matches file number) |
| `file` | string | yes | Filename in `steps/` directory |
| `title` | string | yes | Human-readable title |
| `required` | boolean | yes | Whether step is mandatory for setup |
| `optional` | boolean | no | If true, always ask before starting |
| `recommended` | boolean | no | If true, encouraged but skippable |
| `time_estimate` | string | no | How long the step takes |
| `dependencies` | array | no | Step IDs that must complete first |
| `note` | string | no | Additional context or warnings |

---

## Skill Metadata Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | Skill identifier (matches directory name) |
| `category` | string | yes | One of: `setup`, `learning`, `workflow` |
| `description` | string | yes | What the skill does |
| `invoked_by` | string | no | Primary skill that calls this one |
| `deprecated` | boolean | no | If true, skill should not be used |

---

## Categories

### Step Categories (implied by metadata)

- **Required steps**: `required: true` - Must complete for working setup
- **Optional steps**: `optional: true` - User chooses whether to include
- **Recommended steps**: `recommended: true` - Encouraged but skippable
- **Quick steps**: `time_estimate: "< 1 min"` - Fast to complete

### Skill Categories

- **setup**: Installation and configuration skills
- **learning**: Teaching and tutorial skills
- **workflow**: Development workflow skills

---

## Migration Notes

### From `.claude/skills/` to `skills/`

Per [agentskills.io specification](https://agentskills.io/specification), skills live at project root:

```bash
# Old location (deprecated)
.claude/skills/skill-name/SKILL.md

# New location (correct)
skills/skill-name/SKILL.md
```

### Adding Frontmatter to Existing Steps

Steps without YAML frontmatter should have it added. Example transformation:

```markdown
# Before
# Step 5: Claude Code

## What is Claude Code?
...

# After
---
title: Claude Code
time_estimate: 5 min
required: true
dependencies:
  - 01-prerequisites
---

# Step 5: Claude Code

## What is Claude Code?
...
```

---

## Best Practices

1. **Always update manifests** when adding or removing content
2. **Use descriptive names** that explain what the step/skill does
3. **Include time estimates** so users know what to expect
4. **Mark dependencies** so steps can be run in correct order
5. **Keep skills focused** - one skill does one thing well
6. **Write for any AI agent** - don't assume Claude-specific features
