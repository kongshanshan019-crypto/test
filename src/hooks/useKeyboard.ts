import { useRef, useEffect } from "react";
import useGameStore from "@/store/gameStore";

export default function useKeyboard() {
  const setDirection = useGameStore((s) => s.setDirection);
  const status = useGameStore((s) => s.status);
  const start = useGameStore((s) => s.start);
  const pause = useGameStore((s) => s.pause);
  const resume = useGameStore((s) => s.resume);
  const restart = useGameStore((s) => s.restart);
  const pressedRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (pressedRef.current) return;
      pressedRef.current = true;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          setDirection("UP");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          setDirection("DOWN");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          setDirection("LEFT");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          setDirection("RIGHT");
          break;
        case " ":
          e.preventDefault();
          if (status === "idle") start();
          else if (status === "playing") pause();
          else if (status === "paused") resume();
          else if (status === "gameover") restart();
          break;
        case "Enter":
          e.preventDefault();
          if (status === "idle") start();
          else if (status === "gameover") restart();
          break;
      }
    };

    const handleKeyUp = () => {
      pressedRef.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [setDirection, status, start, pause, resume, restart]);
}
