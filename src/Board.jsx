import { useState } from "react";
import "./board.css";
const Squares = ({ val, onClickSquare }) => {
  return (
    <button
      className="square btn btn-accent btn-lg text-white"
      onClick={onClickSquare}
    >
      {val}
    </button>
  );
};

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const reset = () => {
    setSquares(Array(9).fill(null));
    setIsNextX(true);
  };
  /**
   * Give condition after print "X" next Print "O"
   */
  const [isNextX, setIsNextX] = useState(true);
  const handleClick = (i) => {
    /**
     * Reject if square have a value
     */
    if (squares[i] !== null || winnerCalculate(squares)) {
      return;
    }
    const newSquares = squares.slice();
    isNextX ? (newSquares[i] = "X") : (newSquares[i] = "O");
    /**
     * Perbarui Array squares melalui setSquares
     */
    setSquares(newSquares);
    setIsNextX(!isNextX);
  };

  const squareComponents = [];
  /**
   * Give a flag like "onClickSquare" for parsing information that button is clicked? execute handleClick function
   */
  for (let x = 0; x < 9; x++) {
    squareComponents.push(
      <Squares key={x} val={squares[x]} onClickSquare={() => handleClick(x)} />
    );
  }
  // Call winner calculate function
  winnerCalculate(squares);
  let status = "";
  if (winnerCalculate(squares)) {
    status = (
      <div className="mt-4 mb-2 text-accent text-xl">
        Selamat untuk {winnerCalculate(squares)}!
      </div>
    );
  } else {
    status = (
      <div className="mt-4 mb-2">
        Saat ini giliran:{" "}
        {isNextX ? (
          <span className="text-error">X</span>
        ) : (
          <span className="text-primary">O</span>
        )}
      </div>
    );
  }
  return (
    <>
      <h5 className="text-xl font-bold">
        Selamat datang di Game Tic Tac Toe Ayang Akuu 🤗🤗
      </h5>
      <div className="mb-8">{status}</div>
      <div
        style={{
          width: "200px",
          height: "200px",
          display: "flex",
          flexWrap: "wrap",
          gap: "2px",
        }}
        className="mb-5"
      >
        {squareComponents}
      </div>
      <button className="btn btn-neutral mt-10" onClick={reset}>
        Reset
      </button>
    </>
  );
}

/**
 * Make a function to handle the winners
 */

const winnerCalculate = (squares) => {
  const list = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < list.length; i++) {
    const [a, b, c] = list[i];

    if (squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return false;
};
