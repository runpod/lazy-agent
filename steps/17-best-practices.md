# Step 17: Best Practices — Effective Claude Conversations

## The 39% Problem

Research consistently shows that **mixing topics destroys accuracy**.

> "An average 39% performance drop when instructions are delivered across multiple turns." — Multi-turn conversation research

> "As tokens in the context window increase, the model's ability to accurately recall information decreases." — Chroma Research on context rot

## The Golden Rule

**One Task, One Chat**

| Scenario | Action |
|----------|--------|
| New feature | New chat |
| Bug fix (unrelated to current work) | `/clear` then new task |
| Research vs implementation | Separate chats |
| 20+ turns elapsed | Consider starting fresh |

## Use `/clear` Liberally

```
/clear
```

This resets the context window. Anthropic recommends:

> "Use /clear frequently between tasks to reset the context window."

**When to `/clear`:**
- Switching to unrelated task
- Context feels "polluted" with old discussions
- Claude starts referencing old, irrelevant code
- You're starting a new logical unit of work

## Context Hygiene

### Bad Pattern

```
You: Help me fix the login bug
Claude: [fixes bug]
You: Now add dark mode
Claude: [adds dark mode, but references login code unnecessarily]
You: Actually let's also refactor the database
Claude: [confused, mixes concerns]
```

### Good Pattern

```
Chat 1: Fix login bug → /clear or new chat
Chat 2: Add dark mode → /clear or new chat
Chat 3: Refactor database
```

## Be Specific

Research shows specific prompts dramatically improve output quality.

### Less Effective
```
> fix the bug
> add validation
> make it faster
```

### More Effective
```
> fix the null pointer exception in src/auth.ts line 42

> add email validation to the signup form that checks for
  valid format and shows an error message below the input

> optimize the getUserById query - it's taking 2s,
  target is <100ms
```

## Provide Context Upfront

Don't make Claude guess. Front-load relevant information.

### Less Effective
```
> add a new endpoint
[Claude asks questions]
> it should be for users
[Claude asks more]
> REST, return JSON
```

### More Effective
```
> Add a REST endpoint GET /api/users/:id that:
  - Returns user JSON (id, email, name, createdAt)
  - Returns 404 if not found
  - Uses the existing UserService
  - Add to src/routes/users.ts
```

## Iterate in Small Steps

Don't try to do everything at once.

### Overwhelming
```
> Create a complete authentication system with login,
  signup, password reset, email verification, OAuth,
  2FA, session management, and admin panel
```

### Iterative
```
1. > create a basic user model with email/password
2. > add login endpoint with JWT
3. > add signup endpoint with validation
4. > add password reset flow
5. > add email verification
[each step verified before next]
```

## Know When to Start Fresh

Signs your conversation needs a reset:

| Signal | Action |
|--------|--------|
| Claude references old, irrelevant code | `/clear` |
| Responses getting slower/longer | New chat |
| Claude seems confused about current state | `/clear` |
| You've pivoted to unrelated work | New chat |
| 20+ turns on complex topic | New chat |
| Claude keeps making same mistake | New chat with refined instructions |

## Effective Feedback

When Claude gets something wrong, be specific about what and why.

### Less Effective
```
> that's wrong, try again
> no, do it differently
```

### More Effective
```
> The query is correct but it's missing the WHERE clause
  for soft-deleted records. Add: WHERE deleted_at IS NULL

> Good structure, but use async/await instead of .then()
  to match our codebase style
```

## Use Claude's Memory Wisely

Claude has two types of memory:

| Type | Scope | Use For |
|------|-------|---------|
| CLAUDE.md | Persistent | Rules, patterns, project context |
| Conversation | Temporary | Current task details |

Don't repeat CLAUDE.md content in every message — Claude already has it.

## The "Rubber Duck" Anti-Pattern

Avoid using Claude as a rubber duck for stream-of-consciousness:

### Anti-pattern
```
> hmm I wonder if the bug is here
> wait no maybe it's the database
> let me think... could be caching
> actually I'm not sure
```

### Better
```
> I have a bug where user data is stale. I've checked:
  - Database has correct values
  - API returns correct response
  Suspecting the React cache. Can you check src/hooks/useUser.ts?
```

## Quick Reference

| Practice | Do | Don't |
|----------|----|----- |
| Task scope | One task per chat | Mix unrelated work |
| Context | `/clear` between tasks | Let context rot |
| Prompts | Specific, detailed | Vague, ambiguous |
| Iteration | Small verified steps | Everything at once |
| Feedback | Specific corrections | "Try again" |
| Memory | Trust CLAUDE.md | Repeat instructions |

## MCP Efficiency

From the Reddit post — know when NOT to use MCP:

| Use Case | MCP Overhead | Better Alternative |
|----------|--------------|-------------------|
| One-off HTTP call | Overkill | `curl` via Bash |
| Single Trello update | High | `trello-cli` |
| Quick file check | Wasteful | Direct `cat`/`ls` |

**Rule:** If you're calling an MCP tool once per session, a CLI is more efficient. MCP shines for repeated tool use within conversations.

## Verification

After reading this, try:

1. Start a new chat for your next task
2. Use `/clear` after completing it
3. Notice if responses feel more focused

## Summary

1. **One task, one chat** — Avoid the 39% degradation
2. **`/clear` liberally** — Reset between tasks
3. **Be specific** — Front-load context
4. **Iterate small** — Verify each step
5. **Give specific feedback** — Not "try again"
6. **Trust CLAUDE.md** — Don't repeat yourself

These practices compound. Small improvements in conversation hygiene lead to dramatically better outputs over time.
