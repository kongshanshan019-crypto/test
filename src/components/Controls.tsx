import { GameStatus } from '../hooks/useGame';

interface ControlsProps {
  gameStatus: GameStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
  onHardDrop: () => void;
}

export const Controls = ({
  gameStatus,
  onStart,
  onPause,
  onReset,
  onMoveLeft,
  onMoveRight,
  onMoveDown,
  onRotate,
  onHardDrop,
}: ControlsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-800 rounded-xl p-4 shadow-xl">
        <h2 className="text-white text-lg font-bold mb-4 text-center border-b border-gray-700 pb-2">
          游戏控制
        </h2>
        <div className="flex flex-col gap-2">
          {gameStatus === 'idle' && (
            <button
              onClick={onStart}
              className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors"
            >
              开始游戏
            </button>
          )}
          {(gameStatus === 'playing' || gameStatus === 'paused') && (
            <>
              <button
                onClick={onPause}
                className="w-full py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-lg transition-colors"
              >
                {gameStatus === 'paused' ? '继续' : '暂停'}
              </button>
              <button
                onClick={onReset}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors"
              >
                重新开始
              </button>
            </>
          )}
          {gameStatus === 'gameover' && (
            <>
              <button
                onClick={onStart}
                className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors"
              >
                再来一局
              </button>
              <button
                onClick={onReset}
                className="w-full py-3 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors"
              >
                返回首页
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 shadow-xl">
        <h2 className="text-white text-lg font-bold mb-4 text-center border-b border-gray-700 pb-2">
          操作说明
        </h2>
        <div className="text-gray-400 text-sm space-y-2">
          <div className="flex justify-between">
            <span>← →</span>
            <span>左右移动</span>
          </div>
          <div className="flex justify-between">
            <span>↑</span>
            <span>旋转</span>
          </div>
          <div className="flex justify-between">
            <span>↓</span>
            <span>加速下落</span>
          </div>
          <div className="flex justify-between">
            <span>空格</span>
            <span>直接落底</span>
          </div>
          <div className="flex justify-between">
            <span>P</span>
            <span>暂停</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 shadow-xl md:hidden">
        <h2 className="text-white text-lg font-bold mb-4 text-center border-b border-gray-700 pb-2">
          触屏控制
        </h2>
        <div className="grid grid-cols-3 gap-2">
          <div />
          <button
            onClick={onRotate}
            className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
          >
            ↻
          </button>
          <div />
          <button
            onClick={onMoveLeft}
            className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
          >
            ←
          </button>
          <button
            onClick={onHardDrop}
            className="py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors text-xs"
          >
            落底
          </button>
          <button
            onClick={onMoveRight}
            className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
          >
            →
          </button>
          <div />
          <button
            onClick={onMoveDown}
            className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
          >
            ↓
          </button>
          <div />
        </div>
      </div>
    </div>
  );
};