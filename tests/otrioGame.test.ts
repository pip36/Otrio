import { OtrioGame } from "../src/game/otrioGame";

describe("OtrioGame", () => {
  it("starting board should be correct", () => {
    const game = new OtrioGame();
    const board = game.getBoard();

    expect(board.slots).toEqual([
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
    ]);

    expect(board.remainingPiecesByPlayer).toEqual({
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
    });
  });

  it("should begin with 'reds' turn", () => {
    const game = new OtrioGame();
    const board = game.getBoard();

    expect(board.currentTurn).toBe("red");
  });

  it("should alternate turns correctly", () => {
    const game = new OtrioGame();

    expect(game.getBoard().currentTurn).toBe("red");

    game.placePiece("small", 0);
    expect(game.getBoard().currentTurn).toBe("blue");

    game.placePiece("small", 1);
    expect(game.getBoard().currentTurn).toBe("yellow");

    game.placePiece("small", 2);
    expect(game.getBoard().currentTurn).toBe("green");

    game.placePiece("small", 3);
    expect(game.getBoard().currentTurn).toBe("red");
  });
});
