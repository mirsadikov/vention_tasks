export default function Square({ value, onClick, highlight }) {
  return (
    <button
      onClick={onClick}
      className={`square ${!value ? 'square--empty' : ''} ${highlight ? 'square--highlight' : ''}`}>
      {value}
    </button>
  );
}
