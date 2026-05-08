import { useRef, useEffect, useCallback } from "react";
import useGameStore from "@/store/gameStore";

export default function useGameLoop() {
  const tick = useGameStore((s) => s.tick);
  const updateParticles = useGameStore((s) => s.updateParticles);
  const getSpeed = useGameStore((s) => s.getSpeed);
  const status = useGameStore((s) => s.status);
  const lastTickRef = useRef(0);
  const rafRef = useRef(0);

  const loop = useCallback(
    (time: number) => {
      const speed = getSpeed();
      if (time - lastTickRef.current >= speed) {
        tick();
        lastTickRef.current = time;
      }
      updateParticles(1 / 60);
      rafRef.current = requestAnimationFrame(loop);
    },
    [tick, updateParticles, getSpeed]
  );

  useEffect(() => {
    if (status === "playing") {
      lastTickRef.current = performance.now();
      rafRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [status, loop]);
}
