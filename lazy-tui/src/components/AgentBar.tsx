import React, { useState, useEffect } from "react";
import type { Page, AgentMode } from "../index";

interface ModeConfig {
  icon: string;
  color: string;
  name: string;
}

const MODE_CONFIG: Record<AgentMode, ModeConfig> = {
  default: { icon: "›", color: "#e0a526", name: "Agent" },
  wizard: { icon: "◆", color: "#9c27b0", name: "Wizard" },
  pirate: { icon: "†", color: "#f44336", name: "Captain" },
};

const MODE_MESSAGES: Record<AgentMode, Record<Page, string[]>> = {
  default: {
    game: [
      "Flap to survive!",
      "Don't hit the pipes!",
      "High score hunting?",
      "SPACE to flap, ESC to quit.",
      "One more try...",
      "You've got this!",
      "Timing is everything.",
      "Beat your high score!",
    ],
    splash: [
      "Welcome! Pick an option to get started.",
      "Your dev environment awaits.",
      "What shall we configure today?",
      "Ready when you are.",
      "A well-configured terminal is a happy terminal.",
      "Let's make your setup shine.",
      "Tools, setup, or dive right into Claude?",
      "Everything you need, one keypress away.",
      "Your terminal journey starts here.",
      "Press a key. Any key. Well, not ANY key...",
    ],
    tools: [
      "Green = installed, red = missing.",
      "Use hjkl to navigate.",
      "Press Enter to install.",
      "Building a better terminal.",
      "A craftsman is only as good as their tools.",
      "Some essentials, some nice-to-haves.",
      "Mix and match to your liking.",
      "Core tools are... well, core.",
      "The right tools make all the difference.",
      "Red X's are just opportunities.",
      "One brew install away from greatness.",
      "Your toolkit is looking pretty good.",
    ],
    setup: [
      "Setting things up...",
      "This won't take long.",
      "Configuring your environment.",
      "Automating the boring stuff.",
      "Sit back, let the scripts do their thing.",
      "Progress bars are oddly satisfying.",
      "Almost there...",
      "Your future self will thank you.",
      "One-time pain, lifetime gain.",
      "Installing the good stuff.",
    ],
    help: [
      "Vim keys work everywhere.",
      "Press 'a' to toggle me off.",
      "Muscle memory is your friend.",
      "hjkl - the sacred navigation keys.",
      "ESC always takes you back home.",
      "When in doubt, press '?'.",
      "Pro tip: 'm' cycles through modes.",
      "Memorize these, become unstoppable.",
      "The terminal rewards the prepared.",
      "These keybindings will serve you well.",
    ],
  },
  wizard: {
    game: [
      "Channel your magic quickly!",
      "The incantations must be precise!",
      "Speed is of the essence, apprentice!",
      "Focus your mind on the runes!",
      "Faster! The spell fades!",
      "Your fingers must dance like flames!",
      "The arcane arts demand perfection!",
      "Type the ancient words!",
    ],
    splash: [
      "What manner of glowing tome is this?!",
      "These runes shift before my eyes!",
      "In 400 years, I've never seen such sorcery...",
      "Press the sacred letters, they say. But WHY?",
      "The prophecy spoke of a 'terminal'... is this it?",
      "I sense great power here. And great confusion.",
      "My crystal ball never showed me THIS.",
      "Is this the work of a rival mage?",
      "The ancient texts mentioned nothing of this!",
      "I should have stayed in my tower...",
      "What realm have I stumbled into?",
      "These symbols... they pulse with energy!",
    ],
    tools: [
      "What is a 'git'? Some kind of imp?",
      "'Homebrew'? At last, something I understand!",
      "The green marks feel good. The red ones... cursed.",
      "Why do all the spells need 'installing'?",
      "'ripgrep'? Is that a spell for finding things?",
      "These 'packages'... are they potions?",
      "I sense dark magic in this 'Docker' thing.",
      "'tmux'? Sounds like a sneeze.",
      "Each tool seems to hold a different spirit.",
      "The red X's must be banished!",
      "In my day, we used actual bats, not 'bat'.",
      "'zoxide'? Sounds like a failed potion.",
    ],
    setup: [
      "The familiar spirits are at work, I think?",
      "In my tower, setup meant arranging candles...",
      "What dark ritual have I stumbled upon?",
      "The progress bar... it fills with ethereal energy!",
      "Is this summoning something? Should I be worried?",
      "My apprentice would never believe this.",
      "The incantation seems to be working...",
      "I dare not interrupt these spirits.",
      "This 'configuration' magic is powerful indeed.",
      "The runes are aligning themselves!",
    ],
    help: [
      "h-j-k-l? What incantation is this?",
      "I miss my quill and parchment...",
      "Press 'm' to... change me? WHAT SORCERY?!",
      "A grimoire! Though written in strange tongues.",
      "These 'keybindings' must be magical contracts.",
      "ESC-ape? Is that a portal spell?",
      "The ancients used scrolls. This is... different.",
      "I shall study these arcane instructions.",
      "'Enter' to cast the spell, I presume?",
      "Navigation magic! How peculiar.",
    ],
  },
  pirate: {
    game: [
      "Steer through the storm, captain!",
      "Avoid the waves or we sink!",
      "Hard to port! Hard to starboard!",
      "This be the roughest seas I've seen!",
      "Navigate like yer life depends on it!",
      "The ship won't sail herself!",
      "Use those vim keys like a true sailor!",
      "Rough waters ahead!",
    ],
    splash: [
      "Blimey! What's this glowing contraption?!",
      "Where's me ship? Why am I in a rectangle?",
      "The letters move on their own! HAUNTED!",
      "Someone fetch me rum...",
      "This ain't like any treasure map I've seen!",
      "I've sailed seven seas but never seen THIS.",
      "Is this some kind of brig? Where's the door?",
      "Me crew would mutiny if they saw this.",
      "The future is strange and terrifying.",
      "I didn't sign up for this voyage!",
      "Where's the horizon? I need fresh air!",
      "This box speaks in riddles!",
    ],
    tools: [
      "These ain't tools! Where's me cutlass?",
      "What in Davy Jones' locker is a 'ripgrep'?!",
      "'Docker'? Is that a type of ship?",
      "I don't trust these invisible 'packages'...",
      "Green means safe passage, red means danger!",
      "'git'? Sounds like an insult. You git!",
      "'Homebrew'... now THAT I could use!",
      "Where's the rum in this 'brew'?",
      "A captain needs proper tools, not this!",
      "'tmux'? Sounds like a sea monster.",
      "These 'installations' are like loading cargo.",
      "'bat'? The only bats I know hang in caves.",
    ],
    setup: [
      "It's loading the cargo, I think?",
      "Back in my day, we set up with rope and canvas!",
      "I've been shanghaied into the future!",
      "This is slower than waiting for favorable winds.",
      "Is the ship being repaired? What ship?!",
      "Progress bar? More like a plank to walk!",
      "Me patience is wearing thin...",
      "This better be worth the wait, landlubber!",
      "I've weathered storms faster than this.",
      "Are we taking on supplies? What supplies?!",
    ],
    help: [
      "h-j-k-l? That ain't no heading I know!",
      "In my time, '?' meant 'land ho?'",
      "Press 'm'... to what? Mutiny?!",
      "A captain's log! But written by a madman!",
      "These 'keys' better unlock treasure!",
      "Navigation instructions? Finally something familiar!",
      "ESC-ape? AYE, I'd like to escape!",
      "Enter? Enter what? The brig?",
      "If only me crew could read this...",
      "These charts make no sense to a sailor!",
    ],
  },
};

