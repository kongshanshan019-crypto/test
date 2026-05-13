import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import { updateParticles } from "@/utils/gameLogic";

export function useGameLoop() {
  const tick = useGameStore((s) => s.tick);
  const speed = useGameStore((s) => s.speed);
  const status = useGameStore((s) => s.status);
  const particles = useGameStore((s) => s.particles);
  const updateP = useGameStore((s) => s.updateParticles);
  const lastTickRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (status !== "playing" && particles.length === 0) return;

    const loop = (timestamp: number) => {
      if (status === "playing") {
        if (timestamp - lastTickRef.current >= speed) {
          lastTickRef.current = timestamp;
          tick();
        }
      }

      const currentParticles = useGameStore.getState().particles;
      if (currentParticles.length > 0) {
        updateP(updateParticles(currentParticles));
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [status, speed, tick, updateP, particles.length]);
}
