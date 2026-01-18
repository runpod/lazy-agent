---
name: code-simplifier
description: Simplifies and refines code for clarity, consistency, and maintainability while preserving all functionality.
args: [file|directory] - optional target (defaults to recently modified files)
---

# Code Simplifier

Simplify and refine code for clarity, consistency, and maintainability while preserving all functionality.

**Syntax**: `/code-simplifier [target]`

**Time estimate**: Varies based on scope (typically 1-5 minutes)

---

## What This Skill Does

The code-simplifier analyzes code and makes it:

1. **Clearer** - Better variable names, simpler logic flow
2. **More consistent** - Follows existing patterns in the codebase
3. **More maintainable** - Reduces complexity, removes dead code
4. **Functionally identical** - All behavior is preserved

---

## Step 1: Identify Target Code

**If no target specified**, find recently modified files:

```bash
# Get files modified in the last commit
git diff --name-only HEAD~1 HEAD 2>/dev/null | head -10

# Or files modified today
git diff --name-only --diff-filter=M HEAD 2>/dev/null | head -10

# Or unstaged changes
git diff --name-only 2>/dev/null | head -10
```

**If target specified**, validate it exists:

```bash
if [ -f "$TARGET" ]; then
    echo "Simplifying file: $TARGET"
elif [ -d "$TARGET" ]; then
    echo "Simplifying directory: $TARGET"
    find "$TARGET" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.py" -o -name "*.go" -o -name "*.rs" \) | head -20
else
    echo "Target not found: $TARGET"
fi
```

---

## Step 2: Analyze Code Quality

For each file, identify opportunities:

### Naming Improvements
- Variables that could be more descriptive
- Functions with unclear names
- Inconsistent naming conventions (camelCase vs snake_case)

### Logic Simplification
- Nested conditionals that can be flattened
- Complex boolean expressions
- Redundant null checks
- Early returns to reduce nesting

### Code Smell Removal
- Dead code (unreachable, unused)
- Duplicate logic that could be extracted
- Magic numbers/strings without constants
- Overly long functions (>50 lines)

### Consistency Checks
- Match existing patterns in the codebase
- Consistent error handling style
- Consistent import organization

---

## Step 3: Apply Simplifications

**IMPORTANT**: Make changes incrementally and explain each one.

For each simplification:

1. **Show the before code** (with line numbers)
2. **Explain what you're changing and why**
3. **Show the after code**
4. **Verify functionality is preserved**

### Example Simplifications

**Flatten nested conditionals:**

```typescript
// Before
if (user) {
    if (user.isActive) {
        if (user.hasPermission) {
            doSomething();
        }
    }
}

// After
if (!user || !user.isActive || !user.hasPermission) {
    return;
}
doSomething();
```

**Simplify boolean expressions:**

```typescript
// Before
if (isValid === true && hasAccess === false) {

// After
if (isValid && !hasAccess) {
```

**Extract magic numbers:**

```typescript
// Before
if (retryCount > 3) {
    setTimeout(callback, 5000);
}

// After
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

if (retryCount > MAX_RETRIES) {
    setTimeout(callback, RETRY_DELAY_MS);
}
```

**Use early returns:**

```typescript
// Before
function processUser(user) {
    let result = null;
    if (user) {
        if (user.isValid) {
            result = transform(user);
        }
    }
    return result;
}

// After
function processUser(user) {
    if (!user?.isValid) {
        return null;
    }
    return transform(user);
}
```

---

## Step 4: Verify Changes

After simplifications, verify:

```bash
# Run existing tests
npm test 2>/dev/null || yarn test 2>/dev/null || pytest 2>/dev/null || go test ./... 2>/dev/null

# Type check if applicable
npx tsc --noEmit 2>/dev/null || true

# Lint check
npx eslint . --fix 2>/dev/null || true
```

---

## Step 5: Summary

After completing simplifications, provide a summary:

```
╔═══════════════════════════════════════════════════════════╗
║  Code Simplification Complete                              ║
╠═══════════════════════════════════════════════════════════╣
║                                                            ║
║  Files modified: X                                         ║
║                                                            ║
║  Improvements made:                                        ║
║    • Flattened N nested conditionals                       ║
║    • Renamed M variables for clarity                       ║
║    • Extracted K magic numbers to constants                ║
║    • Removed L lines of dead code                          ║
║    • Simplified P boolean expressions                      ║
║                                                            ║
║  Tests: ✓ All passing                                      ║
║                                                            ║
╚═══════════════════════════════════════════════════════════╝
```

---

## What This Skill Does NOT Do

- **Add new features** - Only simplifies existing code
- **Change behavior** - All functionality is preserved
- **Add comments** - Unless removing complexity warrants explanation
- **Refactor architecture** - Scope is within-file simplification
- **Add tests** - Focus is on existing code clarity

---

## Common Simplification Patterns

| Pattern | Before | After |
|---------|--------|-------|
| Null check | `if (x !== null && x !== undefined)` | `if (x != null)` or `if (x)` |
| Boolean comparison | `if (x === true)` | `if (x)` |
| Empty check | `if (arr.length > 0)` | `if (arr.length)` |
| Ternary simplification | `x ? true : false` | `Boolean(x)` or `!!x` |
| Optional chaining | `a && a.b && a.b.c` | `a?.b?.c` |
| Nullish coalescing | `x !== null ? x : default` | `x ?? default` |
| Array methods | `for` loops with push | `.map()`, `.filter()`, `.reduce()` |
| Template literals | String concatenation | Template strings |
| Object shorthand | `{ name: name }` | `{ name }` |
| Destructuring | `const x = obj.x; const y = obj.y` | `const { x, y } = obj` |

---

## Language-Specific Tips

### TypeScript/JavaScript
- Prefer `const` over `let` when not reassigned
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Prefer `===` over `==`
- Use template literals for string interpolation

### Python
- Use list comprehensions where readable
- Prefer `f-strings` over `.format()` or `%`
- Use `pathlib` over `os.path`
- Use walrus operator (`:=`) for assignment in conditions

### Go
- Prefer early returns
- Use named return values for clarity
- Keep functions short (<30 lines ideal)
- Use `errors.Is()` and `errors.As()`

### Rust
- Use `?` operator for error propagation
- Prefer iterators over manual loops
- Use pattern matching over if-else chains
- Leverage the type system for correctness

---

## Examples

**Simple invocation** (defaults to recent changes):
```
/code-simplifier
```

**Target a specific file**:
```
/code-simplifier src/utils/helpers.ts
```

**Target a directory**:
```
/code-simplifier src/components/
```

---

## Adding to Your Project

```bash
mkdir -p .claude/skills/code-simplifier
curl -o .claude/skills/code-simplifier/SKILL.md \
  https://raw.githubusercontent.com/justinwlin/lazy-agent/main/.claude/skills/code-simplifier/SKILL.md
```
