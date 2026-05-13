import { useGameStore } from "@/store/gameStore";

export default function ScorePanel() {
  const score = useGameStore((s) => s.score);
  const bestScore = useGameStore((s) => s.bestScore);

  return (
    <div className="flex items-center justify-center gap-8 sm:gap-16">
      <div className="text-center">
        <div className="text-[8px] sm:text-[10px] tracking-widest text-[#00d4ff] mb-1">
          SCORE
        </div>
        <div
          className="text-lg sm:text-2xl text-[#00d4ff]"
          style={{ textShadow: "0 0 10px #00d4ff, 0 0 20px #00d4ff" }}
        >
          {String(score).padStart(4, "0")}
        </div>
      </div>
      <div className="w-px h-8 bg-[#1a1a2e]" />
      <div className="text-center">
        <div className="text-[8px] sm:text-[10px] tracking-widest text-[#ff2e63] mb-1">
          BEST
        </div>
        <div
          className="text-lg sm:text-2xl text-[#ff2e63]"
          style={{ textShadow: "0 0 10px #ff2e63, 0 0 20px #ff2e63" }}
        >
          {String(bestScore).padStart(4, "0")}
        </div>
      </div>
    </div>
  );
}
