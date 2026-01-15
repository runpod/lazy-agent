#!/usr/bin/env bun
/**
 * Lazy Agent TUI - LazyVim-style terminal UI for AI agent development
 *
 * A beautiful splash screen with hotkey navigation to different sections.
 */

import { createCliRenderer } from "@opentui/core";
import { createRoot, useKeyboard, useTerminalDimensions } from "@opentui/react";
import React, { useState, useCallback } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { ToolsPage } from "./components/ToolsPage";
import { SetupPage } from "./components/SetupPage";
import { HelpPage } from "./components/HelpPage";
import { GamesPage } from "./components/GamesPage";
import { AgentBar } from "./components/AgentBar";

export type Page = "splash" | "tools" | "setup" | "help" | "game";
export type AgentMode = "default" | "wizard" | "pirate";

export const AGENT_MODES: AgentMode[] = ["default", "wizard", "pirate"];

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("splash");
  const [agentMode, setAgentMode] = useState<AgentMode>("default");
  const [agentEnabled, setAgentEnabled] = useState(true);
  const { width, height } = useTerminalDimensions();

  const cycleMode = useCallback(() => {
    setAgentMode((current) => {
      const idx = AGENT_MODES.indexOf(current);
      return AGENT_MODES[(idx + 1) % AGENT_MODES.length];
    });
  }, []);

  const toggleAgent = useCallback(() => {
    setAgentEnabled((current) => !current);
  }, []);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const goBack = useCallback(() => {
    setCurrentPage("splash");
  }, []);

  // Global keyboard handler for navigation
  useKeyboard((e) => {
    // Only handle on splash screen for navigation shortcuts
    if (currentPage === "splash") {
      switch (e.name) {
        case "t":
          navigate("tools");
          break;
        case "s":
          navigate("setup");
          break;
        case "c":
          // Launch Claude Code - exit TUI first
          process.exit(0);
          break;
        case "1":
          // Install core tools
          Bun.spawn(["brew", "install", "git", "zsh", "tmux", "fzf", "ripgrep", "bat", "eza", "fd", "zoxide", "delta", "jq"], {
            stdio: ["inherit", "inherit", "inherit"],
          });
          break;
        case "2":
          // Install recommended tools
          Bun.spawn(["brew", "install", "lazygit", "gh"], {
            stdio: ["inherit", "inherit", "inherit"],
          });
          break;
        case "?":
          navigate("help");
          break;
        case "g":
          navigate("game");
          break;
        case "m":
          cycleMode();
          break;
        case "a":
          toggleAgent();
          break;
        case "q":
          process.exit(0);
          break;
      }
    } else {
      // ESC or q goes back to splash from any page
      if (e.name === "escape" || e.name === "q") {
        goBack();
      }
    }
  });

  return (
    <box width={width} height={height} flexDirection="column">
      <box flexGrow={1}>
        {currentPage === "splash" && <SplashScreen navigate={navigate} mode={agentMode} />}
        {currentPage === "tools" && <ToolsPage goBack={goBack} mode={agentMode} />}
        {currentPage === "setup" && <SetupPage goBack={goBack} />}
        {currentPage === "help" && <HelpPage goBack={goBack} />}
        {currentPage === "game" && <GamesPage goBack={goBack} mode={agentMode} />}
      </box>
      <AgentBar page={currentPage} mode={agentMode} enabled={agentEnabled} />
    </box>
  );
}

async function main() {
  const renderer = await createCliRenderer({
    exitOnCtrlC: true,
  });

  createRoot(renderer).render(<App />);
}

main().catch(console.error);
