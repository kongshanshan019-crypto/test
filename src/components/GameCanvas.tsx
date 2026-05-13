import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import { CANVAS_SIZE, CELL_SIZE, GRID_SIZE } from "@/utils/gameLogic";

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snake = useGameStore((s) => s.snake);
  const food = useGameStore((s) => s.food);
  const particles = useGameStore((s) => s.particles);
  const status = useGameStore((s) => s.status);
  const shake = useGameStore((s) => s.shake);
  const setShake = useGameStore((s) => s.setShake);
  const frameRef = useRef(0);

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shake, setShake]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    frameRef.current++;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    const pulse = 0.7 + 0.3 * Math.sin(frameRef.current * 0.08);
    const foodCx = food.x * CELL_SIZE + CELL_SIZE / 2;
    const foodCy = food.y * CELL_SIZE + CELL_SIZE / 2;
    ctx.save();
    ctx.shadowColor = "#ff2e63";
    ctx.shadowBlur = 15 * pulse;
    ctx.fillStyle = "#ff2e63";
    ctx.beginPath();
    ctx.arc(foodCx, foodCy, (CELL_SIZE / 2 - 2) * (0.8 + 0.2 * pulse), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.shadowColor = "#ff2e63";
    ctx.shadowBlur = 8 * pulse;
    ctx.fillStyle = "#ff6b8a";
    ctx.beginPath();
    ctx.arc(foodCx, foodCy, (CELL_SIZE / 4) * (0.8 + 0.2 * pulse), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    snake.forEach((segment, index) => {
      const x = segment.x * CELL_SIZE;
      const y = segment.y * CELL_SIZE;
      const isHead = index === 0;
      const alpha = 1 - (index / snake.length) * 0.5;

      ctx.save();
      ctx.shadowColor = "#39ff14";
      ctx.shadowBlur = isHead ? 20 : 10 * alpha;

      const green = Math.floor(255 * alpha);
      ctx.fillStyle = `rgb(${Math.floor(57 * alpha)}, ${green}, ${Math.floor(20 * alpha)})`;

      const radius = isHead ? 6 : 4;
      const padding = isHead ? 1 : 2;
      const sx = x + padding;
      const sy = y + padding;
      const sw = CELL_SIZE - padding * 2;
      const sh = CELL_SIZE - padding * 2;

      ctx.beginPath();
      ctx.moveTo(sx + radius, sy);
      ctx.lineTo(sx + sw - radius, sy);
      ctx.quadraticCurveTo(sx + sw, sy, sx + sw, sy + radius);
      ctx.lineTo(sx + sw, sy + sh - radius);
      ctx.quadraticCurveTo(sx + sw, sy + sh, sx + sw - radius, sy + sh);
      ctx.lineTo(sx + radius, sy + sh);
      ctx.quadraticCurveTo(sx, sy + sh, sx, sy + sh - radius);
      ctx.lineTo(sx, sy + radius);
      ctx.quadraticCurveTo(sx, sy, sx + radius, sy);
      ctx.closePath();
      ctx.fill();

      if (isHead) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#0a0a0a";
        const dir = useGameStore.getState().direction;
        let eye1x: number, eye1y: number, eye2x: number, eye2y: number;
        const cx = x + CELL_SIZE / 2;
        const cy = y + CELL_SIZE / 2;
        const eyeOffset = 4;
        const eyeForward = 5;
        const eyeSize = 2.5;

        switch (dir) {
          case "RIGHT":
            eye1x = cx + eyeForward; eye1y = cy - eyeOffset;
            eye2x = cx + eyeForward; eye2y = cy + eyeOffset;
            break;
          case "LEFT":
            eye1x = cx - eyeForward; eye1y = cy - eyeOffset;
            eye2x = cx - eyeForward; eye2y = cy + eyeOffset;
            break;
          case "UP":
            eye1x = cx - eyeOffset; eye1y = cy - eyeForward;
            eye2x = cx + eyeOffset; eye2y = cy - eyeForward;
            break;
          case "DOWN":
            eye1x = cx - eyeOffset; eye1y = cy + eyeForward;
            eye2x = cx + eyeOffset; eye2y = cy + eyeForward;
            break;
        }
        ctx.beginPath();
        ctx.arc(eye1x, eye1y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(eye2x, eye2y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });

    particles.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    if (status === "idle") {
      ctx.save();
      ctx.fillStyle = "rgba(10, 10, 10, 0.6)";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.restore();
    }
  }, [snake, food, particles, status]);

  return (
    <div className={`relative ${shake ? "shake" : ""}`}>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="rounded-lg border border-[#1a1a2e] shadow-[0_0_30px_rgba(57,255,20,0.15)]"
      />
    </div>
  );
}
