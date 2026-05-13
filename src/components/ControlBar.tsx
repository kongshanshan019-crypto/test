import { useGameStore } from "@/store/gameStore";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function ControlBar() {
  const status = useGameStore((s) => s.status);
  const start = useGameStore((s) => s.start);
  const pause = useGameStore((s) => s.pause);
  const resume = useGameStore((s) => s.resume);
  const restart = useGameStore((s) => s.restart);

  const btnClass =
    "flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] tracking-wider transition-all duration-200 hover:scale-105 active:scale-95";

  return (
    <div className="flex items-center justify-center gap-3">
      {status === "idle" && (
        <button
          onClick={start}
          className={`${btnClass} border-[#39ff14] text-[#39ff14] hover:bg-[#39ff14]/10 hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]`}
        >
          <Play size={14} />
          START
        </button>
      )}

      {status === "playing" && (
        <>
          <button
            onClick={pause}
            className={`${btnClass} border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]`}
          >
            <Pause size={14} />
            PAUSE
          </button>
          <button
            onClick={restart}
            className={`${btnClass} border-[#ff2e63] text-[#ff2e63] hover:bg-[#ff2e63]/10 hover:shadow-[0_0_15px_rgba(255,46,99,0.3)]`}
          >
            <RotateCcw size={14} />
            RESET
          </button>
        </>
      )}

      {status === "paused" && (
        <>
          <button
            onClick={resume}
            className={`${btnClass} border-[#39ff14] text-[#39ff14] hover:bg-[#39ff14]/10 hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]`}
          >
            <Play size={14} />
            RESUME
          </button>
          <button
            onClick={restart}
            className={`${btnClass} border-[#ff2e63] text-[#ff2e63] hover:bg-[#ff2e63]/10 hover:shadow-[0_0_15px_rgba(255,46,99,0.3)]`}
          >
            <RotateCcw size={14} />
            RESET
          </button>
        </>
      )}

      {status === "gameover" && (
        <button
          onClick={restart}
          className={`${btnClass} border-[#39ff14] text-[#39ff14] hover:bg-[#39ff14]/10 hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]`}
        >
          <RotateCcw size={14} />
          PLAY AGAIN
        </button>
      )}
    </div>
  );
}
