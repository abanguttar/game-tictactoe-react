import { useState } from "react";

function Square({ val, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {val}
    </button>
  );
}

export default function Board() {
  /**
   * Use lifting state up to make info how the children condition
   * untuk mengetahui square/button mana yang memiliki nilai maka buat sebuah variable untuk menampung informasi tersebut
   */
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Buat kondisi pengecekan apakah selanjutnya element x atau bukan?

  const [isNextX, setIsNextX] = useState(true);

  const handleClick = (i) => {
    if (squares[i] !== null || calculateWinner(squares)) {
      return;
    }

    const newSquares = squares.slice(); //Copy array from array squares
    isNextX === true ? (newSquares[i] = "X") : (newSquares[i] = "O");

    /**
     * setSquares always updated by click button condition
     * Dengan mengubah element parent, element child akan secara otomatis mengikuti keadaan parentnya.
     * Atau konsep immutability
     **/

    setSquares(newSquares);
    /**
     * Selalu perbaru kondisi true dan false isNextX. Jika sebelumnya true ubah jadi false, dan sebaliknya
     */
    setIsNextX(!isNextX);
  };

  const winner = calculateWinner(squares);
  let status = "";
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (isNextX ? "X" : "O");
  }

  const squareComponents = [];
  for (let x = 0; x < 9; x++) {
    squareComponents.push(
      <Square val={squares[x]} onSquareClick={() => handleClick(x)} />
    );
  }

  /**
   * Square value is set by squares[] array by index. if null it will be zero
   *
   */
  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {/* If u want use loop native just call the component / variable*/}
        {squareComponents}

        {/* If u want use array map use this, dont forget if react component must have unique key */}
        {/* {squares.map((x, i) => (
          <Square key={i} val={x} onSquareClick={() => handleClick(i)} />
        ))} */}
      </div>
    </>
  );
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    /**
     * lines[0]
     * a =0; b=1;c=2;
     */
    const [a, b, c] = lines[i];
    console.log({ a, b, c });

    console.log(squares[a], squares[b], squares[c]);
    if (squares[a] === squares[b] && squares[b] == squares[c]) {
      return squares[a];
    }
  }

  return false;
};
