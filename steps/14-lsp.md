# Step 14: Language Server Protocol (LSP)

## What Languages Do You Work With?

Before we set up LSP, let's understand what you're working with. Common options:

- **TypeScript/JavaScript** - Most common for web dev
- **Python** - Data science, backend, scripting
- **Go** - Backend services, CLI tools
- **Rust** - Systems programming, performance-critical code
- **Java/Kotlin** - Enterprise, Android
- **C/C++** - Systems, embedded, games

Tell Claude which languages you use most, and we'll set up the right language servers.

## What is LSP?

Language Server Protocol is a standard that lets editors communicate with language-specific tools. Instead of every editor implementing its own TypeScript support, Go support, etc., they all speak LSP to language servers.

```
┌─────────────┐     LSP      ┌──────────────────┐
│   Editor    │ ◄──────────► │  Language Server │
│ (nvim/vscode│              │  (tsserver, gopls│
│  claude)    │              │   pyright, etc.) │
└─────────────┘              └──────────────────┘
```

## Why LSP Matters for Claude Code

**Claude Code uses LSP to understand your code better:**

1. **Accurate type information** - Claude knows that `user.name` is a string, not guessing
2. **Go-to-definition** - Claude can jump to where functions are defined
3. **Find references** - Claude can find everywhere a function is used
4. **Real-time errors** - Claude sees the same errors your editor sees
5. **Smart refactoring** - Rename a symbol and Claude updates all references

Without LSP, Claude is pattern-matching on text. With LSP, Claude understands your code's structure.

### Example: Without vs With LSP

**Without LSP:**
```
> rename the User class to Person

Claude: I'll search for "User" and replace with "Person"...
(might miss some, might replace wrong things like "UserInput")
```

**With LSP:**
```
> rename the User class to Person

Claude: I'll use the language server to find all references to the User class...
(precise rename, only actual references, handles imports correctly)
```

## Why LSP Matters for Neovim

Modern Neovim with LSP gives you VS Code-level features:

| Feature | What it does |
|---------|--------------|
| **Autocomplete** | Smart suggestions based on types |
| **Hover docs** | See function signatures and docs |
| **Go to definition** | Jump to where anything is defined |
| **Find references** | See everywhere something is used |
| **Diagnostics** | Real-time errors and warnings |
| **Code actions** | Quick fixes, extract function, etc. |
| **Rename symbol** | Rename across entire codebase |

## Installation

### TypeScript/JavaScript

```bash
# Install TypeScript language server
npm install -g typescript typescript-language-server
```

### Python

```bash
# Install Pyright (fast, feature-rich)
npm install -g pyright

# Or use pip
pip install pyright
```

### Go

```bash
# gopls comes with Go tools
go install golang.org/x/tools/gopls@latest
```

### Rust

```bash
# rust-analyzer (install via rustup)
rustup component add rust-analyzer
```

## Verifying LSP is Working

### In Claude Code

```bash
# Start Claude in a TypeScript project
cd your-ts-project
claude

# Ask Claude to use LSP
> go to the definition of the handleSubmit function
> find all references to UserService
> what type does getUserById return?
```

If Claude can answer these precisely, LSP is working.

### In Neovim

Open a TypeScript file and:

1. Hover over a function - you should see its signature
2. Press `gd` on a function call - should jump to definition
3. Make a type error - should see a diagnostic underline

## Common Language Servers

| Language | Server | Install |
|----------|--------|---------|
| TypeScript | typescript-language-server | `npm i -g typescript-language-server` |
| JavaScript | Same as TypeScript | Same |
| Python | pyright | `npm i -g pyright` |
| Go | gopls | `go install golang.org/x/tools/gopls@latest` |
| Rust | rust-analyzer | `rustup component add rust-analyzer` |
| JSON | vscode-json-languageserver | `npm i -g vscode-json-languageserver` |
| YAML | yaml-language-server | `npm i -g yaml-language-server` |
| Bash | bash-language-server | `npm i -g bash-language-server` |
| HTML/CSS | vscode-langservers | `npm i -g vscode-langservers-extracted` |

## The Power Combo: Claude + LSP + Neovim

When all three work together:

1. **You ask Claude** to refactor some code
2. **Claude uses LSP** to understand the full context
3. **Claude makes changes** that are type-safe
4. **Neovim shows** real-time feedback via its LSP client
5. **You verify** with hover, go-to-definition, etc.

```
You ──► Claude ──► LSP ──► Language Server
                    │
                    ▼
              Neovim LSP Client
                    │
                    ▼
         Real-time feedback in editor
```

## Verification Checklist

- [ ] Identified which languages you use
- [ ] Installed relevant language servers
- [ ] Claude can answer "go to definition" questions
- [ ] Claude can answer "what type is X?" questions
- [ ] (If using Neovim) Hover shows type info

## Practice

Try these with Claude:

1. Open a project and ask: "What type does the main function return?"
2. Ask: "Find all places where UserService is instantiated"
3. Ask: "Rename the `data` variable to `userData` in this function"
4. Ask: "What parameters does fetchUser accept?"

If Claude answers these precisely, LSP is working!

## Troubleshooting

**Claude doesn't seem to use LSP:**
- Make sure the language server is installed globally
- Check if there's a `tsconfig.json` (for TS) or equivalent config
- Try restarting Claude Code

**Neovim doesn't show LSP features:**
- Run `:LspInfo` to see attached servers
- Check `:LspLog` for errors
- Ensure you have an LSP plugin (nvim-lspconfig is recommended)

## Next Step

You're now set up with powerful language understanding in both Claude and Neovim. The combination makes refactoring, debugging, and exploring code much faster and more accurate.
