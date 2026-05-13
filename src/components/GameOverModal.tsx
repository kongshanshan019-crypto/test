interface GameOverModalProps {
  score: number;
  lines: number;
  level: number;
  onRestart: () => void;
  onReset: () => void;
}

export const GameOverModal = ({ score, lines, level, onRestart, onReset }: GameOverModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl text-center max-w-sm w-full mx-4 border border-gray-700">
        <h2 className="text-3xl font-bold text-red-500 mb-6">游戏结束</h2>
        
        <div className="space-y-4 mb-6">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-gray-400 text-sm">最终分数</div>
            <div className="text-4xl font-bold text-white">{score.toLocaleString()}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-gray-400 text-sm">消除行数</div>
              <div className="text-2xl font-bold text-green-400">{lines}</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-gray-400 text-sm">达到等级</div>
              <div className="text-2xl font-bold text-yellow-400">{level}</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={onRestart}
            className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors text-lg"
          >
            再来一局
          </button>
          <button
            onClick={onReset}
            className="w-full py-3 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
};