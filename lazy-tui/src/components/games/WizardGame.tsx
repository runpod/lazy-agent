import React, { useState, useEffect, useCallback, useRef } from "react";
import { useKeyboard } from "@opentui/react";

interface Spell {
  name: string;
  incantation: string;
  damage: number;
  heal?: number;
}

// Spells organized by difficulty (longer = harder)
const EASY_SPELLS: Spell[] = [
  { name: "Fire", incantation: "igni", damage: 15 },
  { name: "Ice", incantation: "glac", damage: 12 },
  { name: "Zap", incantation: "volt", damage: 10 },
  { name: "Wind", incantation: "aura", damage: 12 },
];

const MEDIUM_SPELLS: Spell[] = [
  { name: "Fireball", incantation: "ignis", damage: 20 },
  { name: "Lightning", incantation: "fulgur", damage: 25 },
  { name: "Ice Shard", incantation: "glacius", damage: 22 },
  { name: "Shadow", incantation: "umbra", damage: 20 },
];

const HARD_SPELLS: Spell[] = [
  { name: "Arcane Bolt", incantation: "arcanum", damage: 30 },
  { name: "Inferno", incantation: "conflagro", damage: 35 },
  { name: "Thunderstorm", incantation: "tempestas", damage: 32 },
  { name: "Void Strike", incantation: "oblivion", damage: 35 },
];

const EXTREME_SPELLS: Spell[] = [
  { name: "Apocalypse", incantation: "exterminatus", damage: 50 },
  { name: "Supernova", incantation: "stellamortem", damage: 55 },
  { name: "Annihilation", incantation: "destructorem", damage: 60 },
];

const HEAL_SPELLS: Spell[] = [
  { name: "Heal", incantation: "sana", damage: 0, heal: 25 },
  { name: "Restore", incantation: "vitalis", damage: 0, heal: 40 },
];

const LANE_COUNT = 3;
const ATTACK_LANE_WIDTH = 40;

interface Attack {
  id: number;
  x: number;
  lane: number;
  char: string;
}

interface WizardGameProps {
  goBack: () => void;
}

