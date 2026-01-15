#!/usr/bin/env bun

/**
 * Lazy Agent - Terminal Environment Setup TUI
 * Like LazyVim, but for AI agent development environments.
 */

// Colors
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

// Tool definition
interface Tool {
  name: string;
  check: string;
  description: string;
  key?: string;
  install?: string;
  tier: "core" | "recommended" | "optional" | "experimental";
}

const TOOLS: Tool[] = [
  // Core - Essential tools
  { tier: "core", name: "Homebrew", check: "which brew", description: "Package manager", install: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"' },
  { tier: "core", name: "Git", check: "which git", description: "Version control", install: "brew install git" },
  { tier: "core", name: "Zsh", check: "which zsh", description: "Shell", install: "brew install zsh" },
  { tier: "core", name: "tmux", check: "which tmux", description: "Terminal multiplexer", install: "brew install tmux" },
  { tier: "core", name: "fzf", check: "which fzf", description: "Fuzzy finder", install: "brew install fzf" },
  { tier: "core", name: "ripgrep", check: "which rg", description: "Fast grep", install: "brew install ripgrep" },
  { tier: "core", name: "bat", check: "which bat", description: "Better cat", install: "brew install bat" },
  { tier: "core", name: "eza", check: "which eza", description: "Better ls", install: "brew install eza" },
  { tier: "core", name: "fd", check: "which fd", description: "Better find", install: "brew install fd" },
  { tier: "core", name: "zoxide", check: "which zoxide", description: "Smarter cd", install: "brew install zoxide" },
  { tier: "core", name: "delta", check: "which delta", description: "Better git diff", install: "brew install git-delta" },
  { tier: "core", name: "jq", check: "which jq", description: "JSON processor", install: "brew install jq" },

  // Recommended - Should install
  { tier: "recommended", name: "Ghostty", check: "ls /Applications/Ghostty.app 2>/dev/null", description: "Modern terminal", key: "g", install: "brew install --cask ghostty" },
  { tier: "recommended", name: "Karabiner", check: "ls /Applications/Karabiner-Elements.app 2>/dev/null", description: "Caps Lock → Esc/Ctrl", key: "k", install: "brew install --cask karabiner-elements" },
  { tier: "recommended", name: "lazygit", check: "which lazygit", description: "Git TUI", key: "l", install: "brew install lazygit" },
  { tier: "recommended", name: "GitHub CLI", check: "which gh", description: "GitHub from terminal", key: "h", install: "brew install gh" },
  { tier: "recommended", name: "Claude Code", check: "which claude", description: "AI coding assistant", key: "c", install: "npm install -g @anthropic-ai/claude-code" },

  // Optional - Based on preference
  { tier: "optional", name: "Neovim", check: "which nvim", description: "Terminal editor", key: "n", install: "brew install neovim" },
  { tier: "optional", name: "Docker", check: "which docker", description: "Containers", key: "d", install: "brew install --cask docker" },
  { tier: "optional", name: "Linear MCP", check: "grep -q linear ~/.claude/settings.json 2>/dev/null", description: "Linear integration", key: "i" },
  { tier: "optional", name: "Notion MCP", check: "grep -q notion ~/.claude/settings.json 2>/dev/null", description: "Notion integration", key: "o" },
  { tier: "optional", name: "gcalcli", check: "which gcalcli", description: "Google Calendar", key: "a", install: "brew install gcalcli" },

  // Experimental - Use with caution
  { tier: "experimental", name: "Gastown", check: "which gt", description: "Multi-agent workspaces", key: "x", install: "go install github.com/steveyegge/gastown/cmd/gt@latest" },
];

const BANNER = `
${c.cyan}██╗      █████╗ ███████╗██╗   ██╗
██║     ██╔══██╗╚══███╔╝╚██╗ ██╔╝
██║     ███████║  ███╔╝  ╚████╔╝
██║     ██╔══██║ ███╔╝    ╚██╔╝
███████╗██║  ██║███████╗   ██║
╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝
           ${c.reset}${c.bold}A G E N T${c.reset}
`;

type ToolStatus = "installed" | "missing";
type StatusMap = Map<string, ToolStatus>;

async function checkTool(tool: Tool): Promise<boolean> {
  try {
    const proc = Bun.spawn(["sh", "-c", tool.check], { stdout: "pipe", stderr: "pipe" });
    return (await proc.exited) === 0;
  } catch {
    return false;
  }
}

async function installTool(tool: Tool): Promise<boolean> {
  if (!tool.install) {
    console.log(`${c.yellow}${tool.name} requires manual setup. Run /setup-${tool.name.toLowerCase().replace(/\s+/g, '-')} in Claude.${c.reset}`);
    return false;
  }
  console.log(`\n${c.cyan}Installing ${tool.name}...${c.reset}\n`);
  const proc = Bun.spawn(["sh", "-c", tool.install], { stdout: "inherit", stderr: "inherit" });
  return (await proc.exited) === 0;
}

function printStatus(statuses: StatusMap) {
  console.clear();
  console.log(BANNER);

  const tiers = ["core", "recommended", "optional", "experimental"] as const;
  const tierNames = {
    core: `${c.green}Core (Essential)${c.reset}`,
    recommended: `${c.yellow}Recommended${c.reset}`,
    optional: `${c.blue}Optional${c.reset}`,
    experimental: `${c.red}Experimental${c.reset}`,
  };

  for (const tier of tiers) {
    const tierTools = TOOLS.filter(t => t.tier === tier);
    const installed = tierTools.filter(t => statuses.get(t.name) === "installed").length;

    console.log(`\n${tierNames[tier]} ${c.dim}(${installed}/${tierTools.length})${c.reset}`);
    console.log("─".repeat(50));

    for (const tool of tierTools) {
      const status = statuses.get(tool.name);
      const icon = status === "installed" ? `${c.green}✓${c.reset}` : `${c.red}✗${c.reset}`;
      const keyHint = tool.key ? `${c.cyan}[${tool.key}]${c.reset} ` : "    ";
      const dimDesc = `${c.dim}${tool.description}${c.reset}`;
      console.log(`  ${icon} ${keyHint}${tool.name.padEnd(15)} ${dimDesc}`);
    }
  }
}

function printMenu() {
  console.log(`
${c.bold}Quick Actions${c.reset}
─────────────────────────────────────────────────
  ${c.cyan}[1]${c.reset} Install all missing Core tools
  ${c.cyan}[2]${c.reset} Install all missing Recommended tools
  ${c.cyan}[s]${c.reset} Start guided setup with Claude Code
  ${c.cyan}[r]${c.reset} Refresh status
  ${c.cyan}[q]${c.reset} Quit

${c.dim}Press a letter key to install individual tools.${c.reset}
${c.dim}Like LazyVim, but for AI agent development.${c.reset}
`);
}

async function checkAllTools(): Promise<StatusMap> {
  const statuses: StatusMap = new Map();
  process.stdout.write(`${c.dim}Checking tools...${c.reset}`);

  for (const tool of TOOLS) {
    const installed = await checkTool(tool);
    statuses.set(tool.name, installed ? "installed" : "missing");
  }

  return statuses;
}

async function main() {
  let statuses = await checkAllTools();

  // Check if we're in a TTY (interactive terminal)
  if (!process.stdin.isTTY) {
    printStatus(statuses);
    console.log(`\n${c.dim}Run interactively for full menu.${c.reset}\n`);
    process.exit(0);
  }

  // Enable raw mode for single keypress
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  const refresh = async () => {
    statuses = await checkAllTools();
    printStatus(statuses);
    printMenu();
  };

  await refresh();

  process.stdin.on("data", async (key: string) => {
    // Ctrl+C
    if (key === "\u0003") {
      console.log("\n");
      process.exit(0);
    }

    if (key === "q") {
      console.log("\n");
      process.exit(0);
    }

    if (key === "r") {
      await refresh();
      return;
    }

    if (key === "s") {
      process.stdin.setRawMode(false);
      console.log(`\n${c.cyan}Starting guided setup with Claude Code...${c.reset}\n`);
      console.log(`Run: ${c.bold}claude${c.reset}`);
      console.log(`Then say: ${c.bold}"help me get started"${c.reset}\n`);
      process.exit(0);
    }

    if (key === "1") {
      const missing = TOOLS.filter(t => t.tier === "core" && statuses.get(t.name) === "missing");
      if (missing.length === 0) {
        console.log(`\n${c.green}All core tools already installed!${c.reset}`);
        setTimeout(refresh, 1500);
        return;
      }
      process.stdin.setRawMode(false);
      for (const tool of missing) {
        await installTool(tool);
      }
      console.log(`\n${c.green}Done! Press any key to continue...${c.reset}`);
      process.stdin.once("data", refresh);
      process.stdin.setRawMode(true);
      return;
    }

    if (key === "2") {
      const missing = TOOLS.filter(t => t.tier === "recommended" && statuses.get(t.name) === "missing");
      if (missing.length === 0) {
        console.log(`\n${c.green}All recommended tools already installed!${c.reset}`);
        setTimeout(refresh, 1500);
        return;
      }
      process.stdin.setRawMode(false);
      for (const tool of missing) {
        await installTool(tool);
      }
      console.log(`\n${c.green}Done! Press any key to continue...${c.reset}`);
      process.stdin.once("data", refresh);
      process.stdin.setRawMode(true);
      return;
    }

    // Check for individual tool keys
    const tool = TOOLS.find(t => t.key === key);
    if (tool) {
      if (statuses.get(tool.name) === "installed") {
        console.log(`\n${c.yellow}${tool.name} is already installed!${c.reset}`);
        setTimeout(refresh, 1500);
        return;
      }

      // Experimental tools need confirmation
      if (tool.tier === "experimental") {
        process.stdin.setRawMode(false);
        console.log(`\n${c.red}⚠️  WARNING: ${tool.name} is experimental software.${c.reset}`);
        console.log(`${c.red}It gives AI agents significant autonomy. Only use on test projects.${c.reset}`);
        process.stdout.write(`\nType "${c.bold}I understand${c.reset}" to proceed: `);

        const readline = await import("readline");
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

        rl.question("", async (answer) => {
          rl.close();
          if (answer.toLowerCase() === "i understand") {
            await installTool(tool);
          } else {
            console.log(`${c.yellow}Installation cancelled.${c.reset}`);
          }
          process.stdin.setRawMode(true);
          await refresh();
        });
        return;
      }

      process.stdin.setRawMode(false);
      await installTool(tool);
      console.log(`\n${c.green}Done!${c.reset}`);
      process.stdin.setRawMode(true);
      await refresh();
    }
  });
}

main().catch(console.error);
