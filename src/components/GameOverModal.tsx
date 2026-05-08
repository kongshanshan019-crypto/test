import useGameStore from "@/store/gameStore";
import { RotateCcw, Trophy } from "lucide-react";

export default function GameOverModal() {
  const status = useGameStore((s) => s.status);
  const score = useGameStore((s) => s.score);
  const highScore = useGameStore((s) => s.highScore);
  const restart = useGameStore((s) => s.restart);

  if (status !== "gameover") return null;

  const isNewHighScore = score >= highScore && score > 0;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-glass border border-neon-pink/50 rounded-2xl p-8 max-w-sm w-full mx-4 border-glow-pink animate-slide-up">
        <div className="text-center">
          <h2 className="font-orbitron text-3xl font-bold text-neon-pink text-glow-pink mb-2">
            游戏结束
          </h2>

          {isNewHighScore && (
            <div className="mb-4 animate-pulse-fast">
              <span className="inline-block px-4 py-1 rounded-full bg-neon-pink/20 border border-neon-pink/50 text-neon-pink font-orbitron text-xs uppercase tracking-widest">
                新纪录!
              </span>
            </div>
          )}

          <div className="flex items-center justify-center gap-6 my-6">
            <div>
              <div className="font-rajdhani text-sm text-gray-400 uppercase tracking-wider mb-1">
                最终分数
              </div>
              <div className="font-orbitron text-4xl font-bold text-neon-green text-glow-green">
                {score}
              </div>
            </div>
            <div className="w-px h-12 bg-neon-border" />
            <div>
              <div className="font-rajdhani text-sm text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Trophy size={12} />
                最高分
              </div>
              <div className="font-orbitron text-2xl font-bold text-neon-blue text-glow-blue">
                {highScore}
              </div>
            </div>
          </div>

          <button
            onClick={restart}
            className="flex items-center justify-center gap-2 mx-auto py-3 px-8 rounded-lg font-rajdhani font-bold uppercase tracking-wider bg-neon-green/15 border border-neon-green text-neon-green hover:bg-neon-green/25 transition-all duration-200 border-glow-green"
          >
            <RotateCcw size={18} />
            再来一局
          </button>

          <p className="mt-4 text-xs text-gray-600 font-rajdhani">
            按 Enter 键快速重新开始
          </p>
        </div>
      </div>
    </div>
  );
}
