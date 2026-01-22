# Agent Skills Specification Reference

Complete technical specification for SKILL.md files.

## Directory Structure

```
skill-name/
├── SKILL.md          # Required
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
└── assets/           # Optional: templates, resources
```

## SKILL.md Format

```yaml
---
name: skill-name
description: Description of skill and when to use it.
license: Apache-2.0                    # Optional
compatibility: Requires Python 3.10+   # Optional
metadata:                              # Optional
  author: your-name
  version: "1.0"
allowed-tools: Bash(git:*) Read        # Optional, experimental
---

# Skill Title

Markdown instructions here...
```

## Frontmatter Fields

### name (Required)

- **Max length**: 64 characters
- **Allowed characters**: lowercase letters, numbers, hyphens
- **Cannot**: start/end with hyphen, have consecutive hyphens
- **Must**: match parent directory name

**Valid:**
```yaml
name: pdf-processing
name: data-analysis
name: code-review-v2
```

**Invalid:**
```yaml
name: PDF-Processing   # uppercase
name: -pdf             # starts with hyphen
name: pdf--process     # consecutive hyphens
name: my_skill         # underscore not allowed
```

### description (Required)

- **Max length**: 1024 characters
- **Purpose**: Tell agents WHEN to use this skill
- **Include**: keywords, trigger phrases, use cases

**Good:**
```yaml
description: Extract text and tables from PDF files, fill PDF forms, and merge multiple PDFs. Use when working with PDF documents, forms, or document extraction tasks.
```

**Bad:**
```yaml
description: Helps with PDFs.  # Too vague
```

### license (Optional)

License for the skill. Can be:
- SPDX identifier: `Apache-2.0`, `MIT`, `GPL-3.0`
- Reference: `See LICENSE file`

### compatibility (Optional)

- **Max length**: 500 characters
- **Purpose**: Environment requirements

```yaml
compatibility: Requires Python 3.10+, pdfplumber package, and network access for API calls.
```

### metadata (Optional)

Arbitrary key-value pairs (string → string).

```yaml
metadata:
  author: anthropic
  version: "2.1"
  last-updated: "2025-01-15"
  category: document-processing
```

### allowed-tools (Optional, Experimental)

Pre-approved tool patterns for the skill.

```yaml
allowed-tools: Bash(git:*) Bash(npm:*) Read Write
```

## Body Content

The Markdown body has no required structure. Use whatever format best conveys the instructions.

**Recommended sections:**

```markdown
# Skill Name

## Overview
Brief description of what this skill does.

## When to Use
- Trigger phrase 1
- Trigger phrase 2

## Steps

### Step 1: Name
Instructions...

### Step 2: Name
More instructions...

## Verification
How to confirm success.

## Troubleshooting
Common problems and solutions.

## Examples
Input/output examples.
```

## Progressive Disclosure

Structure content for efficient context usage:

1. **Metadata (~100 tokens)**: `name` + `description` loaded at startup
2. **Instructions (<5000 tokens recommended)**: Full SKILL.md loaded when activated
3. **Resources (as needed)**: Files in subdirectories loaded on-demand

**Best practices:**
- Keep main SKILL.md under 500 lines
- Move detailed reference material to `references/` directory
- Put templates in `templates/` directory
- Keep individual reference files focused

## File References

Use relative paths from skill root:

```markdown
See [the reference guide](references/REFERENCE.md) for details.

Use the template:
templates/starter.md
```

## Validation

Validate with the skills-ref tool:

```bash
npx skills-ref validate ./my-skill
```

Checks:
- Frontmatter validity
- Name format compliance
- Description presence
- Directory structure
