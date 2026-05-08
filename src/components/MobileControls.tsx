import useGameStore, { type Direction } from "@/store/gameStore";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const DIRS: { dir: Direction; icon: typeof ChevronUp; pos: string }[] = [
  { dir: "UP", icon: ChevronUp, pos: "col-start-2 row-start-1" },
  { dir: "LEFT", icon: ChevronLeft, pos: "col-start-1 row-start-2" },
  { dir: "RIGHT", icon: ChevronRight, pos: "col-start-3 row-start-2" },
  { dir: "DOWN", icon: ChevronDown, pos: "col-start-2 row-start-3" },
];

export default function MobileControls() {
  const setDirection = useGameStore((s) => s.setDirection);
  const status = useGameStore((s) => s.status);

  if (status !== "playing") return null;

  return (
    <div className="grid grid-cols-3 gap-2 w-40 mx-auto mt-4 md:hidden">
      {DIRS.map(({ dir, icon: Icon, pos }) => (
        <button
          key={dir}
          onClick={() => setDirection(dir)}
          className={`${pos} flex items-center justify-center w-12 h-12 rounded-lg bg-neon-card border border-neon-border text-neon-green active:bg-neon-green/20 active:border-neon-green transition-all duration-150`}
        >
          <Icon size={24} />
        </button>
      ))}
    </div>
  );
}
