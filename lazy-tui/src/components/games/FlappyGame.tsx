import React, { useState, useEffect, useCallback } from "react";
import { useKeyboard } from "@opentui/react";

const GAME_WIDTH = 50;
const GAME_HEIGHT = 15;
const GRAVITY = 0.25;
const JUMP_FORCE = -1.2;
const PIPE_GAP = 6;
const PIPE_WIDTH = 3;

interface Pipe {
  x: number;
  gapY: number;
  passed: boolean;
}

interface FlappyGameProps {
  goBack: () => void;
}

export function FlappyGame({ goBack }: FlappyGameProps) {
  const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready");
  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const jump = useCallback(() => {
    if (gameState === "playing") {
      setVelocity(JUMP_FORCE);
    }
  }, [gameState]);

  const startGame = useCallback(() => {
    setGameState("playing");
    setBirdY(GAME_HEIGHT / 2);
    setVelocity(0);
    setPipes([]);
    setScore(0);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      // Apply gravity
      setVelocity((v) => v + GRAVITY);
      setBirdY((y) => {
        const newY = y + velocity;
        // Check bounds
        if (newY <= 0 || newY >= GAME_HEIGHT - 1) {
          setGameState("gameover");
          setHighScore((h) => Math.max(h, score));
          return y;
        }
        return newY;
      });

      // Move pipes
      setPipes((currentPipes) => {
        let newPipes = currentPipes
          .map((p) => ({ ...p, x: p.x - 1 }))
          .filter((p) => p.x > -PIPE_WIDTH);

        // Add new pipe
        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < GAME_WIDTH - 20) {
          newPipes.push({
            x: GAME_WIDTH - 1,
            gapY: Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP - 4)) + 2,
            passed: false,
          });
        }

        return newPipes;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState, velocity, score]);

  // Collision detection and scoring
  useEffect(() => {
    if (gameState !== "playing") return;

    const birdX = 10; // Bird's fixed X position
    const roundedBirdY = Math.round(birdY);

    for (const pipe of pipes) {
      // Check if bird passed pipe
      if (!pipe.passed && pipe.x < birdX) {
        pipe.passed = true;
        setScore((s) => s + 1);
      }

      // Check collision
      if (pipe.x <= birdX + 1 && pipe.x + PIPE_WIDTH >= birdX) {
        // Bird is at pipe's X position
        if (roundedBirdY < pipe.gapY || roundedBirdY >= pipe.gapY + PIPE_GAP) {
          setGameState("gameover");
          setHighScore((h) => Math.max(h, score));
          return;
        }
      }
    }
  }, [pipes, birdY, gameState, score]);

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
      if (e.name === "space" || e.name === "w" || e.name === "k" || e.name === "up") {
        jump();
      }
    }
  });

  // Render the game grid
  const renderGrid = () => {
    const lines: string[] = [];
    const birdX = 10;
    const roundedBirdY = Math.round(birdY);

    for (let y = 0; y < GAME_HEIGHT; y++) {
      let line = "";
      for (let x = 0; x < GAME_WIDTH; x++) {
        // Bird
        if (x === birdX && y === roundedBirdY) {
          line += ">";
          continue;
        }

        // Check pipes
        let isPipe = false;
        for (const pipe of pipes) {
          if (x >= pipe.x && x < pipe.x + PIPE_WIDTH) {
            if (y < pipe.gapY || y >= pipe.gapY + PIPE_GAP) {
              isPipe = true;
              break;
            }
          }
        }

        if (isPipe) {
          line += "█";
        } else {
          line += " ";
        }
      }
      lines.push(line);
    }
    return lines;
  };

  return (
    <box width="100%" height="100%" flexDirection="column" alignItems="center" justifyContent="center">
      <text fg="#e0a526"><b>› FLAPPY TERMINAL ›</b></text>

      {gameState === "ready" && (
        <>
          <text fg="#00bcd4" marginTop={2}>Press SPACE to flap!</text>
          <text fg="#888888" marginTop={1}>Navigate through the pipes</text>
          <text fg="#888888">Don't hit the walls or pipes!</text>
          <text fg="#4caf50" marginTop={3}>Press SPACE to start</text>
          <text fg="#666666" marginTop={1}>ESC to return</text>
        </>
      )}

      {gameState === "playing" && (
        <>
          <box
            marginTop={1}
            border={true}
            borderStyle="rounded"
            borderColor="#e0a526"
            flexDirection="column"
          >
            {renderGrid().map((line, i) => (
              <text key={i}>
                {line.split("").map((char, j) => (
                  <span
                    key={j}
                    fg={char === ">" ? "#ffc107" : char === "█" ? "#4caf50" : "#333333"}
                  >
                    {char}
                  </span>
                ))}
              </text>
            ))}
          </box>

          <text fg="#e0a526" marginTop={1}>Score: <b>{score}</b></text>
          <text fg="#666666">SPACE to flap | ESC to quit</text>
        </>
      )}

      {gameState === "gameover" && (
        <>
          <text fg="#f44336" marginTop={2}>GAME OVER!</text>
          <text fg="#e0a526" marginTop={2}>Score: <b>{score}</b></text>
          {score >= highScore && score > 0 && <text fg="#ffc107">NEW HIGH SCORE!</text>}
          <text fg="#888888" marginTop={1}>Best: {highScore}</text>
          <text fg="#4caf50" marginTop={3}>Press SPACE to try again</text>
          <text fg="#666666" marginTop={1}>ESC to return</text>
        </>
      )}
    </box>
  );
}
