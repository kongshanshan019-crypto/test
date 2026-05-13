export interface Point {
  x: number;
  y: number;
}

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

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

export const GRID_SIZE = 20;
export const CELL_SIZE = 24;
export const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;

export const OPPOSITE: Record<Direction, Direction> = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

export const INITIAL_SPEED = 150;
export const MIN_SPEED = 80;
export const SPEED_DECREASE = 3;

export function createInitialSnake(): Point[] {
  const mid = Math.floor(GRID_SIZE / 2);
  return [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ];
}

export function randomFood(snake: Point[]): Point {
  const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
  const available: Point[] = [];
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (!occupied.has(`${x},${y}`)) {
        available.push({ x, y });
      }
    }
  }
  if (available.length === 0) return { x: 0, y: 0 };
  return available[Math.floor(Math.random() * available.length)];
}

export function moveSnake(snake: Point[], direction: Direction): Point[] {
  const head = snake[0];
  const newHead = { ...head };
  switch (direction) {
    case "UP":
      newHead.y -= 1;
      break;
    case "DOWN":
      newHead.y += 1;
      break;
    case "LEFT":
      newHead.x -= 1;
      break;
    case "RIGHT":
      newHead.x += 1;
      break;
  }
  return [newHead, ...snake];
}

export function isWallCollision(head: Point): boolean {
  return head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;
}

export function isSelfCollision(head: Point, body: Point[]): boolean {
  return body.some((seg) => seg.x === head.x && seg.y === head.y);
}

export function isFoodEaten(head: Point, food: Point): boolean {
  return head.x === food.x && head.y === food.y;
}

export function calculateSpeed(score: number): number {
  return Math.max(MIN_SPEED, INITIAL_SPEED - score * SPEED_DECREASE);
}

export function createParticles(point: Point, color: string): Particle[] {
  const cx = point.x * CELL_SIZE + CELL_SIZE / 2;
  const cy = point.y * CELL_SIZE + CELL_SIZE / 2;
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
      maxLife: 1,
      color,
      size: 2 + Math.random() * 3,
    });
  }
  return particles;
}

export function updateParticles(particles: Particle[]): Particle[] {
  return particles
    .map((p) => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      life: p.life - 0.03,
      vx: p.vx * 0.96,
      vy: p.vy * 0.96,
    }))
    .filter((p) => p.life > 0);
}
