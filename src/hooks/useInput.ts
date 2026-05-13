import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import type { Direction } from "@/utils/gameLogic";

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
  w: "UP",
  W: "UP",
  s: "DOWN",
  S: "DOWN",
  a: "LEFT",
  A: "LEFT",
  d: "RIGHT",
  D: "RIGHT",
};

export function useInput() {
  const setDirection = useGameStore((s) => s.setDirection);
  const start = useGameStore((s) => s.start);
  const pause = useGameStore((s) => s.pause);
  const resume = useGameStore((s) => s.resume);
  const status = useGameStore((s) => s.status);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const dir = KEY_MAP[e.key];
      if (dir) {
        e.preventDefault();
        setDirection(dir);
        return;
      }

      if (e.key === " " || e.key === "Escape") {
        e.preventDefault();
        if (status === "idle" || status === "gameover") {
          start();
        } else if (status === "playing") {
          pause();
        } else if (status === "paused") {
          resume();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setDirection, start, pause, resume, status]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) < 20) return;

      if (absDx > absDy) {
        setDirection(dx > 0 ? "RIGHT" : "LEFT");
      } else {
        setDirection(dy > 0 ? "DOWN" : "UP");
      }
      touchStartRef.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [setDirection]);
}
