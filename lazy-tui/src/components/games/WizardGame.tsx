import React, { useState, useEffect, useCallback, useRef } from "react";
import { useKeyboard } from "@opentui/react";

interface Spell {
  name: string;
  incantation: string;
  damage: number;
  heal?: number;
}

const ATTACK_SPELLS: Spell[] = [
  { name: "Fireball", incantation: "ignis", damage: 20 },
  { name: "Lightning", incantation: "fulgur", damage: 25 },
  { name: "Ice Shard", incantation: "glacius", damage: 15 },
  { name: "Arcane Bolt", incantation: "arcanum", damage: 30 },
  { name: "Shadow Strike", incantation: "umbra", damage: 22 },
];

const HEAL_SPELLS: Spell[] = [
  { name: "Heal", incantation: "sana", damage: 0, heal: 25 },
  { name: "Restore", incantation: "vitae", damage: 0, heal: 40 },
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
  const [currentSpell, setCurrentSpell] = useState<Spell>(ATTACK_SPELLS[0]);
  const [typed, setTyped] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Combat state
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [playerLane, setPlayerLane] = useState(1); // 0, 1, or 2 (middle)
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
      const next = ATTACK_SPELLS[Math.floor(Math.random() * ATTACK_SPELLS.length)];
      setCurrentSpell(next);
    }
    setTyped("");
    setSpellReady(false);
  }, [playerHealth]);

  const startGame = useCallback(() => {
    setGameState("playing");
    setScore(0);
    setTyped("");
    setPlayerHealth(100);
    setMonsterHealth(100);
    setPlayerLane(1);
    setAttacks([]);
    setCastAnimation(null);
    setSpellReady(false);
    nextSpell();
  }, [nextSpell]);

  const castSpell = useCallback(() => {
    if (!spellReady) return;

    // Heal spell
    if (currentSpell.heal) {
      setHealAnimation(true);
      setTimeout(() => setHealAnimation(false), 500);
      setPlayerHealth((h) => Math.min(100, h + currentSpell.heal!));
      setScore((s) => s + 5);
      nextSpell();
      return;
    }

    // Attack spell
    setCastAnimation(currentSpell.name);
    setTimeout(() => setCastAnimation(null), 600);

    setMonsterHit(true);
    setTimeout(() => setMonsterHit(false), 300);

    setMonsterHealth((h) => {
      const newHealth = h - currentSpell.damage;
      if (newHealth <= 0) {
        setScore((s) => s + 100);
        setTimeout(() => {
          setMonsterHealth(100 + Math.floor(score / 50) * 20);
          nextSpell();
        }, 600);
        return 0;
      }
      setScore((s) => s + 10);
      nextSpell();
      return newHealth;
    });
  }, [spellReady, currentSpell, nextSpell, score]);

  // Check if spell is complete
  useEffect(() => {
    if (gameState !== "playing") return;
    if (typed.toLowerCase() === currentSpell.incantation.toLowerCase()) {
      setSpellReady(true);
    }
  }, [typed, currentSpell, gameState]);

  // Spawn attacks (targets player's lane)
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      // Spawn attacks - aims at player!
      if (Math.random() < 0.25) {
        attackIdRef.current += 1;
        const chars = ["◆", "★", "●", "◈"];

        // 70% chance to target player's current lane, 30% random
        let targetLane: number;
        if (Math.random() < 0.7) {
          targetLane = playerLane;
        } else {
          targetLane = Math.floor(Math.random() * LANE_COUNT);
        }

        setAttacks((a) => [
          ...a,
          {
            id: attackIdRef.current,
            x: ATTACK_LANE_WIDTH,
            lane: targetLane,
            char: chars[Math.floor(Math.random() * chars.length)],
          },
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, playerLane]);

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

  // Render a lane with attacks
  const renderLane = (laneIndex: number) => {
    let lane = "";
    const isPlayerLane = laneIndex === playerLane;

    // Player position
    if (isPlayerLane) {
      lane += healAnimation ? "💚" : hitAnimation ? "💔" : "🧙";
    } else {
      lane += "  ";
    }

    lane += " ";

    // Attack lane
    for (let x = 3; x < ATTACK_LANE_WIDTH; x++) {
      const attack = attacks.find((a) => Math.floor(a.x) === x && a.lane === laneIndex);
      if (attack) {
        lane += attack.char;
      } else {
        lane += "·";
      }
    }

    return lane;
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
            <text fg="#888888">Use j/k or ↑/↓ to dodge incoming attacks</text>
            <text fg="#4fc3f7" marginTop={1}>Watch for heal spells when low on health!</text>
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
              <text fg={monsterHit ? "#ffc107" : "#f44336"}>{monsterHealth <= 0 ? "💀" : "👹"}</text>
            </box>

            {/* Lanes */}
            {[0, 1, 2].map((laneIndex) => (
              <box key={laneIndex} flexDirection="row">
                <text fg={playerLane === laneIndex ? "#4fc3f7" : "#333333"} width={2}>
                  {laneLabels[laneIndex]}
                </text>
                <text>
                  {renderLane(laneIndex).split("").map((char, i) => {
                    let color = "#333333";
                    if (char === "🧙" || char === "💚" || char === "💔") color = "#ce93d8";
                    else if (char === "◆" || char === "★" || char === "●" || char === "◈") {
                      const attack = attacks.find((a) => a.lane === laneIndex && Math.floor(a.x) === i);
                      if (attack) {
                        if (attack.x < 10) color = "#f44336";
                        else if (attack.x < 20) color = "#ff9800";
                        else color = "#ffc107";
                      }
                    }
                    return <span key={i} fg={color}>{char}</span>;
                  })}
                </text>
              </box>
            ))}

            {/* Cast animation */}
            {castAnimation && (
              <text fg="#ffc107" marginTop={1}>
                ✨ {castAnimation.toUpperCase()}! ───────────────────▸ 💥
              </text>
            )}
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
          <text fg="#666666">j/k dodge | Type spell | ENTER cast | ESC quit</text>
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