interface AgentBarProps {
  page: Page;
  mode: AgentMode;
  enabled: boolean;
}

export function AgentBar({ page, mode, enabled }: AgentBarProps) {
  const [message, setMessage] = useState("");
  const config = MODE_CONFIG[mode];

  // Pick a random message when context changes
  useEffect(() => {
    if (!enabled) return;
    const messages = MODE_MESSAGES[mode][page] || [];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)] || "...";
    setMessage(randomMessage);
  }, [page, mode, enabled]);

  // Rotate message every 8 seconds
  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      const messages = MODE_MESSAGES[mode][page] || [];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)] || "...";
      setMessage(randomMessage);
    }, 8000);
    return () => clearInterval(interval);
  }, [page, mode, enabled]);

  return (
    <box
      height={3}
      paddingLeft={2}
      paddingRight={2}
      paddingTop={1}
      border={["top"]}
      borderColor="#333333"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {enabled ? (
        <text>
          <span fg={config.color}>{config.icon}</span>
          <span fg="#666666"> </span>
          <span fg="#888888"><i>{message}</i></span>
        </text>
      ) : (
        <text fg="#444444">
          <span fg="#666666">a</span> Enable agent commentary
        </text>
      )}
      <text fg="#444444">
        {enabled && <><span fg="#666666">m</span> {config.name} </>}
        <span fg={enabled ? "#4caf50" : "#666666"}>a</span> {enabled ? "on" : "off"}
      </text>
    </box>
  );
}
