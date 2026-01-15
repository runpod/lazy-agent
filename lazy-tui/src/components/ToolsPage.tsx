import React, { useState, useEffect } from "react";
import { useKeyboard, useTerminalDimensions } from "@opentui/react";
import type { AgentMode } from "../index";

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
  { tier: "core", name: "Homebrew", check: "which brew", description: "Package manager" },
  { tier: "core", name: "Git", check: "which git", description: "Version control" },
  { tier: "core", name: "Zsh", check: "which zsh", description: "Shell" },
  { tier: "core", name: "tmux", check: "which tmux", description: "Terminal multiplexer" },
  { tier: "core", name: "fzf", check: "which fzf", description: "Fuzzy finder" },
  { tier: "core", name: "ripgrep", check: "which rg", description: "Fast grep" },
  { tier: "core", name: "bat", check: "which bat", description: "Better cat" },
  { tier: "core", name: "eza", check: "which eza", description: "Better ls" },
  { tier: "core", name: "fd", check: "which fd", description: "Better find" },
  { tier: "core", name: "zoxide", check: "which zoxide", description: "Smarter cd" },
  { tier: "core", name: "delta", check: "which delta", description: "Better git diff" },
  { tier: "core", name: "jq", check: "which jq", description: "JSON processor" },

  // Recommended - Should install
  { tier: "recommended", name: "Ghostty", check: "ls /Applications/Ghostty.app 2>/dev/null", description: "Modern terminal", key: "g" },
  { tier: "recommended", name: "Karabiner", check: "ls /Applications/Karabiner-Elements.app 2>/dev/null", description: "Keyboard customization", key: "k" },
  { tier: "recommended", name: "lazygit", check: "which lazygit", description: "Git TUI", key: "l" },
  { tier: "recommended", name: "GitHub CLI", check: "which gh", description: "GitHub from terminal", key: "h" },
  { tier: "recommended", name: "Claude Code", check: "which claude", description: "AI coding assistant", key: "c" },

  // Optional - Based on preference
  { tier: "optional", name: "Neovim", check: "which nvim", description: "Terminal editor", key: "n" },
  { tier: "optional", name: "Docker", check: "which docker", description: "Containers", key: "d" },
  { tier: "optional", name: "Linear MCP", check: "grep -q linear ~/.claude/settings.local.json 2>/dev/null", description: "Linear integration" },
  { tier: "optional", name: "Notion MCP", check: "grep -q notion ~/.claude/settings.local.json 2>/dev/null", description: "Notion integration" },
  { tier: "optional", name: "gcalcli", check: "which gcalcli", description: "Google Calendar" },

  // Experimental - Use with caution
  { tier: "experimental", name: "Gastown", check: "which gt", description: "Multi-agent workspaces", key: "x" },
];

type ToolStatus = "installed" | "missing" | "checking";
type StatusMap = Map<string, ToolStatus>;

const TIER_COLORS: Record<Tool["tier"], string> = {
  core: "#4caf50",
  recommended: "#ffc107",
  optional: "#2196f3",
  experimental: "#f44336",
};

const TIER_LABELS: Record<Tool["tier"], string> = {
  core: "Core (Essential)",
  recommended: "Recommended",
  optional: "Optional",
  experimental: "Experimental",
};

const TIER_DESCRIPTIONS: Record<AgentMode, Record<Tool["tier"], string>> = {
  default: {
    core: "The essentials. You'll use these every day.",
    recommended: "Highly recommended for productivity.",
    optional: "Nice to have, based on your workflow.",
    experimental: "Bleeding edge. Use at your own risk.",
  },
  wizard: {
    core: "The fundamental grimoires. No mage should be without these.",
    recommended: "Powerful artifacts to enhance your craft.",
    optional: "Curious trinkets for the adventurous wizard.",
    experimental: "Forbidden knowledge. Proceed with caution...",
  },
  pirate: {
    core: "Essential supplies for any voyage. Don't leave port without 'em!",
    recommended: "Fine additions to any ship's cargo.",
    optional: "Extra loot for the discerning captain.",
    experimental: "Uncharted waters, matey. Here be dragons!",
  },
};

interface ToolsPageProps {
  goBack: () => void;
  mode: AgentMode;
}

