import React from "react";
import { useOtrioGame } from "../hooks/useOtrioGame";
import "../App.css";

const OtrioGameComponent: React.FC = () => {
  const { board, placePiece, isGameOver } = useOtrioGame();

  const handlePlacePiece = (
    size: "small" | "medium" | "large",
    location: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  ) => {
    if (!isGameOver()) {
      placePiece(size, location);
    }
  };

  return (
    <div className="otrio-game">
      <h1>Otrio Game</h1>

      {board.winningPlayer && <div>Player {board.winningPlayer} wins!</div>}

      {!board.winningPlayer && (
        <div>
          Current Turn:{" "}
          <span style={{ color: board.currentTurn }}>{board.currentTurn}</span>
        </div>
      )}
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        {board.remainingPiecesByPlayer.red.map((piece) => (
          <div
            key={`${piece.color}-${piece.size}`}
            style={{ display: "block" }}
          >
            <PieceComponent
              onClick={() => {}}
              color={piece.color}
              size={piece.size}
            />
          </div>
        ))}
      </div>

      <div
        className="game-board"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 200px)",
          justifyContent: "center",
        }}
      >
        {board.slots.map((slot, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              height: "200px",
              border: "1px solid #333",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <PieceComponent
              size="large"
              onClick={() =>
                handlePlacePiece(
                  "large",
                  index as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
                )
              }
              color={slot.large?.color}
            />

            <PieceComponent
              size="medium"
              onClick={() =>
                handlePlacePiece(
                  "medium",
                  index as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
                )
              }
              color={slot.medium?.color}
            />

            <PieceComponent
              size="small"
              onClick={() =>
                handlePlacePiece(
                  "small",
                  index as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
                )
              }
              color={slot.small?.color}
            />
          </div>
        ))}
      </div>

      <div className="player-pieces" style={{ marginTop: "20px" }}>
        <h2>Available Pieces</h2>
        {Object.entries(board.remainingPiecesByPlayer).map(
          ([color, pieces]) => (
            <div key={color} style={{ marginBottom: "10px" }}>
              <h3 style={{ color }}>{color}</h3>
              <div style={{ display: "flex", gap: "5px" }}>
                {pieces.map((piece, i) => (
                  <PieceComponent
                    onClick={() => {}}
                    color={piece.color}
                    size={piece.size}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const PieceComponent = ({
  onClick,
  size,
  color,
}: {
  onClick: () => void;
  size: "large" | "medium" | "small";
  color?: string;
}) => {
  const sizeToPixels = {
    large: 190,
    medium: 100,
    small: 20,
  };

  const thickness = 20;

  return (
    <>
      <div
        onClick={() => onClick()}
        style={{
          position: "absolute",
          width: `${sizeToPixels[size]}px`,
          height: `${sizeToPixels[size]}px`,
          borderRadius: "50%",
          border: "1px solid #ccc",
        }}
      >
        {color && (
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: `${thickness / 2}px solid ${color}`,
              boxSizing: "border-box",
            }}
          />
        )}
      </div>
      <div
        style={{
          position: "absolute",
          width: `${sizeToPixels[size] - thickness}px`,
          height: `${sizeToPixels[size] - thickness}px`,
          borderRadius: "50%",
          border: "1px solid #ccc",
        }}
      />
    </>
  );
};

export default OtrioGameComponent;
