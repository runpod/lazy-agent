import React, { useState } from "react";
import { useKeyboard, useTerminalDimensions } from "@opentui/react";

interface SetupStep {
  id: string;
  name: string;
  description: string;
  status: "pending" | "running" | "done" | "error";
  time?: string;
}

const SETUP_STEPS: SetupStep[] = [
  { id: "brew", name: "Homebrew", description: "Install package manager", status: "pending" },
  { id: "git", name: "Git & GitHub CLI", description: "Version control setup", status: "pending" },
  { id: "shell", name: "Zsh + Powerlevel10k", description: "Shell configuration", status: "pending" },
  { id: "tmux", name: "tmux", description: "Terminal multiplexer", status: "pending" },
  { id: "tools", name: "CLI Tools", description: "fzf, ripgrep, bat, eza, fd, zoxide", status: "pending" },
  { id: "ghostty", name: "Ghostty", description: "Modern terminal emulator", status: "pending" },
  { id: "claude", name: "Claude Code", description: "AI coding assistant", status: "pending" },
  { id: "dotfiles", name: "Dotfiles", description: "Link configuration files", status: "pending" },
];

interface SetupPageProps {
  goBack: () => void;
}

export function SetupPage({ goBack }: SetupPageProps) {
  const { width, height } = useTerminalDimensions();
  const [steps, setSteps] = useState<SetupStep[]>(SETUP_STEPS);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  const completedCount = steps.filter((s) => s.status === "done").length;
  const progress = Math.round((completedCount / steps.length) * 100);

  useKeyboard((e) => {
    if (e.name === "enter" && !isRunning && currentStep === -1) {
      startSetup();
    }
    if (e.name === "s" && !isRunning) {
      goBack();
    }
  });

  async function startSetup() {
    setIsRunning(true);
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      setSteps((prev) =>
        prev.map((s, idx) =>
          idx === i ? { ...s, status: "running" } : s
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));

      setSteps((prev) =>
        prev.map((s, idx) =>
          idx === i ? { ...s, status: "done", time: `${(Math.random() * 2 + 0.5).toFixed(1)}s` } : s
        )
      );
    }
    setIsRunning(false);
    setCurrentStep(steps.length);
  }

  const progressBarWidth = 40;
  const filledWidth = Math.round(progressBarWidth * (progress / 100));

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
        <text fg="#4caf50"><b>Environment Setup</b></text>
        <text fg="#666666">
          <span fg="#888888">ESC</span> Back{" "}
          <span fg="#888888">s</span> Skip to Claude
        </text>
      </box>

      {/* Progress Bar */}
      <box paddingLeft={2} paddingRight={2} paddingTop={1} paddingBottom={1}>
        <box flexDirection="row" alignItems="center" gap={2}>
          <text fg="#888888">Progress:</text>
          <box width={progressBarWidth} height={1} backgroundColor="#333333">
            <box width={filledWidth} height={1} backgroundColor="#4caf50" />
          </box>
          <text fg={progress === 100 ? "#4caf50" : "#888888"}>{progress}%</text>
        </box>
      </box>

      {/* Steps List */}
      <scrollbox flexGrow={1} paddingLeft={2} paddingRight={2} paddingTop={1} paddingBottom={1}>
        {steps.map((step, index) => {
          const icon =
            step.status === "done"
              ? "✓"
              : step.status === "running"
                ? "◐"
                : step.status === "error"
                  ? "✗"
                  : "○";
          const color =
            step.status === "done"
              ? "#4caf50"
              : step.status === "running"
                ? "#00bcd4"
                : step.status === "error"
                  ? "#f44336"
                  : "#444444";

          return (
            <box
              key={step.id}
              flexDirection="row"
              backgroundColor={index === currentStep ? "#1a1a1a" : undefined}
            >
              <text fg={color} width={3}>
                {icon}
              </text>
              <text
                fg={step.status === "running" ? "#ffffff" : step.status === "done" ? "#888888" : "#666666"}
                width={20}
              >
                {step.name}
              </text>
              <text fg="#444444" flexGrow={1}>
                {step.description}
              </text>
              {step.time && (
                <text fg="#666666" width={8}>
                  {step.time}
                </text>
              )}
            </box>
          );
        })}
      </scrollbox>

      {/* Status */}
      <box
        height={5}
        paddingLeft={2}
        paddingRight={2}
        paddingTop={1}
        paddingBottom={1}
        border={["top"]}
        borderColor="#333333"
        flexDirection="column"
      >
        {currentStep === -1 ? (
          <>
            <text fg="#ffffff">
              Ready to set up your development environment?
            </text>
            <text fg="#666666" marginTop={1}>
              Press <span fg="#4caf50">Enter</span> to begin or{" "}
              <span fg="#888888">s</span> to skip and use Claude Code directly.
            </text>
          </>
        ) : currentStep < steps.length ? (
          <text fg="#00bcd4">
            {steps[currentStep]?.status === "running" && (
              <>Setting up {steps[currentStep]?.name}...</>
            )}
          </text>
        ) : (
          <>
            <text fg="#4caf50"><b>Setup complete!</b></text>
            <text fg="#666666" marginTop={1}>
              Your development environment is ready. Press{" "}
              <span fg="#888888">ESC</span> to return home.
            </text>
          </>
        )}
      </box>
    </box>
  );
}
