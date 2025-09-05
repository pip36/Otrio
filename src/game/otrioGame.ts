export type Piece = {
  color: "red" | "blue" | "yellow" | "green";
  size: "small" | "medium" | "large";
};

export type Slot = {
  small: Piece | null;
  medium: Piece | null;
  large: Piece | null;
};

export type Board = {
  currentTurn: Piece["color"];
  slots: [Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot];
  remainingPiecesByPlayer: {
    [color in Piece["color"]]: Piece[];
  };
};

const startingSlots: Board["slots"] = [
  { small: null, medium: null, large: null },
  { small: null, medium: null, large: null },
  { small: null, medium: null, large: null },
  { small: null, medium: null, large: null },
  { small: null, medium: null, large: null },
  { small: null, medium: null, large: null },
  { small: null, medium: null, large: null },
  { small: null, medium: null, large: null },
  { small: null, medium: null, large: null },
];

const startingPiecesByPlayer: Board["remainingPiecesByPlayer"] = {
  red: [
    { color: "red", size: "small" },
    { color: "red", size: "medium" },
    { color: "red", size: "large" },
  ],
  blue: [
    { color: "blue", size: "small" },
    { color: "blue", size: "medium" },
    { color: "blue", size: "large" },
  ],
  yellow: [
    { color: "yellow", size: "small" },
    { color: "yellow", size: "medium" },
    { color: "yellow", size: "large" },
  ],
  green: [
    { color: "green", size: "small" },
    { color: "green", size: "medium" },
    { color: "green", size: "large" },
  ],
};

export class OtrioGame {
  private piecesByPlayer: Board["remainingPiecesByPlayer"] =
    startingPiecesByPlayer;

  private slots: Board["slots"] = startingSlots;
  private currentTurn: Piece["color"] = "red";

  public getBoard(): Board {
    return {
      slots: this.slots,
      remainingPiecesByPlayer: this.piecesByPlayer,
      currentTurn: this.currentTurn,
    };
  }

  public placePiece(
    _size: "small" | "medium" | "large",
    _location: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  ): void {
    this.setNextPlayerTurn();
  }

  private setNextPlayerTurn(): void {
    const getNextTurn: Record<Piece["color"], Piece["color"]> = {
      red: "blue",
      blue: "yellow",
      yellow: "green",
      green: "red",
    };

    const nextPlayersTurn = getNextTurn[this.currentTurn];
    this.currentTurn = nextPlayersTurn;
  }
}
