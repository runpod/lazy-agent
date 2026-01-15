import React from "react";
import type { AgentMode } from "../index";
import { WizardGame } from "./games/WizardGame";
import { PirateGame } from "./games/PirateGame";
import { FlappyGame } from "./games/FlappyGame";

interface GamesPageProps {
  goBack: () => void;
  mode: AgentMode;
}

export function GamesPage({ goBack, mode }: GamesPageProps) {
  switch (mode) {
    case "wizard":
      return <WizardGame goBack={goBack} />;
    case "pirate":
      return <PirateGame goBack={goBack} />;
    default:
      return <FlappyGame goBack={goBack} />;
  }
}
