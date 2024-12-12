import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [matrix, setMatrix] = useState(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true);
  const [won, setWon] = useState(null);
  const [isTie, SetIsTie] = useState(false);

  const handleClick = (e) => {
    const pos = e.target.id;
    if (matrix[pos] || won) return;
    const copyMatrx = [...matrix];
    copyMatrx[pos] = isXTurn ? "X" : "O";
    setMatrix(copyMatrx);
    setIsXTurn((prevValue) => !prevValue)
  }

  const decideWinner = () => {
    // Winning combinations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (matrix[a] && matrix[a] === matrix[b] && matrix[a] === matrix[c]) {
        setWon(matrix[a]);
      }
    }
    if (!matrix.includes(null) && !won) {
      SetIsTie(true);
    }
  }

  useEffect(() => {
    decideWinner();
    // eslint-disable-next-line
  }, [matrix])

  const handleReset = () => {
    setMatrix(Array(9).fill(null));
    setIsXTurn(true);
    setWon(null);
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board" onClick={handleClick}>
        {
          matrix.map((item, index) => {
            return (
              <div key={index} id={index} className='box'>{item}</div>
            )
          })
        }
      </div>
      <div className="game-info">
        <button onClick={handleReset}>Reset</button>
        <div>Player Turn: {isXTurn ? "X" : "O"} </div>
        {
          won && <div>Player {won} won the Game</div>
        }
        {
          isTie && <div>Game is Tie. Please try again</div>
        }
      </div>
    </div>
  );
}

export default App;
