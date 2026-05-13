interface GameBoardProps {
  board: number[][];
  colorMap: Record<number, string>;
}

export const GameBoard = ({ board, colorMap }: GameBoardProps) => {
  return (
    <div className="bg-gray-900 p-1 rounded-lg shadow-2xl border-4 border-gray-700">
      <div 
        className="grid gap-px bg-gray-800"
        style={{
          gridTemplateColumns: `repeat(${board[0]?.length || 10}, 1fr)`,
          width: '300px',
          height: '600px',
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-full aspect-square rounded-sm transition-all duration-100"
              style={{
                backgroundColor: cell ? colorMap[cell] : 'rgba(0, 0, 0, 0.3)',
                boxShadow: cell 
                  ? `0 0 10px ${colorMap[cell]}80, inset 0 1px 0 rgba(255,255,255,0.3)` 
                  : 'none',
                border: cell ? `1px solid ${colorMap[cell]}60` : 'none',
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};