import { useGameStore } from "@/store/gameStore";
import type { Direction } from "@/utils/gameLogic";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export default function VirtualDpad() {
  const setDirection = useGameStore((s) => s.setDirection);
  const status = useGameStore((s) => s.status);

  if (status !== "playing") return null;

  const btnClass =
    "flex items-center justify-center w-12 h-12 rounded-xl border border-[#1a1a2e] bg-[#0a0a0a]/80 text-[#39ff14] transition-all duration-150 active:scale-90 active:bg-[#39ff14]/20 active:shadow-[0_0_10px_rgba(57,255,20,0.3)]";

  const handleDirection = (dir: Direction) => {
    setDirection(dir);
  };

  return (
    <div className="mt-4 grid grid-cols-3 grid-rows-3 gap-1 sm:hidden" style={{ width: 156 }}>
      <div />
      <button className={btnClass} onClick={() => handleDirection("UP")}>
        <ChevronUp size={20} />
      </button>
      <div />
      <button className={btnClass} onClick={() => handleDirection("LEFT")}>
        <ChevronLeft size={20} />
      </button>
      <div className="flex items-center justify-center">
        <div className="h-3 w-3 rounded-full bg-[#1a1a2e]" />
      </div>
      <button className={btnClass} onClick={() => handleDirection("RIGHT")}>
        <ChevronRight size={20} />
      </button>
      <div />
      <button className={btnClass} onClick={() => handleDirection("DOWN")}>
        <ChevronDown size={20} />
      </button>
      <div />
    </div>
  );
}
