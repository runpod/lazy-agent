import React from "react";
import { useTerminalDimensions } from "@opentui/react";

interface KeybindSection {
  title: string;
  keybinds: { key: string; description: string }[];
}

const KEYBIND_SECTIONS: KeybindSection[] = [
  {
    title: "Global",
    keybinds: [
      { key: "q", description: "Quit / Back" },
      { key: "ESC", description: "Back to home" },
      { key: "?", description: "Toggle help" },
    ],
  },
  {
    title: "Home Screen",
    keybinds: [
      { key: "t", description: "Open Tools browser" },
      { key: "s", description: "Start guided setup" },
      { key: "1", description: "Install all core tools" },
      { key: "2", description: "Install recommended tools" },
      { key: "c", description: "Open Claude Code" },
    ],
  },
  {
    title: "Tools Browser",
    keybinds: [
      { key: "h/l", description: "Switch category tabs" },
      { key: "j/k", description: "Navigate tools list" },
      { key: "Enter", description: "Install selected tool" },
      { key: "i", description: "View tool info" },
    ],
  },
  {
    title: "tmux (after setup)",
    keybinds: [
      { key: "Ctrl+b", description: "Prefix key" },
      { key: "Prefix + -", description: "Split horizontal" },
      { key: "Prefix + |", description: "Split vertical" },
      { key: "Ctrl+h/j/k/l", description: "Navigate panes" },
      { key: "Prefix + m", description: "Zoom pane" },
    ],
  },
];

const TIPS = [
  "Run `claude` and say 'help me get started' for interactive setup",
  "Ghostty + tmux + Powerlevel10k = Terminal nirvana",
  "Use `gt hook` to manage AI agent workspaces (experimental)",
  "Press `c` from home to launch Claude Code instantly",
];

interface HelpPageProps {
  goBack: () => void;
}

export function HelpPage({ goBack }: HelpPageProps) {
  const { width, height } = useTerminalDimensions();

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
        <text fg="#2196f3"><b>Help and Keybindings</b></text>
        <text fg="#666666">
          <span fg="#888888">ESC</span> Back
        </text>
      </box>

      {/* Content */}
      <scrollbox flexGrow={1} paddingLeft={2} paddingRight={2} paddingTop={1} paddingBottom={1}>
        {/* Keybind Sections in 2 columns */}
        <box flexDirection="row" flexWrap="wrap" gap={4}>
          {KEYBIND_SECTIONS.map((section) => (
            <box
              key={section.title}
              flexDirection="column"
              width={Math.floor(width / 2) - 6}
              marginBottom={2}
            >
              <text fg="#888888" marginBottom={1}>
                {section.title}
              </text>
              <box
                border={true}
                borderStyle="rounded"
                borderColor="#333333"
                paddingLeft={2}
                paddingRight={2}
                paddingTop={1}
                paddingBottom={1}
                flexDirection="column"
              >
                {section.keybinds.map((kb) => (
                  <box key={kb.key} flexDirection="row">
                    <text fg="#00bcd4" width={14}>
                      {kb.key}
                    </text>
                    <text fg="#666666">{kb.description}</text>
                  </box>
                ))}
              </box>
            </box>
          ))}
        </box>

        {/* Tips Section */}
        <box flexDirection="column" marginTop={2}>
          <text fg="#888888" marginBottom={1}>
            Tips and Tricks
          </text>
          <box
            border={true}
            borderStyle="rounded"
            borderColor="#333333"
            paddingLeft={2}
            paddingRight={2}
            paddingTop={1}
            paddingBottom={1}
            flexDirection="column"
          >
            {TIPS.map((tip, i) => (
              <box key={i} flexDirection="row">
                <text fg="#ffc107" width={3}>
                  -
                </text>
                <text fg="#666666">{tip}</text>
              </box>
            ))}
          </box>
        </box>

        {/* About */}
        <box flexDirection="column" marginTop={2}>
          <text fg="#888888" marginBottom={1}>
            About
          </text>
          <box
            border={true}
            borderStyle="rounded"
            borderColor="#333333"
            paddingLeft={2}
            paddingRight={2}
            paddingTop={1}
            paddingBottom={1}
            flexDirection="column"
          >
            <text fg="#666666">
              <span fg="#00bcd4">Lazy Agent</span> is a LazyVim-inspired TUI for
              setting up AI-powered development environments.
            </text>
            <text fg="#666666" marginTop={1}>
              Built with OpenTUI + React
            </text>
            <text fg="#444444" marginTop={1}>
              v0.1.0
            </text>
          </box>
        </box>
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
      >
        <text fg="#444444">
          GitHub:{" "}
          <span fg="#00bcd4">zackmckennarunpod/hello-claude</span>
        </text>
      </box>
    </box>
  );
}
