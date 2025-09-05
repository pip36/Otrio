import { useState, useCallback, useRef } from "react";
import { OtrioGame, Board } from "../game/otrioGame";

export function useOtrioGame() {
  const gameRef = useRef<OtrioGame>(new OtrioGame());
  const [board, setBoard] = useState<Board>(gameRef.current.getBoard());

  const placePiece = useCallback(
    (
      size: "small" | "medium" | "large",
      location: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    ) => {
      gameRef.current.placePiece(size, location);
      setBoard(gameRef.current.getBoard());
    },
    []
  );

  return {
    board,
    placePiece,
    isGameOver: () => board.winningPlayer !== null,
  };
}
