import { create } from "zustand";
import {
  type Point,
  type Direction,
  type Particle,
  createInitialSnake,
  randomFood,
  moveSnake,
  isWallCollision,
  isSelfCollision,
  isFoodEaten,
  createParticles,
  calculateSpeed,
  OPPOSITE,
} from "@/utils/gameLogic";

export type GameStatus = "idle" | "playing" | "paused" | "gameover";

interface GameState {
  snake: Point[];
  food: Point;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  bestScore: number;
  status: GameStatus;
  speed: number;
  particles: Particle[];
  shake: boolean;
}

interface GameActions {
  start: () => void;
  pause: () => void;
  resume: () => void;
  restart: () => void;
  setDirection: (dir: Direction) => void;
  tick: () => void;
  updateParticles: (particles: Particle[]) => void;
  setShake: (shake: boolean) => void;
}

function loadBestScore(): number {
  try {
    return parseInt(localStorage.getItem("snake-best") || "0", 10);
  } catch {
    return 0;
  }
}

function saveBestScore(score: number): void {
  try {
    localStorage.setItem("snake-best", String(score));
  } catch {
    // ignore
  }
}

const initialSnake = createInitialSnake();
const initialFood = randomFood(initialSnake);

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  snake: initialSnake,
  food: initialFood,
  direction: "RIGHT",
  nextDirection: "RIGHT",
  score: 0,
  bestScore: loadBestScore(),
  status: "idle",
  speed: 150,
  particles: [],
  shake: false,

  start: () => {
    const state = get();
    if (state.status === "idle" || state.status === "gameover") {
      const snake = createInitialSnake();
      const food = randomFood(snake);
      set({
        snake,
        food,
        direction: "RIGHT",
        nextDirection: "RIGHT",
        score: 0,
        speed: 150,
        status: "playing",
        particles: [],
        shake: false,
      });
    } else if (state.status === "paused") {
      set({ status: "playing" });
    }
  },

  pause: () => {
    if (get().status === "playing") {
      set({ status: "paused" });
    }
  },

  resume: () => {
    if (get().status === "paused") {
      set({ status: "playing" });
    }
  },

  restart: () => {
    const snake = createInitialSnake();
    const food = randomFood(snake);
    set({
      snake,
      food,
      direction: "RIGHT",
      nextDirection: "RIGHT",
      score: 0,
      speed: 150,
      status: "playing",
      particles: [],
      shake: false,
    });
  },

  setDirection: (dir: Direction) => {
    const state = get();
    if (state.status !== "playing") return;
    if (dir === OPPOSITE[state.direction]) return;
    set({ nextDirection: dir });
  },

  tick: () => {
    const state = get();
    if (state.status !== "playing") return;

    const direction = state.nextDirection;
    if (direction === OPPOSITE[state.direction]) return;

    const newSnake = moveSnake(state.snake, direction);
    const head = newSnake[0];

    if (isWallCollision(head) || isSelfCollision(head, newSnake.slice(1))) {
      const bestScore = Math.max(state.score, state.bestScore);
      saveBestScore(bestScore);
      set({
        status: "gameover",
        bestScore,
        direction,
        shake: true,
      });
      return;
    }

    if (isFoodEaten(head, state.food)) {
      const newScore = state.score + 10;
      const newSpeed = calculateSpeed(newScore);
      const newFood = randomFood(newSnake);
      const newParticles = createParticles(state.food, "#ff2e63");
      const bestScore = Math.max(newScore, state.bestScore);
      saveBestScore(bestScore);
      set({
        snake: newSnake,
        food: newFood,
        direction,
        score: newScore,
        bestScore,
        speed: newSpeed,
        particles: [...state.particles, ...newParticles],
      });
    } else {
      set({
        snake: newSnake.slice(0, -1),
        direction,
      });
    }
  },

  updateParticles: (particles: Particle[]) => {
    set({ particles });
  },

  setShake: (shake: boolean) => {
    set({ shake });
  },
}));
