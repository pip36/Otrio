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
  winningPlayer: Piece["color"] | null;
  currentTurn: Piece["color"];
  slots: [Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot];
  remainingPiecesByPlayer: {
    [color in Piece["color"]]: Piece[];
  };
};

const startingSlots = (): Board["slots"] => [
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

const startingPiecesByPlayer = (): Board["remainingPiecesByPlayer"] => ({
  red: [
    { color: "red", size: "small" },
    { color: "red", size: "small" },
    { color: "red", size: "small" },
    { color: "red", size: "medium" },
    { color: "red", size: "medium" },
    { color: "red", size: "medium" },
    { color: "red", size: "large" },
    { color: "red", size: "large" },
    { color: "red", size: "large" },
  ],
  blue: [
    { color: "blue", size: "small" },
    { color: "blue", size: "small" },
    { color: "blue", size: "small" },
    { color: "blue", size: "medium" },
    { color: "blue", size: "medium" },
    { color: "blue", size: "medium" },
    { color: "blue", size: "large" },
    { color: "blue", size: "large" },
    { color: "blue", size: "large" },
  ],
  yellow: [
    { color: "yellow", size: "small" },
    { color: "yellow", size: "small" },
    { color: "yellow", size: "small" },
    { color: "yellow", size: "medium" },
    { color: "yellow", size: "medium" },
    { color: "yellow", size: "medium" },
    { color: "yellow", size: "large" },
    { color: "yellow", size: "large" },
    { color: "yellow", size: "large" },
  ],
  green: [
    { color: "green", size: "small" },
    { color: "green", size: "small" },
    { color: "green", size: "small" },
    { color: "green", size: "medium" },
    { color: "green", size: "medium" },
    { color: "green", size: "medium" },
    { color: "green", size: "large" },
    { color: "green", size: "large" },
    { color: "green", size: "large" },
  ],
});

export class OtrioGame {
  private piecesByPlayer: Board["remainingPiecesByPlayer"] =
    startingPiecesByPlayer();

  private slots: Board["slots"] = startingSlots();
  private currentTurn: Piece["color"] = "red";
  private winningPlayer: Piece["color"] | null = null;

  public getBoard(): Board {
    return {
      slots: this.slots,
      remainingPiecesByPlayer: this.piecesByPlayer,
      currentTurn: this.currentTurn,
      winningPlayer: this.winningPlayer,
    };
  }

  public placePiece(
    size: "small" | "medium" | "large",
    location: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  ): void {
    const pieceToPlayIndex = this.piecesByPlayer[this.currentTurn].findIndex(
      (piece) => piece.size === size
    );

    if (pieceToPlayIndex === -1) {
      // Player does not have any pieces of that size left
      return;
    }

    if (this.slots[location][size] !== null) {
      // Slot already occupied
      return;
    }

    // Remove the piece from the player's available pieces
    this.piecesByPlayer[this.currentTurn].splice(pieceToPlayIndex, 1);

    // Place the piece on the board
    this.slots[location][size] = { color: this.currentTurn, size };

    this.detectWin();
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

  private detectWin(): void {
    // Win - All pieces in a single slot are the same color
    for (const slot of this.slots) {
      if (
        slot.small?.color &&
        slot.medium?.color &&
        slot.large?.color &&
        slot.small.color === slot.medium.color &&
        slot.medium.color === slot.large.color
      ) {
        this.winningPlayer = slot.small.color;
        return;
      }
    }

    const linesToCheck: [number, number, number][] = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    const sizes: (keyof Slot)[] = ["small", "medium", "large"];

    for (const [a, b, c] of linesToCheck) {
      const slotA = this.slots[a];
      const slotB = this.slots[b];
      const slotC = this.slots[c];

      // Win - All pieces in a line are the same color and size
      for (const size of sizes) {
        const pieceA = slotA[size];
        const pieceB = slotB[size];
        const pieceC = slotC[size];

        if (
          pieceA?.color &&
          pieceB?.color &&
          pieceC?.color &&
          pieceA.color === pieceB.color &&
          pieceB.color === pieceC.color
        ) {
          this.winningPlayer = pieceA.color;
          return;
        }
      }

      // Win - Same color in ascending size (small -> medium -> large)
      if (
        slotA.small?.color &&
        slotB.medium?.color &&
        slotC.large?.color &&
        slotA.small.color === slotB.medium.color &&
        slotB.medium.color === slotC.large.color
      ) {
        this.winningPlayer = slotA.small.color;
        return;
      }

      // Win - Same color in descending size (large -> medium -> small)
      if (
        slotA.large?.color &&
        slotB.medium?.color &&
        slotC.small?.color &&
        slotA.large.color === slotB.medium.color &&
        slotB.medium.color === slotC.small.color
      ) {
        this.winningPlayer = slotA.large.color;
        return;
      }
    }
  }
}
