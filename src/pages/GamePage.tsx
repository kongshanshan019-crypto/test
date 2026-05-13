import GameCanvas from "@/components/GameCanvas";
import ScorePanel from "@/components/ScorePanel";
import ControlBar from "@/components/ControlBar";
import GameOverModal from "@/components/GameOverModal";
import VirtualDpad from "@/components/VirtualDpad";
import { useGameLoop } from "@/hooks/useGameLoop";
import { useInput } from "@/hooks/useInput";
import { useGameStore } from "@/store/gameStore";

export default function GamePage() {
  useGameLoop();
  useInput();
  const status = useGameStore((s) => s.status);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-4 py-6">
      <h1
        className="neon-text mb-6 text-lg sm:text-2xl tracking-widest text-[#39ff14]"
      >
        NEON SNAKE
      </h1>

      <ScorePanel />

      <div className="relative mt-4">
        <GameCanvas />

        {status === "idle" && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm">
            <div
              className="mb-4 text-sm text-[#39ff14]"
              style={{ textShadow: "0 0 10px #39ff14" }}
            >
              NEON SNAKE
            </div>
            <div className="text-[8px] text-[#888]">
              PRESS SPACE OR TAP START
            </div>
          </div>
        )}

        {status === "paused" && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm">
            <div
              className="mb-2 text-sm text-[#00d4ff]"
              style={{ textShadow: "0 0 10px #00d4ff" }}
            >
              PAUSED
            </div>
            <div className="text-[8px] text-[#888]">
              PRESS SPACE TO RESUME
            </div>
          </div>
        )}

        <GameOverModal />
      </div>

      <div className="mt-4">
        <ControlBar />
      </div>

      <VirtualDpad />

      <div className="mt-4 hidden sm:block">
        <div className="text-[7px] text-[#444]">
          ← → ↑ ↓ / WASD — MOVE &nbsp;&nbsp; SPACE — PAUSE
        </div>
      </div>
    </div>
  );
}
