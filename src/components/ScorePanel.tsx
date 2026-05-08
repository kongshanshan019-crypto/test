import useGameStore from "@/store/gameStore";
import { Trophy, Zap, Target } from "lucide-react";

export default function ScorePanel() {
  const score = useGameStore((s) => s.score);
  const highScore = useGameStore((s) => s.highScore);
  const level = useGameStore((s) => s.level);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="bg-neon-card border border-neon-border rounded-lg p-4 border-glow-green">
        <div className="flex items-center gap-2 mb-1">
          <Target size={16} className="text-neon-green" />
          <span className="font-rajdhani text-sm text-gray-400 uppercase tracking-wider">
            分数
          </span>
        </div>
        <div className="font-orbitron text-4xl font-bold text-neon-green text-glow-green">
          {String(score).padStart(4, "0")}
        </div>
      </div>

      <div className="bg-neon-card border border-neon-border rounded-lg p-4 border-glow-blue">
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={16} className="text-neon-blue" />
          <span className="font-rajdhani text-sm text-gray-400 uppercase tracking-wider">
            最高分
          </span>
        </div>
        <div className="font-orbitron text-2xl font-bold text-neon-blue text-glow-blue">
          {String(highScore).padStart(4, "0")}
        </div>
      </div>

      <div className="bg-neon-card border border-neon-border rounded-lg p-4 border-glow-pink">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={16} className="text-neon-pink" />
          <span className="font-rajdhani text-sm text-gray-400 uppercase tracking-wider">
            等级
          </span>
        </div>
        <div className="font-orbitron text-2xl font-bold text-neon-pink text-glow-pink">
          LV.{level}
        </div>
      </div>
    </div>
  );
}
