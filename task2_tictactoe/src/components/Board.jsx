import Square from './Square';

export default function Board({ squares, onClick, winSquares }) {
  const handleClick = (i) => {
    onClick(i);
  };
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => handleClick(i)}
          highlight={winSquares?.includes(i)}
        />
      ))}
    </div>
  );
}
