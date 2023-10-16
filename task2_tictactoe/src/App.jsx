import { useEffect, useState } from 'react';
import './App.scss';
import Board from './components/Board';

function checkGame(board) {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [board[a], combo];
    } else if (!board.includes(null)) {
      return ['draw', []];
    }
  }
  return [];
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const [message, setMessage] = useState('Start');
  const [winner, setWinner] = useState(null);
  const [winSquares, setWinSquares] = useState([]);

  useEffect(() => {
    const [winner, winSquares] = checkGame(board);
    if (!winner) return;

    if (winner === 'draw') setMessage("It's a draw");
    else setMessage(`${winner} wins`);

    setWinSquares(winSquares);
    setWinner(winner);
  }, [board]);

  function handleClick(i) {
    if (winner) return;
    if (board[i]) return;

    const newBoard = [...board];
    newBoard[i] = turn;
    setBoard(newBoard);
    setTurn(turn === 'X' ? 'O' : 'X');
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
    setWinSquares([]);
    setMessage('Start');
  }

  return (
    <>
      <header className="header">
        <h1>Tic-Tac-Toe</h1>
      </header>
      <main className="main">
        <h2 className={`message ${winner ? 'winner' : ''}`}>{message}</h2>
        <Board squares={board} onClick={handleClick} winSquares={winSquares} />
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </main>
    </>
  );
}

export default App;
