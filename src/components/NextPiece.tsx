import { Tetromino } from '../utils/tetrominos';

interface NextPieceProps {
  piece: Tetromino | null;
}

export const NextPiece = ({ piece }: NextPieceProps) => {
  if (!piece) {
    return (
      <div className="bg-gray-800 rounded-xl p-4 shadow-xl">
        <h2 className="text-white text-lg font-bold mb-4 text-center border-b border-gray-700 pb-2">
          下一个
        </h2>
        <div className="w-20 h-20 bg-gray-900 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 text-xs">等待开始</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-xl">
      <h2 className="text-white text-lg font-bold mb-4 text-center border-b border-gray-700 pb-2">
        下一个
      </h2>
      <div className="w-20 h-20 bg-gray-900 rounded-lg p-2 flex items-center justify-center">
        <div 
          className="grid gap-px"
          style={{
            gridTemplateColumns: `repeat(${piece.shape[0].length}, 1fr)`,
          }}
        >
          {piece.shape.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-4 h-4 rounded-sm"
                style={{
                  backgroundColor: cell ? piece.color : 'transparent',
                  boxShadow: cell 
                    ? `0 0 6px ${piece.color}80, inset 0 1px 0 rgba(255,255,255,0.3)` 
                    : 'none',
                  border: cell ? `1px solid ${piece.color}60` : 'none',
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};