import GameCanvas from "@/components/GameCanvas";
import ScorePanel from "@/components/ScorePanel";
import ControlPanel from "@/components/ControlPanel";
import GameOverModal from "@/components/GameOverModal";
import MobileControls from "@/components/MobileControls";
import IdleOverlay from "@/components/IdleOverlay";
import useGameLoop from "@/hooks/useGameLoop";
import useKeyboard from "@/hooks/useKeyboard";
import useSwipe from "@/hooks/useSwipe";
import useGameStore from "@/store/gameStore";

export default function Home() {
  useGameLoop();
  useKeyboard();
  const swipeHandlers = useSwipe();
  const status = useGameStore((s) => s.status);

  return (
    <div className="min-h-screen bg-neon-darker flex flex-col items-center justify-center p-4 md:p-8">
      <header className="mb-6 text-center md:mb-8">
        <h1 className="font-orbitron text-2xl md:text-3xl font-black text-neon-green text-glow-green tracking-widest">
          贪吃蛇
        </h1>
        <p className="font-rajdhani text-xs text-gray-600 tracking-widest uppercase mt-1">
          Neon Edition
        </p>
      </header>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6 w-full max-w-4xl justify-center">
        <div className="hidden lg:block w-44 shrink-0">
          <ScorePanel />
        </div>

        <div className="relative" {...swipeHandlers}>
          <GameCanvas />
          {status === "idle" && <IdleOverlay />}
          {status === "gameover" && <GameOverModal />}
          {status === "paused" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg z-40">
              <div className="text-center animate-fade-in">
                <h2 className="font-orbitron text-3xl font-bold text-neon-blue text-glow-blue mb-2">
                  已暂停
                </h2>
                <p className="font-rajdhani text-sm text-gray-400">
                  按空格键继续
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:block w-44 shrink-0">
          <ControlPanel />
        </div>
      </div>

      <div className="lg:hidden mt-4 w-full max-w-sm">
        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <ScorePanel />
          </div>
          <div className="flex-1">
            <ControlPanel />
          </div>
        </div>
      </div>

      <MobileControls />

      <footer className="mt-6 text-center">
        <p className="font-rajdhani text-xs text-gray-700">
          使用方向键或 WASD 控制 · 空格暂停
        </p>
      </footer>
    </div>
  );
}
