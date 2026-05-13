import { Link } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import { GameBoard } from '../components/GameBoard';
import { ScorePanel } from '../components/ScorePanel';
import { NextPiece } from '../components/NextPiece';
import { Controls } from '../components/Controls';
import { GameOverModal } from '../components/GameOverModal';

export default function Home() {
  const {
    displayBoard,
    colorMap,
    nextPiece,
    score,
    lines,
    level,
    gameStatus,
    startGame,
    pauseGame,
    resetGame,
    movePiece,
    rotate,
    hardDrop,
  } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
        <span className="text-cyan-400">俄罗斯</span>方块
      </h1>
      <Link 
        to="/spring" 
        className="mb-4 px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
      >
        🌸 查看春天图片 🌸
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <GameBoard board={displayBoard} colorMap={colorMap} />
          
          <div className="flex flex-col gap-4">
            <NextPiece piece={nextPiece} />
            <ScorePanel score={score} lines={lines} level={level} />
          </div>
        </div>
        
        <Controls
          gameStatus={gameStatus}
          onStart={startGame}
          onPause={pauseGame}
          onReset={resetGame}
          onMoveLeft={() => movePiece(-1, 0)}
          onMoveRight={() => movePiece(1, 0)}
          onMoveDown={() => movePiece(0, 1)}
          onRotate={rotate}
          onHardDrop={hardDrop}
        />
      </div>

      {gameStatus === 'idle' && (
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-2">按 <span className="text-white font-bold">Enter</span> 开始游戏</p>
        </div>
      )}

      {gameStatus === 'paused' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-gray-800 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">游戏暂停</h2>
            <p className="text-gray-400">按 <span className="text-white font-bold">P</span> 继续游戏</p>
          </div>
        </div>
      )}

      {gameStatus === 'gameover' && (
        <GameOverModal
          score={score}
          lines={lines}
          level={level}
          onRestart={startGame}
          onReset={resetGame}
        />
      )}
    </div>
  );
}