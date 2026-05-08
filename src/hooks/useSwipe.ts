import { useRef, useCallback } from "react";
import useGameStore, { type Direction } from "@/store/gameStore";

const SWIPE_THRESHOLD = 30;

function getDirection(dx: number, dy: number): Direction {
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? "RIGHT" : "LEFT";
  }
  return dy > 0 ? "DOWN" : "UP";
}

export default function useSwipe() {
  const setDirection = useGameStore((s) => s.setDirection);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      if (Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(dy) > SWIPE_THRESHOLD) {
        setDirection(getDirection(dx, dy));
      }
      touchStartRef.current = null;
    },
    [setDirection]
  );

  return { onTouchStart, onTouchEnd };
}
