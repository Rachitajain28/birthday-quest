import { useEffect, useState } from "react";
import puzzleImage from "../assets/puzzle.jpeg";
import "./Puzzle.css";

interface Piece {
  id: number;
  currentPosition: number;
}

interface PuzzleProps {
  onComplete: () => void;
}

const GRID_SIZE = 4;
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;

function shufflePieces(): Piece[] {
  const pieces: Piece[] = [];

  for (let i = 0; i < TOTAL_PIECES; i++) {
    pieces.push({
      id: i,
      currentPosition: i,
    });
  }

  // Shuffle using Fisher-Yates
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
  }

  // Make sure the puzzle isn't accidentally already solved
  const isSolved = pieces.every(
    (piece, index) => piece.id === index
  );

  if (isSolved) {
    [pieces[0], pieces[1]] = [pieces[1], pieces[0]];
  }

  return pieces;
}

function Puzzle({ onComplete }: PuzzleProps) {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setPieces(shufflePieces());
  }, []);

  const handlePieceClick = (position: number) => {
    if (isCompleted) return;

    // First piece selected
    if (selectedPiece === null) {
      setSelectedPiece(position);
      return;
    }

    // Clicking the same piece again
    if (selectedPiece === position) {
      setSelectedPiece(null);
      return;
    }

    // Swap the two pieces
    setPieces((currentPieces) => {
      const newPieces = [...currentPieces];

      [newPieces[selectedPiece], newPieces[position]] = [
        newPieces[position],
        newPieces[selectedPiece],
      ];

      // Check if solved
      const solved = newPieces.every(
        (piece, index) => piece.id === index
      );

      if (solved) {
        setIsCompleted(true);

        setTimeout(() => {
          onComplete();
        }, 1800);
      }

      return newPieces;
    });

    setSelectedPiece(null);
  };

  return (
    <div className="puzzle-container">

      <div className="puzzle-header">
        <p className="puzzle-level">LEVEL 2</p>

        <h1>🧩 Put Us Back Together</h1>

        <p>
          Click two pieces to swap them.
          <br />
          Can you rebuild the memory?
        </p>
      </div>

      <div className="puzzle-board">

        {pieces.map((piece, position) => {

          const row = Math.floor(piece.id / GRID_SIZE);
          const column = piece.id % GRID_SIZE;

          return (
            <button
              key={position}
              className={`puzzle-piece ${
                selectedPiece === position ? "selected" : ""
              } ${
                isCompleted ? "completed-piece" : ""
              }`}
              onClick={() => handlePieceClick(position)}
              style={{
                backgroundImage: `url(${puzzleImage})`,
                backgroundSize: `${GRID_SIZE * 100}% ${
                  GRID_SIZE * 100
                }%`,
                backgroundPosition: `${
                  column * (100 / (GRID_SIZE - 1))
                }% ${
                  row * (100 / (GRID_SIZE - 1))
                }%`,
              }}
              aria-label={`Puzzle piece ${piece.id + 1}`}
            />
          );
        })}

        {isCompleted && (
          <div className="puzzle-success">
            <div className="success-icon">✨</div>

            <h2>MEMORY UNLOCKED!</h2>

            <p>You actually did it. ❤️</p>
          </div>
        )}

      </div>

      {!isCompleted && (
        <p className="puzzle-tip">
          💡 Click one piece, then another piece to swap them.
        </p>
      )}

    </div>
  );
}

export default Puzzle;