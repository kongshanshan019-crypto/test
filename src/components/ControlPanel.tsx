import useGameStore, { type Difficulty } from "@/store/gameStore";
import { Play, Pause, RotateCcw } from "lucide-react";

const DIFFICULTIES: { key: Difficulty; label: string }[] = [
  { key: "easy", label: "简单" },
  { key: "normal", label: "普通" },
  { key: "hard", label: "困难" },
];

export default function ControlPanel() {
  const status = useGameStore((s) => s.status);
  const difficulty = useGameStore((s) => s.difficulty);
  const start = useGameStore((s) => s.start);
  const pause = useGameStore((s) => s.pause);
  const resume = useGameStore((s) => s.resume);
  const restart = useGameStore((s) => s.restart);
  const setDifficulty = useGameStore((s) => s.setDifficulty);

  const canChangeDifficulty = status === "idle" || status === "gameover";

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="bg-neon-card border border-neon-border rounded-lg p-4">
        <span className="font-rajdhani text-sm text-gray-400 uppercase tracking-wider block mb-3">
          难度
        </span>
        <div className="flex gap-2">
          {DIFFICULTIES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => canChangeDifficulty && setDifficulty(key)}
              disabled={!canChangeDifficulty}
              className={`flex-1 py-2 px-3 rounded font-rajdhani text-sm font-semibold uppercase tracking-wider transition-all duration-200 border
                ${
                  difficulty === key
                    ? "bg-neon-green/15 border-neon-green text-neon-green border-glow-green"
                    : "bg-transparent border-neon-border text-gray-500 hover:border-gray-600 hover:text-gray-300"
                }
                ${!canChangeDifficulty ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-neon-card border border-neon-border rounded-lg p-4">
        <span className="font-rajdhani text-sm text-gray-400 uppercase tracking-wider block mb-3">
          控制
        </span>
        <div className="flex flex-col gap-2">
          {status === "idle" && (
            <button
              onClick={start}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded font-rajdhani font-bold uppercase tracking-wider bg-neon-green/15 border border-neon-green text-neon-green hover:bg-neon-green/25 transition-all duration-200 border-glow-green"
            >
              <Play size={18} />
              开始游戏
            </button>
          )}
          {status === "playing" && (
            <button
              onClick={pause}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded font-rajdhani font-bold uppercase tracking-wider bg-neon-blue/15 border border-neon-blue text-neon-blue hover:bg-neon-blue/25 transition-all duration-200 border-glow-blue"
            >
              <Pause size={18} />
              暂停
            </button>
          )}
          {status === "paused" && (
            <button
              onClick={resume}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded font-rajdhani font-bold uppercase tracking-wider bg-neon-green/15 border border-neon-green text-neon-green hover:bg-neon-green/25 transition-all duration-200 border-glow-green"
            >
              <Play size={18} />
              继续
            </button>
          )}
          {(status === "playing" || status === "paused") && (
            <button
              onClick={restart}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded font-rajdhani font-semibold uppercase tracking-wider bg-transparent border border-neon-border text-gray-400 hover:border-neon-pink hover:text-neon-pink transition-all duration-200"
            >
              <RotateCcw size={16} />
              重新开始
            </button>
          )}
        </div>
      </div>

      <div className="bg-neon-card border border-neon-border rounded-lg p-4">
        <span className="font-rajdhani text-sm text-gray-400 uppercase tracking-wider block mb-2">
          操作说明
        </span>
        <div className="space-y-1 text-xs text-gray-500 font-rajdhani">
          <p>↑ ↓ ← → / WASD — 控制方向</p>
          <p>空格键 — 开始 / 暂停</p>
          <p>Enter — 开始 / 重新开始</p>
        </div>
      </div>
    </div>
  );
}
