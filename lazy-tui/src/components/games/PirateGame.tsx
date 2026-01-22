import React, { useState, useEffect, useCallback, useRef } from "react";
import { useKeyboard } from "@opentui/react";

const GAME_WIDTH = 50;
const GAME_HEIGHT = 14;

interface Position {
  x: number;
  y: number;
}

interface Enemy {
  id: number;
  x: number;
  y: number;
  health: number;
  type: "skeleton" | "ghost" | "kraken";
  speed: number;
}

interface XPGem {
  id: number;
  x: number;
  y: number;
  value: number;
}

interface Projectile {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  damage: number;
  type: "cannonball" | "anchor" | "bottle" | "lightning";
  pierce: number; // How many enemies it can hit
}

interface HitEffect {
  id: number;
  x: number;
  y: number;
  ttl: number; // Time to live (frames)
}

interface Weapon {
  type: "cannon" | "anchor" | "bottles" | "lightning";
  level: number;
  cooldown: number;
  currentCooldown: number;
}

interface UpgradeOption {
  type:
    | "cannon"
    | "anchor"
    | "bottles"
    | "lightning"
    | "speed"
    | "health"
    | "magnet"
    | "armor";
  name: string;
  description: string;
  isNew?: boolean;
}

const WEAPON_STATS = {
  cannon: {
    name: "Cannon",
    baseDamage: 15,
    baseCooldown: 12,
    baseProjectiles: 1,
  },
  anchor: {
    name: "Anchor Toss",
    baseDamage: 25,
    baseCooldown: 20,
    baseProjectiles: 1,
  },
  bottles: {
    name: "Rum Bottles",
    baseDamage: 8,
    baseCooldown: 8,
    baseProjectiles: 3,
  },
  lightning: {
    name: "Storm",
    baseDamage: 20,
    baseCooldown: 25,
    baseProjectiles: 1,
  },
};

interface PirateGameProps {
  goBack: () => void;
}

