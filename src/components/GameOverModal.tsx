import { useGameStore } from "@/store/gameStore";
import { RotateCcw } from "lucide-react";

export default function GameOverModal() {
  const status = useGameStore((s) => s.status);
  const score = useGameStore((s) => s.score);
  const bestScore = useGameStore((s) => s.bestScore);
  const restart = useGameStore((s) => s.restart);

  if (status !== "gameover") return null;

  const isNewBest = score >= bestScore && score > 0;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative float-in rounded-2xl border border-[#ff2e63]/50 bg-[#0a0a0a]/95 p-8 text-center shadow-[0_0_40px_rgba(255,46,99,0.3)]">
        <h2
          className="mb-6 text-xl text-[#ff2e63]"
          style={{ textShadow: "0 0 10px #ff2e63, 0 0 30px #ff2e63" }}
        >
          GAME OVER
        </h2>

        <div className="mb-2">
          <span className="text-[8px] tracking-widest text-[#00d4ff]">SCORE</span>
          <div
            className="text-2xl text-[#00d4ff]"
            style={{ textShadow: "0 0 10px #00d4ff" }}
          >
            {score}
          </div>
        </div>

        {isNewBest && (
          <div
            className="mb-4 text-[10px] text-[#39ff14]"
            style={{ textShadow: "0 0 8px #39ff14" }}
          >
            ★ NEW BEST ★
          </div>
        )}

        <button
          onClick={restart}
          className="mt-4 flex items-center gap-2 rounded-full border border-[#39ff14] px-6 py-2.5 text-[10px] tracking-wider text-[#39ff14] transition-all duration-200 hover:scale-105 hover:bg-[#39ff14]/10 hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] active:scale-95"
        >
          <RotateCcw size={14} />
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}
