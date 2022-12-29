import React, { useState, useEffect, useCallback } from "react";
import "./Game.css";

const createEmptyBoard = () => {
  return Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ""));
};

const TicTacToe = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameStatus, setGameStatus] = useState("in progress");

  const renderCell = (row, col) => {
    let className;
    if (board[row][col] === "X") {
      className = "x";
    } else if (board[row][col] === "O") {
      className = "o";
    }
    return (
      <td onClick={() => handleClick(row, col)} className={className}>
        {board[row][col]}
      </td>
    );
  };

  const renderRow = (row) => {
    return (
      <tr>
        {renderCell(row, 0)}
        {renderCell(row, 1)}
        {renderCell(row, 2)}
      </tr>
    );
  };

  const checkWin = useCallback(() => {
    const winningCombinations = [
      // rows
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      // columns
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // diagonals
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        board[a[0]][a[1]] !== "" &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[b[0]][b[1]] === board[c[0]][c[1]]
      ) {
        return board[a[0]][a[1]];
      }
    }

    return null;
  }, [board]);

  useEffect(() => {
    const winner = checkWin();
    if (winner) {
      setGameStatus(`${winner} won`);
    } else {
      // Check for a tie
      let emptyCells = 0;
      for (let row of board) {
        for (let cell of row) {
          if (cell === "") {
            emptyCells++;
          }
        }
      }

      if (emptyCells === 0) {
        setGameStatus("tied");
      }
    }
  }, [board, checkWin, gameStatus]);

  const handleClick = (row, col) => {
    // Don't allow moves to be made when the game is over
    if (gameStatus !== "in progress") {
      return;
    }

    // Don't allow moves to be made on an already occupied cell
    if (board[row][col] !== "") {
      return;
    }

    // Update the board and switch to the other player
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[row][col] = currentPlayer;
      return newBoard;
    });
    setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  };

  const displayGameOverMessage = () => {
    if (gameStatus === "X won") {
      return <p>X wins!</p>;
    } else if (gameStatus === "O won") {
      return <p>O wins!</p>;
    } else if (gameStatus === "tied") {
      return <p>The game is a tie!</p>;
    } else {
      return null;
    }
  };

  const gameIsOver = () => {
    return (
      gameStatus === "X won" || gameStatus === "O won" || gameStatus === "tied"
    );
  };

  const displayPlayerTurn = () => {
    if (gameIsOver()) {
      return null;
    } else {
      return (
        <p>
          It's
          <span className={currentPlayer === "X" ? "x" : "o"}>
            {currentPlayer}
          </span>
          's turn
        </p>
      );
    }
  };

  const displayMovePrompt = () => {
    if (gameIsOver()) {
      return null;
    } else {
      return <p>Click on a cell to make a move</p>;
    }
  };

  const displayGameOverPrompt = () => {
    if (gameIsOver()) {
      return (
        <p>
          The game is over. Click the "New game" button to start a new game.
        </p>
      );
    } else {
      return null;
    }
  };

  const handleRestart = () => {
    // Determine the starting player based on the previous game's result
    let startingPlayer;
    if (gameStatus === "X won") {
      startingPlayer = "O";
    } else if (gameStatus === "O won") {
      startingPlayer = "X";
    } else {
      startingPlayer = currentPlayer === "X" ? "O" : "X";
    }

    // Reset game state variables
    setBoard(createEmptyBoard());
    setCurrentPlayer(startingPlayer);
    setGameStatus("in progress");
  };

  const NewGameButton = () => (
    <button onClick={handleRestart} style={{ marginBottom: 10 }}>
      New game
    </button>
  );

  return (
    <div className="game">
      <div>{displayGameOverPrompt()}</div>
      <div>{displayMovePrompt()}</div>
      <div>{displayPlayerTurn()}</div>
      <div>{displayGameOverMessage()}</div>
      {gameStatus !== "in progress" ? <NewGameButton /> : null}
      <table>
        <tbody>
          {renderRow(0)}
          {renderRow(1)}
          {renderRow(2)}
        </tbody>
      </table>
    </div>
  );
};

export default TicTacToe;