export function WizardGame({ goBack }: WizardGameProps) {
  const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready");
  const [currentSpell, setCurrentSpell] = useState<Spell>(EASY_SPELLS[0]);
  const [typed, setTyped] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Combat state
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [playerLane, setPlayerLane] = useState(1); // 0, 1, or 2 (middle)
  const [monsterLane, setMonsterLane] = useState(1); // Monster also moves!
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [castAnimation, setCastAnimation] = useState<string | null>(null);
  const [hitAnimation, setHitAnimation] = useState(false);
  const [monsterHit, setMonsterHit] = useState(false);
  const [spellReady, setSpellReady] = useState(false);
  const [healAnimation, setHealAnimation] = useState(false);

  const attackIdRef = useRef(0);

  const nextSpell = useCallback(() => {
    // 25% chance for heal spell if health < 70
    if (playerHealth < 70 && Math.random() < 0.25) {
      const next = HEAL_SPELLS[Math.floor(Math.random() * HEAL_SPELLS.length)];
      setCurrentSpell(next);
    } else {
      // Difficulty scales with score
      let spellPool: Spell[];
      if (score < 50) {
        // Early game: easy spells only
        spellPool = EASY_SPELLS;
      } else if (score < 150) {
        // Getting harder: easy + medium
        spellPool = [...EASY_SPELLS, ...MEDIUM_SPELLS];
      } else if (score < 300) {
        // Mid game: medium + hard
        spellPool = [...MEDIUM_SPELLS, ...HARD_SPELLS];
      } else if (score < 500) {
        // Late game: hard + extreme
        spellPool = [...HARD_SPELLS, ...EXTREME_SPELLS];
      } else {
        // End game: mostly extreme with some hard
        spellPool = [...HARD_SPELLS, ...EXTREME_SPELLS, ...EXTREME_SPELLS];
      }
      const next = spellPool[Math.floor(Math.random() * spellPool.length)];
      setCurrentSpell(next);
    }
    setTyped("");
    setSpellReady(false);
  }, [playerHealth, score]);

  const startGame = useCallback(() => {
    setGameState("playing");
    setScore(0);
    setTyped("");
    setPlayerHealth(100);
    setMonsterHealth(100);
    setPlayerLane(1);
    setMonsterLane(1);
    setAttacks([]);
    setCastAnimation(null);
    setSpellReady(false);
    nextSpell();
  }, [nextSpell]);

  const castSpell = useCallback(() => {
    if (!spellReady) return;

    // Heal spell - always works
    if (currentSpell.heal) {
      setHealAnimation(true);
      setTimeout(() => setHealAnimation(false), 500);
      setPlayerHealth((h) => Math.min(100, h + currentSpell.heal!));
      setScore((s) => s + 5);
      nextSpell();
      return;
    }

    // Attack spell - must be in same lane as monster!
    setCastAnimation(currentSpell.name);
    setTimeout(() => setCastAnimation(null), 600);

    if (playerLane !== monsterLane) {
      // Missed! Wrong lane
      nextSpell();
      return;
    }

    // Hit!
    setMonsterHit(true);
    setTimeout(() => setMonsterHit(false), 300);

    setMonsterHealth((h) => {
      const newHealth = h - currentSpell.damage;
      if (newHealth <= 0) {
        setScore((s) => s + 100);
        setTimeout(() => {
          setMonsterHealth(100 + Math.floor(score / 50) * 20);
          setMonsterLane(Math.floor(Math.random() * LANE_COUNT)); // New monster, random lane
          nextSpell();
        }, 600);
        return 0;
      }
      setScore((s) => s + 10);
      nextSpell();
      return newHealth;
    });
  }, [spellReady, currentSpell, nextSpell, score, playerLane, monsterLane]);

  // Check if spell is complete
  useEffect(() => {
    if (gameState !== "playing") return;
    if (typed.toLowerCase() === currentSpell.incantation.toLowerCase()) {
      setSpellReady(true);
    }
  }, [typed, currentSpell, gameState]);

  // Monster moves between lanes
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      // Monster moves to a different lane
      setMonsterLane((current) => {
        const newLane = Math.floor(Math.random() * LANE_COUNT);
        // Avoid staying in same lane too often
        if (newLane === current && Math.random() < 0.7) {
          return (current + 1) % LANE_COUNT;
        }
        return newLane;
      });
    }, 2500); // Move every 2.5 seconds

    return () => clearInterval(interval);
  }, [gameState]);

  // Spawn attacks from monster's lane
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      // Spawn attacks from monster's current lane
      if (Math.random() < 0.3) {
        attackIdRef.current += 1;
        const chars = ["◆", "★", "●", "◈"];

        setAttacks((a) => [
          ...a,
          {
            id: attackIdRef.current,
            x: ATTACK_LANE_WIDTH,
            lane: monsterLane, // Attack comes from monster's lane
            char: chars[Math.floor(Math.random() * chars.length)],
          },
        ]);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [gameState, monsterLane]);

  // Move attacks and check collisions
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      setAttacks((currentAttacks) => {
        const newAttacks: Attack[] = [];

        for (const attack of currentAttacks) {
          const newX = attack.x - 1;

          // Attack reached player position
          if (newX <= 2) {
            if (attack.lane === playerLane) {
              // Hit!
              setPlayerHealth((h) => {
                const newHealth = h - 15;
                if (newHealth <= 0) {
                  setGameState("gameover");
                  setHighScore((hs) => Math.max(hs, score));
                }
                return Math.max(0, newHealth);
              });
              setHitAnimation(true);
              setTimeout(() => setHitAnimation(false), 200);
            }
            // Either way, remove the attack
            continue;
          }

          newAttacks.push({ ...attack, x: newX });
        }

        return newAttacks;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState, playerLane, score]);

  useKeyboard((e) => {
    if (gameState === "ready" || gameState === "gameover") {
      if (e.name === "enter" || e.name === "return" || e.name === "space") {
        startGame();
      }
      if (e.name === "escape" || e.name === "q") {
        goBack();
      }
      return;
    }

    if (gameState === "playing") {
      if (e.name === "escape") {
        setGameState("gameover");
        setHighScore((h) => Math.max(h, score));
        return;
      }

      // Dodge with vim keys
      if (e.name === "k" || e.name === "up") {
        setPlayerLane((l) => Math.max(0, l - 1));
        return;
      }
      if (e.name === "j" || e.name === "down") {
        setPlayerLane((l) => Math.min(LANE_COUNT - 1, l + 1));
        return;
      }

      // Cast spell with Enter when ready
      if (e.name === "enter" || e.name === "return") {
        if (spellReady) {
          castSpell();
        }
        return;
      }

      // Backspace
      if (e.name === "backspace") {
        setTyped((t) => t.slice(0, -1));
        setSpellReady(false);
        return;
      }

      // Type spell letters (not j/k since those are for dodging)
      if (e.name && e.name.length === 1 && /[a-zA-Z]/.test(e.name) && e.name !== "j" && e.name !== "k") {
        if (!spellReady) {
          setTyped((t) => t + e.name);
        }
      }
    }
  });

  // Build lane content as array of {char, color} for proper emoji handling
  const buildLaneContent = (laneIndex: number) => {
    const content: { char: string; color: string }[] = [];
    const isPlayerLane = laneIndex === playerLane;
    const isMonsterLane = laneIndex === monsterLane;

    // Player position (left side)
    if (isPlayerLane) {
      const playerChar = healAnimation ? "💚" : hitAnimation ? "💔" : "🧙";
      content.push({ char: playerChar, color: "#ce93d8" });
    } else {
      content.push({ char: "  ", color: "#333333" });
    }

    content.push({ char: " ", color: "#333333" });

    // Cast animation in player's lane
    if (castAnimation && isPlayerLane) {
      content.push({ char: "✨", color: "#ffc107" });
      content.push({ char: "═══", color: "#ffc107" });
      content.push({ char: "▸", color: "#ffc107" });
      // Fill rest with animation
      for (let x = 0; x < 25; x++) {
        content.push({ char: "─", color: "#ffc107" });
      }
      content.push({ char: "💥", color: "#ffc107" });
    } else {
      // Attack lane (middle)
      for (let x = 3; x < ATTACK_LANE_WIDTH - 3; x++) {
        const attack = attacks.find((a) => Math.floor(a.x) === x && a.lane === laneIndex);
        if (attack) {
          let color = "#ffc107";
          if (attack.x < 10) color = "#f44336";
          else if (attack.x < 20) color = "#ff9800";
          content.push({ char: attack.char, color });
        } else {
          content.push({ char: "·", color: "#333333" });
        }
      }
    }

    content.push({ char: " ", color: "#333333" });

    // Monster position (right side)
    if (isMonsterLane) {
      const monsterChar = monsterHealth <= 0 ? "💀" : monsterHit ? "💥" : "👹";
      const monsterColor = monsterHit ? "#ffc107" : "#f44336";
      content.push({ char: monsterChar, color: monsterColor });
    } else {
      content.push({ char: "  ", color: "#333333" });
    }

    return content;
  };

  const healthBarWidth = 15;
  const playerHealthFilled = Math.round((playerHealth / 100) * healthBarWidth);
  const monsterMaxHealth = 100 + Math.floor(score / 50) * 20;
  const monsterHealthFilled = Math.round((monsterHealth / monsterMaxHealth) * healthBarWidth);

  const laneLabels = ["↑", "─", "↓"];

  return (
    <box width="100%" height="100%" flexDirection="column" alignItems="center" justifyContent="center">
      <text fg="#9c27b0"><b>◆ SPELL CASTER ◆</b></text>

      {gameState === "ready" && (
        <>
          <text fg="#ce93d8" marginTop={2}>Type spells & dodge attacks!</text>
          <box marginTop={1} flexDirection="column" alignItems="center">
            <text fg="#888888">Type the incantation, then ENTER to cast</text>
            <text fg="#888888">Use j/k to dodge attacks AND aim at the monster</text>
            <text fg="#4fc3f7" marginTop={1}>You must be in the same lane as the monster to hit!</text>
            <text fg="#888888">Spells get harder as you progress...</text>
          </box>
          <text fg="#4caf50" marginTop={3}>Press ENTER to begin</text>
          <text fg="#666666" marginTop={1}>ESC to return</text>
        </>
      )}

      {gameState === "playing" && (
        <>
          {/* Health bars */}
          <box marginTop={1} width={50} flexDirection="row" justifyContent="space-between">
            <box flexDirection="column">
              <text fg="#888888">You</text>
              <box flexDirection="row">
                <text fg={playerHealth < 30 ? "#f44336" : "#4caf50"}>{"█".repeat(playerHealthFilled)}</text>
                <text fg="#333333">{"░".repeat(healthBarWidth - playerHealthFilled)}</text>
              </box>
            </box>
            <box flexDirection="column" alignItems="flex-end">
              <text fg="#888888">Monster</text>
              <box flexDirection="row">
                <text fg="#f44336">{"█".repeat(monsterHealthFilled)}</text>
                <text fg="#333333">{"░".repeat(healthBarWidth - monsterHealthFilled)}</text>
              </box>
            </box>
          </box>

          {/* Battle scene with lanes */}
          <box
            marginTop={1}
            border={true}
            borderStyle="rounded"
            borderColor={hitAnimation ? "#f44336" : healAnimation ? "#4caf50" : "#9c27b0"}
            width={52}
            flexDirection="column"
            paddingLeft={1}
            paddingRight={1}
          >
            {/* Lane labels */}
            <box flexDirection="row" justifyContent="space-between">
              <text fg="#888888">YOU</text>
              <text fg="#f44336">← ATTACKS ←</text>
              <text fg="#888888">MONSTER</text>
            </box>

            {/* Lanes */}
            {[0, 1, 2].map((laneIndex) => (
              <box key={laneIndex} flexDirection="row">
                <text fg={playerLane === laneIndex ? "#4fc3f7" : "#333333"} width={2}>
                  {laneLabels[laneIndex]}
                </text>
                <text>
                  {buildLaneContent(laneIndex).map((item, i) => (
                    <span key={i} fg={item.color}>{item.char}</span>
                  ))}
                </text>
              </box>
            ))}
          </box>

          {/* Spell area */}
          <box marginTop={1} flexDirection="column" alignItems="center">
            <text fg={currentSpell.heal ? "#4caf50" : "#ce93d8"}>
              {currentSpell.heal ? "🩹 " : "⚔️ "}
              <b>{currentSpell.name}</b>{" "}
              <span fg="#888888">
                ({currentSpell.heal ? `+${currentSpell.heal} HP` : `${currentSpell.damage} dmg`})
              </span>
            </text>

            <box
              marginTop={1}
              border={true}
              borderStyle="rounded"
              borderColor={spellReady ? "#4caf50" : currentSpell.heal ? "#4caf50" : "#9c27b0"}
              paddingLeft={2}
              paddingRight={2}
              paddingTop={1}
              paddingBottom={1}
            >
              <text>
                {currentSpell.incantation.split("").map((char, i) => {
                  const typedChar = typed[i];
                  const color = !typedChar
                    ? "#666666"
                    : typedChar.toLowerCase() === char.toLowerCase()
                      ? "#4caf50"
                      : "#f44336";
                  return (
                    <span key={i} fg={color}>
                      {char}
                    </span>
                  );
                })}
              </text>
            </box>

            {spellReady ? (
              <text fg="#4caf50" marginTop={1}>
                <b>✨ SPELL READY! Press ENTER to cast! ✨</b>
              </text>
            ) : (
              <text fg="#888888" marginTop={1}>
                Type: <span fg="#ffffff">{typed || "..."}</span>
              </text>
            )}
          </box>

          <text fg="#9c27b0" marginTop={1}>
            Score: <b>{score}</b>
          </text>
          <text fg="#666666">j/k dodge & aim | Type spell | ENTER cast | ESC quit</text>
        </>
      )}

      {gameState === "gameover" && (
        <>
          <text fg="#f44336" marginTop={2}>YOU HAVE FALLEN!</text>
          <text fg="#ce93d8" marginTop={2}>
            Final Score: <b>{score}</b>
          </text>
          {score >= highScore && score > 0 && <text fg="#ffc107">NEW HIGH SCORE!</text>}
          <text fg="#888888" marginTop={1}>Best: {highScore}</text>
          <text fg="#4caf50" marginTop={3}>Press ENTER to try again</text>
          <text fg="#666666" marginTop={1}>ESC to return</text>
        </>
      )}
    </box>
  );
}
