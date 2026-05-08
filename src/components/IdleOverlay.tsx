import useGameStore from "@/store/gameStore";
import { Play } from "lucide-react";

export default function IdleOverlay() {
  const status = useGameStore((s) => s.status);
  const start = useGameStore((s) => s.start);

  if (status !== "idle") return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-40">
      <div className="text-center animate-fade-in">
        <h1 className="font-orbitron text-5xl font-black text-neon-green text-glow-green mb-2 tracking-wider">
          贪吃蛇
        </h1>
        <p className="font-rajdhani text-lg text-gray-500 mb-8 tracking-wide">
          霓虹版
        </p>
        <button
          onClick={start}
          className="flex items-center justify-center gap-3 mx-auto py-4 px-10 rounded-xl font-orbitron font-bold uppercase tracking-widest bg-neon-green/15 border-2 border-neon-green text-neon-green hover:bg-neon-green/25 transition-all duration-300 border-glow-green animate-float"
        >
          <Play size={22} />
          开始游戏
        </button>
        <p className="mt-6 text-xs text-gray-600 font-rajdhani">
          按空格键或 Enter 开始
        </p>
      </div>
    </div>
  );
}
