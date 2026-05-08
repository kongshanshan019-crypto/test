import { create } from "zustand";

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type GameStatus = "idle" | "playing" | "paused" | "gameover";
export type Difficulty = "easy" | "normal" | "hard";

export interface Position {
  x: number;
  y: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface GameState {
  status: GameStatus;
  difficulty: Difficulty;
  snake: Position[];
  direction: Direction;
  nextDirection: Direction;
  food: Position;
  score: number;
  highScore: number;
  level: number;
  particles: Particle[];
  gridSize: number;
  canvasSize: number;
}

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;

const SPEED_MAP: Record<Difficulty, number> = {
  easy: 160,
  normal: 120,
  hard: 80,
};

const LEVEL_THRESHOLD = 5;

function getInitialSnake(): Position[] {
  const mid = Math.floor(GRID_SIZE / 2);
  return [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ];
}

function randomFood(snake: Position[]): Position {
  let pos: Position;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
}

function loadHighScore(): number {
  try {
    return parseInt(localStorage.getItem("snake-high-score") || "0", 10);
  } catch {
    return 0;
  }
}

function saveHighScore(score: number) {
  try {
    localStorage.setItem("snake-high-score", String(score));
  } catch {
    // ignore
  }
}

function isOpposite(a: Direction, b: Direction): boolean {
  return (
    (a === "UP" && b === "DOWN") ||
    (a === "DOWN" && b === "UP") ||
    (a === "LEFT" && b === "RIGHT") ||
    (a === "RIGHT" && b === "LEFT")
  );
}

function createParticles(pos: Position, cellSize: number): Particle[] {
  const cx = pos.x * cellSize + cellSize / 2;
  const cy = pos.y * cellSize + cellSize / 2;
  const colors = ["#00ff88", "#ff0066", "#00d4ff", "#b400ff", "#ffcc00"];
  const particles: Particle[] = [];
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.5;
    const speed = 1.5 + Math.random() * 3;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: 0.6 + Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 2 + Math.random() * 3,
    });
  }
  return particles;
}

interface GameActions {
  start: () => void;
  pause: () => void;
  resume: () => void;
  restart: () => void;
  setDirection: (dir: Direction) => void;
  tick: () => void;
  updateParticles: (dt: number) => void;
  setDifficulty: (d: Difficulty) => void;
  getSpeed: () => number;
}

const useGameStore = create<GameState & GameActions>((set, get) => ({
  status: "idle",
  difficulty: "normal",
  snake: getInitialSnake(),
  direction: "RIGHT",
  nextDirection: "RIGHT",
  food: randomFood(getInitialSnake()),
  score: 0,
  highScore: loadHighScore(),
  level: 1,
  particles: [],
  gridSize: GRID_SIZE,
  canvasSize: CANVAS_SIZE,

  start: () => {
    const snake = getInitialSnake();
    set({
      status: "playing",
      snake,
      direction: "RIGHT",
      nextDirection: "RIGHT",
      food: randomFood(snake),
      score: 0,
      level: 1,
      particles: [],
    });
  },

  pause: () => {
    if (get().status === "playing") set({ status: "paused" });
  },

  resume: () => {
    if (get().status === "paused") set({ status: "playing" });
  },

  restart: () => {
    const snake = getInitialSnake();
    set({
      status: "playing",
      snake,
      direction: "RIGHT",
      nextDirection: "RIGHT",
      food: randomFood(snake),
      score: 0,
      level: 1,
      particles: [],
    });
  },

  setDirection: (dir) => {
    const { direction, status } = get();
    if (status !== "playing") return;
    if (isOpposite(direction, dir)) return;
    set({ nextDirection: dir });
  },

  tick: () => {
    const { snake, nextDirection, food, gridSize, status, score, highScore, canvasSize } = get();
    if (status !== "playing") return;

    const direction = nextDirection;
    const head = { ...snake[0] };

    switch (direction) {
      case "UP": head.y -= 1; break;
      case "DOWN": head.y += 1; break;
      case "LEFT": head.x -= 1; break;
      case "RIGHT": head.x += 1; break;
    }

    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      const newHigh = Math.max(score, highScore);
      saveHighScore(newHigh);
      set({ status: "gameover", highScore: newHigh });
      return;
    }

    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      const newHigh = Math.max(score, highScore);
      saveHighScore(newHigh);
      set({ status: "gameover", highScore: newHigh });
      return;
    }

    const newSnake = [head, ...snake];
    const cellSize = canvasSize / gridSize;

    if (head.x === food.x && head.y === food.y) {
      const newScore = score + 1;
      const newLevel = Math.floor(newScore / LEVEL_THRESHOLD) + 1;
      const newHigh = Math.max(newScore, highScore);
      set({
        snake: newSnake,
        direction,
        food: randomFood(newSnake),
        score: newScore,
        level: newLevel,
        highScore: newHigh,
        particles: [...get().particles, ...createParticles(food, cellSize)],
      });
    } else {
      newSnake.pop();
      set({ snake: newSnake, direction });
    }
  },

  updateParticles: (dt) => {
    const { particles } = get();
    if (particles.length === 0) return;
    const updated = particles
      .map((p) => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - dt / p.maxLife,
        vx: p.vx * 0.96,
        vy: p.vy * 0.96,
      }))
      .filter((p) => p.life > 0);
    set({ particles: updated });
  },

  setDifficulty: (d) => {
    if (get().status === "idle" || get().status === "gameover") {
      set({ difficulty: d });
    }
  },

  getSpeed: () => {
    const { difficulty, level } = get();
    const base = SPEED_MAP[difficulty];
    return Math.max(40, base - (level - 1) * 8);
  },
}));

export default useGameStore;
