import React, { useState, useEffect, useCallback, useRef } from "react";
import { useKeyboard } from "@opentui/react";

const GAME_WIDTH = 50;
const GAME_HEIGHT = 12;

interface Position {
  x: number;
  y: number;
}

interface Enemy {
  id: number;
  x: number;
  y: number;
  health: number;
  maxHealth: number;
}

interface Treasure {
  id: number;
  x: number;
  y: number;
  value: number;
  char: string;
}

interface Cannonball {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

interface Upgrades {
  cannonSpeed: number; // Lower = faster
  shipHealth: number;
  moveSpeed: number;
  cannonDamage: number;
  multiShot: boolean;
}

const UPGRADE_COSTS = {
  cannonSpeed: [50, 100, 200, 400],
  shipHealth: [30, 60, 120, 240],
  moveSpeed: [40, 80, 160],
  cannonDamage: [60, 120, 240, 480],
  multiShot: [300],
};

interface PirateGameProps {
  goBack: () => void;
}

export function PirateGame({ goBack }: PirateGameProps) {
  const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready");
  const [shipPos, setShipPos] = useState<Position>({ x: 5, y: Math.floor(GAME_HEIGHT / 2) });
  const [health, setHealth] = useState(100);
  const [maxHealth, setMaxHealth] = useState(100);
  const [gold, setGold] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [wave, setWave] = useState(1);

  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [cannonballs, setCannonballs] = useState<Cannonball[]>([]);
  const [cannonCooldown, setCannonCooldown] = useState(0);
  const [lastDirection, setLastDirection] = useState<Position>({ x: 1, y: 0 });
  const [hitFlash, setHitFlash] = useState(false);
  const [showUpgrades, setShowUpgrades] = useState(false);

  const [upgrades, setUpgrades] = useState<Upgrades>({
    cannonSpeed: 8,
    shipHealth: 100,
    moveSpeed: 1,
    cannonDamage: 25,
    multiShot: false,
  });

  const [upgradeLevels, setUpgradeLevels] = useState({
    cannonSpeed: 0,
    shipHealth: 0,
    moveSpeed: 0,
    cannonDamage: 0,
    multiShot: 0,
  });

  const idRef = useRef(0);

  const startGame = useCallback(() => {
    setGameState("playing");
    setShipPos({ x: 5, y: Math.floor(GAME_HEIGHT / 2) });
    setHealth(100);
    setMaxHealth(100);
    setGold(0);
    setScore(0);
    setWave(1);
    setEnemies([]);
    setTreasures([]);
    setCannonballs([]);
    setCannonCooldown(0);
    setShowUpgrades(false);
    setUpgrades({
      cannonSpeed: 8,
      shipHealth: 100,
      moveSpeed: 1,
      cannonDamage: 25,
      multiShot: false,
    });
    setUpgradeLevels({
      cannonSpeed: 0,
      shipHealth: 0,
      moveSpeed: 0,
      cannonDamage: 0,
      multiShot: 0,
    });
  }, []);

  const fireCanon = useCallback(() => {
    if (cannonCooldown > 0) return;

    idRef.current += 1;
    const newBalls: Cannonball[] = [
      {
        id: idRef.current,
        x: shipPos.x + lastDirection.x,
        y: shipPos.y + lastDirection.y,
        dx: lastDirection.x || 1,
        dy: lastDirection.y,
      },
    ];

    if (upgrades.multiShot) {
      idRef.current += 1;
      newBalls.push({
        id: idRef.current,
        x: shipPos.x + lastDirection.x,
        y: shipPos.y + lastDirection.y - 1,
        dx: lastDirection.x || 1,
        dy: lastDirection.y,
      });
      idRef.current += 1;
      newBalls.push({
        id: idRef.current,
        x: shipPos.x + lastDirection.x,
        y: shipPos.y + lastDirection.y + 1,
        dx: lastDirection.x || 1,
        dy: lastDirection.y,
      });
    }

    setCannonballs((c) => [...c, ...newBalls]);
    setCannonCooldown(upgrades.cannonSpeed);
  }, [cannonCooldown, shipPos, lastDirection, upgrades]);

  const buyUpgrade = useCallback(
    (type: keyof typeof UPGRADE_COSTS) => {
      const level = upgradeLevels[type];
      const costs = UPGRADE_COSTS[type];
      if (level >= costs.length) return;

      const cost = costs[level];
      if (gold < cost) return;

      setGold((g) => g - cost);
      setUpgradeLevels((l) => ({ ...l, [type]: l[type] + 1 }));

      switch (type) {
        case "cannonSpeed":
          setUpgrades((u) => ({ ...u, cannonSpeed: Math.max(2, u.cannonSpeed - 2) }));
          break;
        case "shipHealth":
          setUpgrades((u) => ({ ...u, shipHealth: u.shipHealth + 50 }));
          setMaxHealth((m) => m + 50);
          setHealth((h) => h + 50);
          break;
        case "moveSpeed":
          setUpgrades((u) => ({ ...u, moveSpeed: u.moveSpeed + 1 }));
          break;
        case "cannonDamage":
          setUpgrades((u) => ({ ...u, cannonDamage: u.cannonDamage + 15 }));
          break;
        case "multiShot":
          setUpgrades((u) => ({ ...u, multiShot: true }));
          break;
      }
    },
    [gold, upgradeLevels]
  );

  // Spawn enemies and treasure
  useEffect(() => {
    if (gameState !== "playing" || showUpgrades) return;

    const interval = setInterval(() => {
      // Spawn enemies (less frequent)
      if (Math.random() < 0.08 + wave * 0.01) {
        idRef.current += 1;
        const side = Math.random() < 0.7 ? "right" : Math.random() < 0.5 ? "top" : "bottom";
        let x: number, y: number;
        if (side === "right") {
          x = GAME_WIDTH - 1;
          y = Math.floor(Math.random() * GAME_HEIGHT);
        } else if (side === "top") {
          x = Math.floor(Math.random() * (GAME_WIDTH - 10)) + 10;
          y = 0;
        } else {
          x = Math.floor(Math.random() * (GAME_WIDTH - 10)) + 10;
          y = GAME_HEIGHT - 1;
        }
        const enemyHealth = 30 + wave * 10;
        setEnemies((e) => [...e, { id: idRef.current, x, y, health: enemyHealth, maxHealth: enemyHealth }]);
      }

      // Spawn treasure
      if (Math.random() < 0.25) {
        idRef.current += 1;
        const chars = ["◆", "●", "★"];
        const values = [10, 25, 50];
        const idx = Math.random() < 0.6 ? 0 : Math.random() < 0.8 ? 1 : 2;
        setTreasures((t) => [
          ...t,
          {
            id: idRef.current,
            x: Math.floor(Math.random() * (GAME_WIDTH - 15)) + 10,
            y: Math.floor(Math.random() * GAME_HEIGHT),
            value: values[idx],
            char: chars[idx],
          },
        ]);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [gameState, wave, showUpgrades]);

  // Game tick - movement, collisions
  useEffect(() => {
    if (gameState !== "playing" || showUpgrades) return;

    const interval = setInterval(() => {
      // Move enemies toward player (slower - only 30% chance to move each tick)
      setEnemies((currentEnemies) =>
        currentEnemies.map((enemy) => {
          // Enemies only move 30% of the time
          if (Math.random() > 0.3) return enemy;

          const dx = shipPos.x - enemy.x;
          const dy = shipPos.y - enemy.y;
          const moveX = dx !== 0 ? Math.sign(dx) : 0;
          const moveY = dy !== 0 ? Math.sign(dy) : 0;

          // Randomly choose to move X or Y
          if (Math.random() < 0.5 && moveX !== 0) {
            return { ...enemy, x: enemy.x + moveX };
          } else if (moveY !== 0) {
            return { ...enemy, y: enemy.y + moveY };
          }
          return { ...enemy, x: enemy.x + moveX };
        })
      );

      // Move cannonballs
      setCannonballs((balls) =>
        balls
          .map((b) => ({ ...b, x: b.x + b.dx * 2, y: b.y + b.dy }))
          .filter((b) => b.x >= 0 && b.x < GAME_WIDTH && b.y >= 0 && b.y < GAME_HEIGHT)
      );

      // Cooldown
      setCannonCooldown((c) => Math.max(0, c - 1));

      // Check cannonball hits
      setCannonballs((balls) => {
        const remainingBalls: Cannonball[] = [];

        for (const ball of balls) {
          let hit = false;
          setEnemies((enemies) => {
            return enemies
              .map((enemy) => {
                if (Math.abs(enemy.x - ball.x) <= 1 && Math.abs(enemy.y - ball.y) <= 1) {
                  hit = true;
                  const newHealth = enemy.health - upgrades.cannonDamage;
                  if (newHealth <= 0) {
                    setScore((s) => s + 10);
                    setGold((g) => g + 8 + Math.floor(wave * 3));
                    return null;
                  }
                  return { ...enemy, health: newHealth };
                }
                return enemy;
              })
              .filter((e): e is Enemy => e !== null);
          });

          if (!hit) {
            remainingBalls.push(ball);
          }
        }
        return remainingBalls;
      });

      // Check enemy collision with player
      setEnemies((enemies) => {
        for (const enemy of enemies) {
          if (Math.abs(enemy.x - shipPos.x) <= 1 && Math.abs(enemy.y - shipPos.y) <= 1) {
            setHealth((h) => {
              const newHealth = h - 15;
              if (newHealth <= 0) {
                setGameState("gameover");
                setHighScore((hs) => Math.max(hs, score));
              }
              return Math.max(0, newHealth);
            });
            setHitFlash(true);
            setTimeout(() => setHitFlash(false), 100);
            // Remove the enemy that hit
            return enemies.filter((e) => e.id !== enemy.id);
          }
        }
        return enemies;
      });

      // Check treasure collection (larger pickup radius)
      setTreasures((treasures) => {
        const remaining: Treasure[] = [];
        for (const t of treasures) {
          if (Math.abs(t.x - shipPos.x) <= 3 && Math.abs(t.y - shipPos.y) <= 2) {
            setGold((g) => g + t.value);
            setScore((s) => s + t.value);
          } else {
            remaining.push(t);
          }
        }
        return remaining;
      });

      // Wave progression
      setScore((s) => {
        if (s > 0 && s % 200 === 0) {
          setWave((w) => w + 1);
        }
        return s;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [gameState, shipPos, upgrades, score, showUpgrades]);

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

      // Toggle upgrades menu
      if (e.name === "u") {
        setShowUpgrades((s) => !s);
        return;
      }

      // Upgrades hotkeys
      if (e.name === "1") {
        buyUpgrade("cannonSpeed");
        return;
      }
      if (e.name === "2") {
        buyUpgrade("shipHealth");
        return;
      }
      if (e.name === "3") {
        buyUpgrade("moveSpeed");
        return;
      }
      if (e.name === "4") {
        buyUpgrade("cannonDamage");
        return;
      }
      if (e.name === "5") {
        buyUpgrade("multiShot");
        return;
      }

      // Fire cannon
      if (e.name === "f" || e.name === "space") {
        fireCanon();
        return;
      }

      // Movement
      const speed = upgrades.moveSpeed;
      switch (e.name) {
        case "h":
        case "left":
          setShipPos((p) => ({ ...p, x: Math.max(0, p.x - speed) }));
          setLastDirection({ x: -1, y: 0 });
          break;
        case "j":
        case "down":
          setShipPos((p) => ({ ...p, y: Math.min(GAME_HEIGHT - 1, p.y + speed) }));
          setLastDirection({ x: 0, y: 1 });
          break;
        case "k":
        case "up":
          setShipPos((p) => ({ ...p, y: Math.max(0, p.y - speed) }));
          setLastDirection({ x: 0, y: -1 });
          break;
        case "l":
        case "right":
          setShipPos((p) => ({ ...p, x: Math.min(GAME_WIDTH - 1, p.x + speed) }));
          setLastDirection({ x: 1, y: 0 });
          break;
      }
    }
  });

  // Render the game grid
  const renderGrid = () => {
    const lines: string[] = [];
    for (let y = 0; y < GAME_HEIGHT; y++) {
      let line = "";
      for (let x = 0; x < GAME_WIDTH; x++) {
        // Player ship
        if (x === shipPos.x && y === shipPos.y) {
          line += "⛵";
          continue;
        }

        // Cannonballs (bright and visible)
        const ball = cannonballs.find((b) => Math.floor(b.x) === x && Math.floor(b.y) === y);
        if (ball) {
          line += "○";
          continue;
        }

        // Enemies
        const enemy = enemies.find((e) => e.x === x && e.y === y);
        if (enemy) {
          line += "☠";
          continue;
        }

        // Treasure
        const treasure = treasures.find((t) => t.x === x && t.y === y);
        if (treasure) {
          line += treasure.char;
          continue;
        }

        // Water
        line += Math.random() < 0.02 ? "~" : " ";
      }
      lines.push(line);
    }
    return lines;
  };

  const healthPercent = Math.round((health / maxHealth) * 100);
  const healthBarWidth = 20;
  const healthFilled = Math.round((health / maxHealth) * healthBarWidth);

  const getUpgradeCost = (type: keyof typeof UPGRADE_COSTS) => {
    const level = upgradeLevels[type];
    const costs = UPGRADE_COSTS[type];
    return level < costs.length ? costs[level] : null;
  };

  return (
    <box width="100%" height="100%" flexDirection="column" alignItems="center" justifyContent="center">
      <text fg="#f44336">
        <b>† PIRATE ROGUELIKE †</b>
      </text>

      {gameState === "ready" && (
        <>
          <text fg="#ff9800" marginTop={2}>
            Collect treasure, sink enemy ships, upgrade your vessel!
          </text>
          <box marginTop={1} flexDirection="column" alignItems="center">
            <text fg="#888888">hjkl/arrows - Sail</text>
            <text fg="#888888">f/SPACE - Fire cannon</text>
            <text fg="#888888">1-5 - Buy upgrades</text>
            <text fg="#888888">u - Toggle upgrade menu</text>
          </box>
          <text fg="#4caf50" marginTop={3}>
            Press ENTER to set sail!
          </text>
          <text fg="#666666" marginTop={1}>
            ESC to return to port
          </text>
        </>
      )}

      {gameState === "playing" && (
        <>
          {/* Status bar */}
          <box marginTop={1} width={54} flexDirection="row" justifyContent="space-between">
            <box flexDirection="row" gap={1}>
              <text fg="#f44336">♥</text>
              <text fg="#4caf50">{"█".repeat(healthFilled)}</text>
              <text fg="#333333">{"░".repeat(healthBarWidth - healthFilled)}</text>
              <text fg="#888888">{healthPercent}%</text>
            </box>
            <text fg="#ffc107">
              ◆ <b>{gold}</b>
            </text>
          </box>

          <box width={54} flexDirection="row" justifyContent="space-between">
            <text fg="#888888">
              Wave: <span fg="#ff9800">{wave}</span>
            </text>
            <text fg="#888888">
              Score: <span fg="#ffffff">{score}</span>
            </text>
          </box>

          {/* Game area */}
          <box
            marginTop={1}
            border={true}
            borderStyle="rounded"
            borderColor={hitFlash ? "#f44336" : "#ff9800"}
            flexDirection="column"
          >
            {renderGrid().map((line, i) => (
              <text key={i}>
                {line.split("").map((char, j) => {
                  let color = "#1a237e"; // water
                  if (char === "⛵") color = "#4fc3f7";
                  else if (char === "☠") color = "#f44336";
                  else if (char === "○") color = "#ffeb3b"; // Bright yellow cannonballs
                  else if (char === "◆") color = "#ffc107";
                  else if (char === "●") color = "#ff9800";
                  else if (char === "★") color = "#ffeb3b";
                  else if (char === "~") color = "#1565c0";
                  return (
                    <span key={j} fg={color}>
                      {char}
                    </span>
                  );
                })}
              </text>
            ))}
          </box>

          {/* Upgrades panel */}
          <box marginTop={1} width={54} flexDirection="column">
            <text fg="#888888">
              Upgrades (1-5): <span fg="#666666">u to {showUpgrades ? "hide" : "show"}</span>
              {showUpgrades && <span fg="#ffc107"> ⏸ PAUSED</span>}
            </text>
            {showUpgrades && (
              <box flexDirection="column" marginTop={1}>
                <text fg={getUpgradeCost("cannonSpeed") && gold >= getUpgradeCost("cannonSpeed")! ? "#4caf50" : "#666666"}>
                  [1] Faster Cannon{" "}
                  {getUpgradeCost("cannonSpeed") ? (
                    <span fg="#ffc107">{getUpgradeCost("cannonSpeed")}g</span>
                  ) : (
                    <span fg="#888888">MAX</span>
                  )}
                </text>
                <text fg={getUpgradeCost("shipHealth") && gold >= getUpgradeCost("shipHealth")! ? "#4caf50" : "#666666"}>
                  [2] Hull Armor +50HP{" "}
                  {getUpgradeCost("shipHealth") ? (
                    <span fg="#ffc107">{getUpgradeCost("shipHealth")}g</span>
                  ) : (
                    <span fg="#888888">MAX</span>
                  )}
                </text>
                <text fg={getUpgradeCost("moveSpeed") && gold >= getUpgradeCost("moveSpeed")! ? "#4caf50" : "#666666"}>
                  [3] Sail Speed{" "}
                  {getUpgradeCost("moveSpeed") ? (
                    <span fg="#ffc107">{getUpgradeCost("moveSpeed")}g</span>
                  ) : (
                    <span fg="#888888">MAX</span>
                  )}
                </text>
                <text fg={getUpgradeCost("cannonDamage") && gold >= getUpgradeCost("cannonDamage")! ? "#4caf50" : "#666666"}>
                  [4] Cannon Power{" "}
                  {getUpgradeCost("cannonDamage") ? (
                    <span fg="#ffc107">{getUpgradeCost("cannonDamage")}g</span>
                  ) : (
                    <span fg="#888888">MAX</span>
                  )}
                </text>
                <text fg={getUpgradeCost("multiShot") && gold >= getUpgradeCost("multiShot")! ? "#4caf50" : "#666666"}>
                  [5] Triple Shot{" "}
                  {getUpgradeCost("multiShot") ? (
                    <span fg="#ffc107">{getUpgradeCost("multiShot")}g</span>
                  ) : (
                    <span fg="#888888">OWNED</span>
                  )}
                </text>
              </box>
            )}
          </box>

          <text fg="#666666" marginTop={1}>
            hjkl move | f/SPACE fire | 1-5 upgrade | ESC quit
          </text>
        </>
      )}

      {gameState === "gameover" && (
        <>
          <text fg="#f44336" marginTop={2}>
            YE SHIP HAS SUNK!
          </text>
          <text fg="#ff9800" marginTop={2}>
            Final Score: <b>{score}</b>
          </text>
          <text fg="#ffc107">
            Gold Collected: <b>{gold}</b>
          </text>
          <text fg="#888888">
            Waves Survived: <b>{wave}</b>
          </text>
          {score >= highScore && score > 0 && <text fg="#ffc107">NEW HIGH SCORE!</text>}
          <text fg="#888888" marginTop={1}>
            Best: {highScore}
          </text>
          <text fg="#4caf50" marginTop={3}>
            Press ENTER to sail again
          </text>
          <text fg="#666666" marginTop={1}>
            ESC to return to port
          </text>
        </>
      )}
    </box>
  );
}
