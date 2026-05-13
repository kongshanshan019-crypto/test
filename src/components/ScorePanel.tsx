interface ScorePanelProps {
  score: number;
  lines: number;
  level: number;
}

export const ScorePanel = ({ score, lines, level }: ScorePanelProps) => {
  const stats = [
    { label: '分数', value: score.toString().padStart(6, '0') },
    { label: '行数', value: lines.toString().padStart(4, '0') },
    { label: '等级', value: level.toString().padStart(2, '0') },
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-xl min-w-[150px]">
      <h2 className="text-white text-lg font-bold mb-4 text-center border-b border-gray-700 pb-2">
        游戏信息
      </h2>
      {stats.map(({ label, value }) => (
        <div key={label} className="mb-3">
          <div className="text-gray-400 text-xs mb-1">{label}</div>
          <div className="text-white text-2xl font-mono font-bold">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
};