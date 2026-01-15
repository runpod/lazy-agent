import React from "react";
import { useTerminalDimensions } from "@opentui/react";
import type { Page, AgentMode } from "../index";

const LOGO = `
██╗      █████╗ ███████╗██╗   ██╗
██║     ██╔══██╗╚══███╔╝╚██╗ ██╔╝
██║     ███████║  ███╔╝  ╚████╔╝
██║     ██╔══██║ ███╔╝    ╚██╔╝
███████╗██║  ██║███████╗   ██║
╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝`;

const SUBTITLE = "A G E N T";

const THEME: Record<AgentMode, { primary: string; secondary: string; accent: string; muted: string }> = {
  default: {
    primary: "#e0a526",
    secondary: "#00bcd4",
    accent: "#4caf50",
    muted: "#666666",
  },
  wizard: {
    primary: "#9c27b0",
    secondary: "#ce93d8",
    accent: "#7c4dff",
    muted: "#6a1b9a",
  },
  pirate: {
    primary: "#f44336",
    secondary: "#ff9800",
    accent: "#ffeb3b",
    muted: "#8b4513",
  },
};

interface MenuItem {
  icon: Record<AgentMode, string>;
  label: Record<AgentMode, string>;
  key: string;
  page?: Page;
}

const MENU_ITEMS: MenuItem[] = [
  {
    icon: { default: "▸", wizard: "◆", pirate: "▸" },
    label: { default: "Tools", wizard: "Magical Artifacts", pirate: "Ship Supplies" },
    key: "t",
    page: "tools",
  },
  {
    icon: { default: "▸", wizard: "◆", pirate: "▸" },
    label: { default: "Setup", wizard: "Cast Ritual", pirate: "Prepare Voyage" },
    key: "s",
    page: "setup",
  },
  {
    icon: { default: "▸", wizard: "◆", pirate: "▸" },
    label: { default: "Claude Code", wizard: "Summon Familiar", pirate: "Call Parrot" },
    key: "c",
  },
  {
    icon: { default: "▸", wizard: "◆", pirate: "▸" },
    label: { default: "Install Core", wizard: "Learn Basics", pirate: "Stock Essentials" },
    key: "1",
  },
  {
    icon: { default: "▸", wizard: "◆", pirate: "▸" },
    label: { default: "Install Recommended", wizard: "Advanced Spells", pirate: "Premium Loot" },
    key: "2",
  },
  {
    icon: { default: "▸", wizard: "◆", pirate: "▸" },
    label: { default: "Help", wizard: "Grimoire", pirate: "Sea Charts" },
    key: "?",
    page: "help",
  },
  {
    icon: { default: "▸", wizard: "◆", pirate: "▸" },
    label: { default: "Mini Game", wizard: "Spell Practice", pirate: "Storm Training" },
    key: "g",
    page: "game",
  },
  {
    icon: { default: "▸", wizard: "◆", pirate: "▸" },
    label: { default: "Quit", wizard: "Return to Realm", pirate: "Abandon Ship" },
    key: "q",
  },
];

const MENU_WIDTH = 40;

interface SplashScreenProps {
  navigate: (page: Page) => void;
  mode: AgentMode;
}

export function SplashScreen({ navigate, mode }: SplashScreenProps) {
  const { width, height } = useTerminalDimensions();
  const theme = THEME[mode];

  return (
    <box
      width="100%"
      height="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {/* Logo */}
      <text fg={theme.primary}>{LOGO}</text>
      <text fg={theme.secondary} marginTop={1}><b>{SUBTITLE}</b></text>

      {/* Menu Items */}
      <box flexDirection="column" marginTop={3} width={MENU_WIDTH}>
        {MENU_ITEMS.map((item) => (
          <box key={item.key} flexDirection="row" justifyContent="space-between" marginTop={1}>
            <text>
              <span fg={theme.muted}>{item.icon[mode]}  </span>
              <span fg={theme.secondary}>{item.label[mode]}</span>
            </text>
            <text fg={theme.secondary}>{item.key}</text>
          </box>
        ))}
      </box>

      {/* Footer */}
      <text fg={theme.muted} marginTop={3}>
        <span fg={theme.accent}>m</span> change mode
      </text>
    </box>
  );
}
