import { useRef, useEffect, useCallback } from "react";
import useGameStore, { type Particle } from "@/store/gameStore";

function drawGrid(
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  gridSize: number,
  time: number
) {
  const cellSize = canvasSize / gridSize;
  ctx.strokeStyle = `rgba(0, 255, 136, ${0.03 + Math.sin(time * 0.001) * 0.01})`;
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= gridSize; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, canvasSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(canvasSize, i * cellSize);
    ctx.stroke();
  }
}

function drawSnake(
  ctx: CanvasRenderingContext2D,
  snake: { x: number; y: number }[],
  cellSize: number,
  gridSize: number
) {
  const len = snake.length;
  for (let i = len - 1; i >= 0; i--) {
    const seg = snake[i];
    const t = i / Math.max(len - 1, 1);
    const r = Math.round(0 + t * 180);
    const g = Math.round(255 - t * 100);
    const b = Math.round(136 - t * 80);
    const alpha = 1 - t * 0.4;

    const x = seg.x * cellSize;
    const y = seg.y * cellSize;
    const padding = i === 0 ? 1 : 2;
    const radius = i === 0 ? 4 : 3;

    ctx.save();
    if (i === 0) {
      ctx.shadowColor = "#00ff88";
      ctx.shadowBlur = 12;
    } else {
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
      ctx.shadowBlur = 4;
    }

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.beginPath();
    const rx = x + padding;
    const ry = y + padding;
    const rw = cellSize - padding * 2;
    const rh = cellSize - padding * 2;
    ctx.moveTo(rx + radius, ry);
    ctx.lineTo(rx + rw - radius, ry);
    ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + radius);
    ctx.lineTo(rx + rw, ry + rh - radius);
    ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - radius, ry + rh);
    ctx.lineTo(rx + radius, ry + rh);
    ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - radius);
    ctx.lineTo(rx, ry + radius);
    ctx.quadraticCurveTo(rx, ry, rx + radius, ry);
    ctx.closePath();
    ctx.fill();

    if (i === 0) {
      ctx.shadowBlur = 0;
      const eyeSize = cellSize * 0.12;
      ctx.fillStyle = "#0a0a0f";
      ctx.beginPath();
      ctx.arc(x + cellSize * 0.35, y + cellSize * 0.35, eyeSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + cellSize * 0.65, y + cellSize * 0.35, eyeSize, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

function drawFood(
  ctx: CanvasRenderingContext2D,
  food: { x: number; y: number },
  cellSize: number,
  time: number
) {
  const cx = food.x * cellSize + cellSize / 2;
  const cy = food.y * cellSize + cellSize / 2;
  const pulseScale = 1 + Math.sin(time * 0.005) * 0.15;
  const baseRadius = (cellSize / 2 - 3) * pulseScale;

  ctx.save();
  ctx.shadowColor = "#ff0066";
  ctx.shadowBlur = 16 + Math.sin(time * 0.004) * 6;

  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius);
  gradient.addColorStop(0, "#ff4488");
  gradient.addColorStop(0.6, "#ff0066");
  gradient.addColorStop(1, "#cc0044");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.beginPath();
  ctx.arc(cx - baseRadius * 0.25, cy - baseRadius * 0.25, baseRadius * 0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  for (const p of particles) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 6;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawBorder(ctx: CanvasRenderingContext2D, canvasSize: number, time: number) {
  const glowIntensity = 0.4 + Math.sin(time * 0.002) * 0.15;
  ctx.save();
  ctx.strokeStyle = `rgba(0, 255, 136, ${glowIntensity})`;
  ctx.lineWidth = 2;
  ctx.shadowColor = "#00ff88";
  ctx.shadowBlur = 10;
  ctx.strokeRect(1, 1, canvasSize - 2, canvasSize - 2);
  ctx.restore();
}

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snake = useGameStore((s) => s.snake);
  const food = useGameStore((s) => s.food);
  const particles = useGameStore((s) => s.particles);
  const gridSize = useGameStore((s) => s.gridSize);
  const canvasSize = useGameStore((s) => s.canvasSize);
  const status = useGameStore((s) => s.status);
  const rafRef = useRef(0);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const time = performance.now();
    const cellSize = canvasSize / gridSize;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    drawGrid(ctx, canvasSize, gridSize, time);
    drawBorder(ctx, canvasSize, time);

    if (status !== "idle") {
      drawFood(ctx, food, cellSize, time);
      drawSnake(ctx, snake, cellSize, gridSize);
    }

    drawParticles(ctx, particles);

    rafRef.current = requestAnimationFrame(render);
  }, [snake, food, particles, gridSize, canvasSize, status]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      className="rounded-lg"
      style={{ imageRendering: "auto" }}
    />
  );
}