export function ToolsPage({ goBack, mode }: ToolsPageProps) {
  const { width, height } = useTerminalDimensions();
  const [statuses, setStatuses] = useState<StatusMap>(new Map());
  const [selectedTier, setSelectedTier] = useState<Tool["tier"]>("core");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tiers: Tool["tier"][] = ["core", "recommended", "optional", "experimental"];

  // Check tool status
  useEffect(() => {
    async function checkTools() {
      const newStatuses = new Map<string, ToolStatus>();
      for (const tool of TOOLS) {
        newStatuses.set(tool.name, "checking");
      }
      setStatuses(new Map(newStatuses));

      for (const tool of TOOLS) {
        try {
          const proc = Bun.spawn(["sh", "-c", tool.check], {
            stdout: "pipe",
            stderr: "pipe",
          });
          const exitCode = await proc.exited;
          newStatuses.set(tool.name, exitCode === 0 ? "installed" : "missing");
        } catch {
          newStatuses.set(tool.name, "missing");
        }
        setStatuses(new Map(newStatuses));
      }
    }
    checkTools();
  }, []);

  const currentTierTools = TOOLS.filter((t) => t.tier === selectedTier);

  useKeyboard((e) => {
    const tierIndex = tiers.indexOf(selectedTier);

    switch (e.name) {
      case "h":
      case "left":
        if (tierIndex > 0) {
          setSelectedTier(tiers[tierIndex - 1]);
          setSelectedIndex(0);
        }
        break;
      case "l":
      case "right":
        if (tierIndex < tiers.length - 1) {
          setSelectedTier(tiers[tierIndex + 1]);
          setSelectedIndex(0);
        }
        break;
      case "j":
      case "down":
        if (selectedIndex < currentTierTools.length - 1) {
          setSelectedIndex(selectedIndex + 1);
        }
        break;
      case "k":
      case "up":
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
        }
        break;
      case "enter":
        // TODO: Install selected tool
        break;
    }
  });

  const installedCount = (tier: Tool["tier"]) =>
    TOOLS.filter((t) => t.tier === tier && statuses.get(t.name) === "installed").length;
  const totalCount = (tier: Tool["tier"]) => TOOLS.filter((t) => t.tier === tier).length;

  return (
    <box width="100%" height="100%" flexDirection="column">
      {/* Header */}
      <box
        height={3}
        paddingLeft={2}
        paddingRight={2}
        paddingTop={1}
        paddingBottom={1}
        border={["bottom"]}
        borderColor="#333333"
        flexDirection="row"
        justifyContent="space-between"
      >
        <text fg="#ffffff"><b>Tools</b></text>
        <text fg="#666666">
          <span fg="#888888">ESC</span> Back <span fg="#888888">hjkl</span> Navigate{" "}
          <span fg="#888888">Enter</span> Install
        </text>
      </box>

      {/* Tabs */}
      <box height={3} paddingLeft={2} paddingRight={2} flexDirection="row" gap={2} alignItems="center">
        {tiers.map((tier) => (
          <box
            key={tier}
            paddingLeft={2}
            paddingRight={2}
            backgroundColor={selectedTier === tier ? "#333333" : undefined}
            border={selectedTier === tier ? ["bottom"] : undefined}
            borderColor={TIER_COLORS[tier]}
          >
            <text fg={selectedTier === tier ? TIER_COLORS[tier] : "#666666"}>
              {TIER_LABELS[tier]}{" "}
              <span fg="#888888">
                ({installedCount(tier)}/{totalCount(tier)})
              </span>
            </text>
          </box>
        ))}
      </box>

      {/* Tier Description */}
      <box paddingLeft={2} paddingRight={2} paddingTop={1}>
        <text fg="#888888"><i>{TIER_DESCRIPTIONS[mode][selectedTier]}</i></text>
      </box>

      {/* Tool List */}
      <scrollbox flexGrow={1} paddingLeft={2} paddingRight={2} paddingTop={1} paddingBottom={1}>
        {currentTierTools.map((tool, index) => {
          const status = statuses.get(tool.name) || "checking";
          const isSelected = index === selectedIndex;
          const statusIcon =
            status === "installed" ? "✓" : status === "missing" ? "✗" : "…";
          const statusColor =
            status === "installed"
              ? "#4caf50"
              : status === "missing"
                ? "#f44336"
                : "#888888";

          return (
            <box
              key={tool.name}
              flexDirection="row"
              paddingLeft={1}
              paddingRight={1}
              backgroundColor={isSelected ? "#333333" : undefined}
            >
              <text fg={statusColor} width={3}>
                {statusIcon}
              </text>
              <text fg={tool.key ? "#00bcd4" : "#444444"} width={4}>
                {tool.key ? `[${tool.key}]` : "   "}
              </text>
              <text fg={isSelected ? "#ffffff" : "#cccccc"} width={16}>
                {tool.name}
              </text>
              <text fg="#666666">{tool.description}</text>
            </box>
          );
        })}
      </scrollbox>

      {/* Footer */}
      <box
        height={3}
        paddingLeft={2}
        paddingRight={2}
        paddingTop={1}
        paddingBottom={1}
        border={["top"]}
        borderColor="#333333"
        flexDirection="row"
        justifyContent="space-between"
      >
        <text fg="#666666">
          <span fg="#4caf50">✓</span> Installed{" "}
          <span fg="#f44336">✗</span> Missing
        </text>
        <text fg="#666666">
          Press <span fg="#888888">1</span> to install all core,{" "}
          <span fg="#888888">2</span> for recommended
        </text>
      </box>
    </box>
  );
}