export function PirateGame({ goBack }: PirateGameProps) {
  const [gameState, setGameState] = useState<
    "ready" | "playing" | "levelup" | "gameover"
  >("ready");
  const [shipPos, setShipPos] = useState<Position>({
    x: Math.floor(GAME_WIDTH / 2),
    y: Math.floor(GAME_HEIGHT / 2),
  });
  const [health, setHealth] = useState(100);
  const [maxHealth, setMaxHealth] = useState(100);
  const [armor, setArmor] = useState(0);

  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [xpToLevel, setXpToLevel] = useState(20);

  const [survivalTime, setSurvivalTime] = useState(0);
  const [kills, setKills] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [xpGems, setXpGems] = useState<XPGem[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);
  const [hitFlash, setHitFlash] = useState(false);

  // Pre-computed water pattern (doesn't change every frame)
  const waterPattern = useRef<boolean[][]>(
    Array.from({ length: GAME_HEIGHT }, () =>
      Array.from({ length: GAME_WIDTH }, () => Math.random() < 0.03),
    ),
  );

  const [weapons, setWeapons] = useState<Weapon[]>([
    { type: "cannon", level: 1, cooldown: 12, currentCooldown: 0 },
  ]);
  const [moveSpeed, setMoveSpeed] = useState(1);
  const [magnetRange, setMagnetRange] = useState(3);

  const [upgradeOptions, setUpgradeOptions] = useState<UpgradeOption[]>([]);
  const [selectedUpgrade, setSelectedUpgrade] = useState(0);

  const idRef = useRef(0);

  const startGame = useCallback(() => {
    setGameState("playing");
    setShipPos({
      x: Math.floor(GAME_WIDTH / 2),
      y: Math.floor(GAME_HEIGHT / 2),
    });
    setHealth(100);
    setMaxHealth(100);
    setArmor(0);
    setXp(0);
    setLevel(1);
    setXpToLevel(20);
    setSurvivalTime(0);
    setKills(0);
    setEnemies([]);
    setXpGems([]);
    setProjectiles([]);
    setHitEffects([]);
    // Regenerate water pattern for new game
    waterPattern.current = Array.from({ length: GAME_HEIGHT }, () =>
      Array.from({ length: GAME_WIDTH }, () => Math.random() < 0.03),
    );
    setWeapons([
      { type: "cannon", level: 1, cooldown: 12, currentCooldown: 0 },
    ]);
    setMoveSpeed(1);
    setMagnetRange(3);
  }, []);

  // Find nearest enemy for targeting
  const findNearestEnemy = useCallback(
    (pos: Position): Enemy | null => {
      let nearest: Enemy | null = null;
      let nearestDist = Infinity;

      for (const enemy of enemies) {
        const dist = Math.sqrt(
          Math.pow(enemy.x - pos.x, 2) + Math.pow(enemy.y - pos.y, 2),
        );
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = enemy;
        }
      }
      return nearest;
    },
    [enemies],
  );

  // Fire weapons automatically
  const fireWeapon = useCallback(
    (weapon: Weapon) => {
      const stats = WEAPON_STATS[weapon.type];
      const damage = stats.baseDamage + (weapon.level - 1) * 5;
      const projectileCount =
        stats.baseProjectiles + Math.floor((weapon.level - 1) / 2);

      const nearest = findNearestEnemy(shipPos);
      if (!nearest && weapon.type !== "bottles") return; // Need target for most weapons

      switch (weapon.type) {
        case "cannon": {
          // Fire at nearest enemy
          if (nearest) {
            const dx = nearest.x - shipPos.x;
            const dy = nearest.y - shipPos.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;

            for (let i = 0; i < projectileCount; i++) {
              idRef.current += 1;
              const spread = (i - (projectileCount - 1) / 2) * 0.3;
              setProjectiles((p) => [
                ...p,
                {
                  id: idRef.current,
                  x: shipPos.x,
                  y: shipPos.y,
                  dx: dx / dist + spread * (dy / dist),
                  dy: dy / dist - spread * (dx / dist),
                  damage,
                  type: "cannonball",
                  pierce: Math.floor(weapon.level / 3),
                },
              ]);
            }
          }
          break;
        }

        case "anchor": {
          // Heavy projectile that pierces
          if (nearest) {
            const dx = nearest.x - shipPos.x;
            const dy = nearest.y - shipPos.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;

            idRef.current += 1;
            setProjectiles((p) => [
              ...p,
              {
                id: idRef.current,
                x: shipPos.x,
                y: shipPos.y,
                dx: dx / dist,
                dy: dy / dist,
                damage,
                type: "anchor",
                pierce: 3 + weapon.level,
              },
            ]);
          }
          break;
        }

        case "bottles": {
          // Fire in random directions
          for (let i = 0; i < projectileCount; i++) {
            idRef.current += 1;
            const angle = Math.random() * Math.PI * 2;
            setProjectiles((p) => [
              ...p,
              {
                id: idRef.current,
                x: shipPos.x,
                y: shipPos.y,
                dx: Math.cos(angle),
                dy: Math.sin(angle),
                damage,
                type: "bottle",
                pierce: 0,
              },
            ]);
          }
          break;
        }

        case "lightning": {
          // Hit random enemies instantly
          const targets = enemies.slice(0, 2 + weapon.level);
          for (const target of targets) {
            setEnemies((es) =>
              es
                .map((e) => {
                  if (e.id === target.id) {
                    const newHealth = e.health - damage;
                    if (newHealth <= 0) {
                      // Drop XP
                      idRef.current += 1;
                      setXpGems((gems) => [
                        ...gems,
                        {
                          id: idRef.current,
                          x: e.x,
                          y: e.y,
                          value:
                            e.type === "kraken"
                              ? 15
                              : e.type === "ghost"
                                ? 8
                                : 5,
                        },
                      ]);
                      setKills((k) => k + 1);
                      return null;
                    }
                    return { ...e, health: newHealth };
                  }
                  return e;
                })
                .filter((e): e is Enemy => e !== null),
            );
          }
          break;
        }
      }
    },
    [shipPos, enemies, findNearestEnemy],
  );

  // Generate upgrade options
  const generateUpgradeOptions = useCallback(() => {
    const allOptions: UpgradeOption[] = [];

    // Existing weapons can level up
    for (const weapon of weapons) {
      if (weapon.level < 8) {
        allOptions.push({
          type: weapon.type,
          name: `${WEAPON_STATS[weapon.type].name} +`,
          description: `Lv${weapon.level} → ${weapon.level + 1}`,
        });
      }
    }

    // New weapons
    const weaponTypes: ("cannon" | "anchor" | "bottles" | "lightning")[] = [
      "cannon",
      "anchor",
      "bottles",
      "lightning",
    ];
    for (const type of weaponTypes) {
      if (!weapons.find((w) => w.type === type)) {
        allOptions.push({
          type,
          name: WEAPON_STATS[type].name,
          description: "New weapon!",
          isNew: true,
        });
      }
    }

    // Passive upgrades
    allOptions.push({
      type: "speed",
      name: "Swift Sails",
      description: "+1 Move Speed",
    });
    allOptions.push({
      type: "health",
      name: "Hull Repair",
      description: "+25 Max HP, heal",
    });
    allOptions.push({
      type: "magnet",
      name: "Treasure Sense",
      description: "+2 Pickup Range",
    });
    allOptions.push({
      type: "armor",
      name: "Iron Hull",
      description: "+1 Armor",
    });

    // Pick 3 random options
    const shuffled = allOptions.sort(() => Math.random() - 0.5);
    setUpgradeOptions(shuffled.slice(0, 3));
    setSelectedUpgrade(0);
  }, [weapons]);

  // Apply upgrade
  const applyUpgrade = useCallback(
    (option: UpgradeOption) => {
      switch (option.type) {
        case "cannon":
        case "anchor":
        case "bottles":
        case "lightning": {
          const existing = weapons.find((w) => w.type === option.type);
          if (existing) {
            setWeapons((ws) =>
              ws.map((w) =>
                w.type === option.type
                  ? {
                      ...w,
                      level: w.level + 1,
                      cooldown: Math.max(4, w.cooldown - 1),
                    }
                  : w,
              ),
            );
          } else {
            setWeapons((ws) => [
              ...ws,
              {
                type: option.type,
                level: 1,
                cooldown: WEAPON_STATS[option.type].baseCooldown,
                currentCooldown: 0,
              },
            ]);
          }
          break;
        }
        case "speed":
          setMoveSpeed((s) => s + 1);
          break;
        case "health":
          setMaxHealth((m) => m + 25);
          setHealth((h) => Math.min(h + 50, maxHealth + 25));
          break;
        case "magnet":
          setMagnetRange((r) => r + 2);
          break;
        case "armor":
          setArmor((a) => a + 1);
          break;
      }

      setXpToLevel((x) => Math.floor(x * 1.5));
      setGameState("playing");
    },
    [weapons, maxHealth],
  );

  // Check for level up
  useEffect(() => {
    if (gameState !== "playing") return;

    if (xp >= xpToLevel) {
      setXp((x) => x - xpToLevel);
      setLevel((l) => l + 1);
      generateUpgradeOptions();
      setGameState("levelup");
    }
  }, [xp, xpToLevel, gameState, generateUpgradeOptions]);

  // Survival timer
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      setSurvivalTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  // Spawn enemies
  useEffect(() => {
    if (gameState !== "playing") return;

    // Spawn rate increases with time
    const spawnInterval = Math.max(200, 600 - survivalTime * 5);

    const interval = setInterval(() => {
      // More enemies spawn as time goes on
      const spawnCount = 1 + Math.floor(survivalTime / 30);

      for (let i = 0; i < spawnCount; i++) {
        if (enemies.length >= 50) break; // Cap enemies

        idRef.current += 1;

        // Spawn from edges
        const side = Math.floor(Math.random() * 4);
        let x: number, y: number;
        switch (side) {
          case 0: // Top
            x = Math.floor(Math.random() * GAME_WIDTH);
            y = 0;
            break;
          case 1: // Right
            x = GAME_WIDTH - 1;
            y = Math.floor(Math.random() * GAME_HEIGHT);
            break;
          case 2: // Bottom
            x = Math.floor(Math.random() * GAME_WIDTH);
            y = GAME_HEIGHT - 1;
            break;
          default: // Left
            x = 0;
            y = Math.floor(Math.random() * GAME_HEIGHT);
        }

        // Enemy type based on time
        let type: "skeleton" | "ghost" | "kraken" = "skeleton";
        let health = 20 + Math.floor(survivalTime / 20) * 5;
        let speed = 0.3;

        if (survivalTime > 30 && Math.random() < 0.3) {
          type = "ghost";
          health = 15 + Math.floor(survivalTime / 20) * 3;
          speed = 0.5;
        }
        if (survivalTime > 60 && Math.random() < 0.15) {
          type = "kraken";
          health = 60 + Math.floor(survivalTime / 20) * 10;
          speed = 0.2;
        }

        setEnemies((e) => [
          ...e,
          { id: idRef.current, x, y, health, type, speed },
        ]);
      }
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [gameState, survivalTime, enemies.length]);

  // Main game tick
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      // Move enemies toward player
      setEnemies((currentEnemies) =>
        currentEnemies.map((enemy) => {
          const dx = shipPos.x - enemy.x;
          const dy = shipPos.y - enemy.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          return {
            ...enemy,
            x: enemy.x + (dx / dist) * enemy.speed,
            y: enemy.y + (dy / dist) * enemy.speed,
          };
        }),
      );

      // Move projectiles (slower for visibility)
      setProjectiles((projs) =>
        projs
          .map((p) => ({ ...p, x: p.x + p.dx * 0.8, y: p.y + p.dy * 0.5 }))
          .filter(
            (p) =>
              p.x >= -2 &&
              p.x < GAME_WIDTH + 2 &&
              p.y >= -2 &&
              p.y < GAME_HEIGHT + 2,
          ),
      );

      // Decay hit effects
      setHitEffects((effects) =>
        effects.map((e) => ({ ...e, ttl: e.ttl - 1 })).filter((e) => e.ttl > 0),
      );

      // Check projectile hits
      setProjectiles((projs) => {
        const remaining: Projectile[] = [];

        for (const proj of projs) {
          let hitCount = 0;

          setEnemies((enemies) => {
            return enemies
              .map((enemy) => {
                if (hitCount > proj.pierce) return enemy;

                const dist = Math.sqrt(
                  Math.pow(enemy.x - proj.x, 2) + Math.pow(enemy.y - proj.y, 2),
                );
                if (dist < 1.5) {
                  hitCount++;
                  // Add hit effect at impact point
                  idRef.current += 1;
                  setHitEffects((effects) => [
                    ...effects,
                    { id: idRef.current, x: enemy.x, y: enemy.y, ttl: 4 },
                  ]);

                  const newHealth = enemy.health - proj.damage;
                  if (newHealth <= 0) {
                    // Drop XP gem
                    idRef.current += 1;
                    const gemValue =
                      enemy.type === "kraken"
                        ? 15
                        : enemy.type === "ghost"
                          ? 8
                          : 5;
                    setXpGems((gems) => [
                      ...gems,
                      {
                        id: idRef.current,
                        x: enemy.x,
                        y: enemy.y,
                        value: gemValue,
                      },
                    ]);
                    setKills((k) => k + 1);
                    return null;
                  }
                  return { ...enemy, health: newHealth };
                }
                return enemy;
              })
              .filter((e): e is Enemy => e !== null);
          });

          if (hitCount === 0 || hitCount <= proj.pierce) {
            remaining.push(proj);
          }
        }
        return remaining;
      });

      // Check enemy collision with player
      setEnemies((enemies) => {
        const remaining: Enemy[] = [];
        for (const enemy of enemies) {
          const dist = Math.sqrt(
            Math.pow(enemy.x - shipPos.x, 2) + Math.pow(enemy.y - shipPos.y, 2),
          );
          if (dist < 1.5) {
            const damage = Math.max(
              1,
              (enemy.type === "kraken"
                ? 25
                : enemy.type === "ghost"
                  ? 15
                  : 10) - armor,
            );
            setHealth((h) => {
              const newHealth = h - damage;
              if (newHealth <= 0) {
                setGameState("gameover");
                setHighScore((hs) => Math.max(hs, survivalTime));
              }
              return Math.max(0, newHealth);
            });
            setHitFlash(true);
            setTimeout(() => setHitFlash(false), 100);
          } else {
            remaining.push(enemy);
          }
        }
        return remaining;
      });

      // Collect XP gems (magnetic)
      setXpGems((gems) => {
        const remaining: XPGem[] = [];
        for (const gem of gems) {
          const dist = Math.sqrt(
            Math.pow(gem.x - shipPos.x, 2) + Math.pow(gem.y - shipPos.y, 2),
          );
          if (dist < magnetRange) {
            setXp((x) => x + gem.value);
          } else {
            remaining.push(gem);
          }
        }
        return remaining;
      });

      // Fire weapons
      setWeapons((ws) =>
        ws.map((w) => {
          if (w.currentCooldown <= 0) {
            fireWeapon(w);
            return { ...w, currentCooldown: w.cooldown };
          }
          return { ...w, currentCooldown: w.currentCooldown - 1 };
        }),
      );
    }, 100);

    return () => clearInterval(interval);
  }, [gameState, shipPos, magnetRange, armor, survivalTime, fireWeapon]);

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

    if (gameState === "levelup") {
      if (e.name === "k" || e.name === "up") {
        setSelectedUpgrade((s) => Math.max(0, s - 1));
      }
      if (e.name === "j" || e.name === "down") {
        setSelectedUpgrade((s) => Math.min(upgradeOptions.length - 1, s + 1));
      }
      if (e.name === "enter" || e.name === "return" || e.name === "space") {
        applyUpgrade(upgradeOptions[selectedUpgrade]);
      }
      return;
    }

    if (gameState === "playing") {
      if (e.name === "escape") {
        setGameState("gameover");
        setHighScore((h) => Math.max(h, survivalTime));
        return;
      }

      // Movement
      const speed = moveSpeed;
      switch (e.name) {
        case "h":
        case "left":
          setShipPos((p) => ({ ...p, x: Math.max(1, p.x - speed) }));
          break;
        case "j":
        case "down":
          setShipPos((p) => ({
            ...p,
            y: Math.min(GAME_HEIGHT - 2, p.y + speed),
          }));
          break;
        case "k":
        case "up":
          setShipPos((p) => ({ ...p, y: Math.max(1, p.y - speed) }));
          break;
        case "l":
        case "right":
          setShipPos((p) => ({
            ...p,
            x: Math.min(GAME_WIDTH - 2, p.x + speed),
          }));
          break;
      }
    }
  });

  // Render the game grid
  const renderGrid = () => {
    const lines: React.ReactNode[] = [];

    for (let y = 0; y < GAME_HEIGHT; y++) {
      const chars: React.ReactNode[] = [];

      for (let x = 0; x < GAME_WIDTH; x++) {
        // Check what's at this position (priority order matters!)
        const isShip =
          Math.floor(shipPos.x) === x && Math.floor(shipPos.y) === y;

        // Hit effects are highest priority (show explosions)
        const hitEffect = hitEffects.find(
          (h) => Math.floor(h.x) === x && Math.floor(h.y) === y,
        );

        const proj = projectiles.find(
          (p) => Math.floor(p.x) === x && Math.floor(p.y) === y,
        );
        const enemy = enemies.find(
          (e) => Math.floor(e.x) === x && Math.floor(e.y) === y,
        );
        const gem = xpGems.find(
          (g) => Math.floor(g.x) === x && Math.floor(g.y) === y,
        );

        let char = " ";
        let color = "#1a237e";

        if (isShip) {
          char = "⛵";
          color = "#4fc3f7";
        } else if (hitEffect) {
          // Explosion effect - animate based on ttl
          char = hitEffect.ttl > 2 ? "💥" : "✦";
          color = hitEffect.ttl > 2 ? "#ff5722" : "#ffeb3b";
        } else if (proj) {
          switch (proj.type) {
            case "cannonball":
              char = "◉"; // Bigger, more visible
              color = "#ffeb3b";
              break;
            case "anchor":
              char = "⚓";
              color = "#90caf9";
              break;
            case "bottle":
              char = "◈";
              color = "#8bc34a";
              break;
            case "lightning":
              char = "⚡";
              color = "#ffc107";
              break;
          }
        } else if (enemy) {
          switch (enemy.type) {
            case "skeleton":
              char = "☠";
              color = "#f44336";
              break;
            case "ghost":
              char = "👻";
              color = "#9c27b0";
              break;
            case "kraken":
              char = "🐙";
              color = "#e91e63";
              break;
          }
        } else if (gem) {
          char = "◆";
          color =
            gem.value >= 15
              ? "#e91e63"
              : gem.value >= 8
                ? "#9c27b0"
                : "#4caf50";
        } else if (waterPattern.current[y]?.[x]) {
          // Use pre-computed static water pattern (no flickering!)
          char = "~";
          color = "#1565c0";
        }

        chars.push(
          <span key={x} fg={color}>
            {char}
          </span>,
        );
      }

      lines.push(<text key={y}>{chars}</text>);
    }

    return lines;
  };

  const healthPercent = Math.round((health / maxHealth) * 100);
  const healthBarWidth = 15;
  const healthFilled = Math.round((health / maxHealth) * healthBarWidth);
  const xpBarWidth = 20;
  const xpFilled = Math.round((xp / xpToLevel) * xpBarWidth);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <box
      width="100%"
      height="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <text fg="#e91e63">
        <b>⚓ PIRATE SURVIVORS ⚓</b>
      </text>

      {gameState === "ready" && (
        <>
          <text fg="#ff9800" marginTop={2}>
            Survive the endless swarm! Auto-attack, just move!
          </text>
          <box marginTop={1} flexDirection="column" alignItems="center">
            <text fg="#888888">hjkl/arrows - Move your ship</text>
            <text fg="#888888">Weapons fire automatically!</text>
            <text fg="#4caf50">Collect ◆ gems for XP</text>
            <text fg="#888888">Level up to get new weapons!</text>
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
          {/* Status bars */}
          <box
            marginTop={1}
            width={54}
            flexDirection="row"
            justifyContent="space-between"
          >
            <box flexDirection="row" gap={1}>
              <text fg="#f44336">♥</text>
              <text fg={healthPercent < 30 ? "#f44336" : "#4caf50"}>
                {"█".repeat(healthFilled)}
              </text>
              <text fg="#333333">
                {"░".repeat(healthBarWidth - healthFilled)}
              </text>
            </box>
            <text fg="#888888">
              ⏱ <span fg="#ffffff">{formatTime(survivalTime)}</span>
            </text>
          </box>

          <box width={54} flexDirection="row" justifyContent="space-between">
            <box flexDirection="row" gap={1}>
              <text fg="#4caf50">XP</text>
              <text fg="#4caf50">{"█".repeat(xpFilled)}</text>
              <text fg="#333333">{"░".repeat(xpBarWidth - xpFilled)}</text>
            </box>
            <text fg="#ffc107">
              Lv <b>{level}</b>
            </text>
          </box>

          <box width={54} flexDirection="row" justifyContent="space-between">
            <text fg="#888888">
              Kills: <span fg="#ff9800">{kills}</span>
            </text>
            <text fg="#888888">
              {weapons
                .map((w) => WEAPON_STATS[w.type].name.charAt(0))
                .join(" ")}{" "}
              [{weapons.length}]
            </text>
          </box>

          {/* Game area */}
          <box
            marginTop={1}
            border={true}
            borderStyle="rounded"
            borderColor={hitFlash ? "#f44336" : "#e91e63"}
            flexDirection="column"
          >
            {renderGrid()}
          </box>

          <text fg="#666666" marginTop={1}>
            hjkl move | weapons auto-fire | ESC quit
          </text>
        </>
      )}

      {gameState === "levelup" && (
        <>
          <text fg="#ffc107" marginTop={2}>
            <b>⭐ LEVEL UP! ⭐</b>
          </text>
          <text fg="#888888">Level {level} - Choose an upgrade:</text>

          <box marginTop={2} flexDirection="column" alignItems="center">
            {upgradeOptions.map((option, i) => (
              <box
                key={i}
                border={true}
                borderStyle="rounded"
                borderColor={selectedUpgrade === i ? "#ffc107" : "#333333"}
                paddingLeft={2}
                paddingRight={2}
                width={40}
                marginTop={i > 0 ? 1 : 0}
              >
                <text fg={selectedUpgrade === i ? "#ffffff" : "#888888"}>
                  {selectedUpgrade === i ? "▸ " : "  "}
                  <span fg={option.isNew ? "#4caf50" : "#ffc107"}>
                    {option.name}
                  </span>
                  {" - "}
                  <span fg="#888888">{option.description}</span>
                </text>
              </box>
            ))}
          </box>

          <text fg="#666666" marginTop={2}>
            j/k to select | ENTER to confirm
          </text>
        </>
      )}

      {gameState === "gameover" && (
        <>
          <text fg="#f44336" marginTop={2}>
            YE SHIP HAS SUNK!
          </text>
          <text fg="#ff9800" marginTop={2}>
            Survived: <b>{formatTime(survivalTime)}</b>
          </text>
          <text fg="#ffc107">
            Enemies Slain: <b>{kills}</b>
          </text>
          <text fg="#888888">
            Level Reached: <b>{level}</b>
          </text>
          {survivalTime >= highScore && survivalTime > 0 && (
            <text fg="#ffc107">NEW BEST TIME!</text>
          )}
          <text fg="#888888" marginTop={1}>
            Best: {formatTime(highScore)}
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
