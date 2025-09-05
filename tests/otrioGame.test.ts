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

  it("should place small pieces of correct color onto board", () => {
    const game = new OtrioGame();

    game.placePiece("small", 0);
    game.placePiece("small", 1);
    game.placePiece("small", 2);
    game.placePiece("small", 3);
    expect(game.getBoard().slots).toEqual([
      { small: { color: "red", size: "small" }, medium: null, large: null },
      { small: { color: "blue", size: "small" }, medium: null, large: null },
      { small: { color: "yellow", size: "small" }, medium: null, large: null },
      { small: { color: "green", size: "small" }, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
    ]);
  });

  it("should do nothing if you try to place a piece in an already taken slot", () => {
    const game = new OtrioGame();

    game.placePiece("small", 0);
    game.placePiece("small", 0); // blue tries to play in the same slot
    expect(game.getBoard().slots).toEqual([
      { small: { color: "red", size: "small" }, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
      { small: null, medium: null, large: null },
    ]);
    expect(game.getBoard().currentTurn).toBe("blue"); // turn should not change
  });

  it("should remove played pieces from player's pool", () => {
    const game = new OtrioGame();

    game.placePiece("small", 0);
    expect(game.getBoard().remainingPiecesByPlayer.red).toEqual([
      { color: "red", size: "small" },
      { color: "red", size: "small" },
      { color: "red", size: "medium" },
      { color: "red", size: "medium" },
      { color: "red", size: "medium" },
      { color: "red", size: "large" },
      { color: "red", size: "large" },
      { color: "red", size: "large" },
    ]);

    game.placePiece("medium", 0);
    expect(game.getBoard().remainingPiecesByPlayer.blue).toEqual([
      { color: "blue", size: "small" },
      { color: "blue", size: "small" },
      { color: "blue", size: "small" },
      { color: "blue", size: "medium" },
      { color: "blue", size: "medium" },
      { color: "blue", size: "large" },
      { color: "blue", size: "large" },
      { color: "blue", size: "large" },
    ]);

    game.placePiece("large", 0);
    expect(game.getBoard().remainingPiecesByPlayer.yellow).toEqual([
      { color: "yellow", size: "small" },
      { color: "yellow", size: "small" },
      { color: "yellow", size: "small" },
      { color: "yellow", size: "medium" },
      { color: "yellow", size: "medium" },
      { color: "yellow", size: "medium" },
      { color: "yellow", size: "large" },
      { color: "yellow", size: "large" },
    ]);

    game.placePiece("large", 1);
    expect(game.getBoard().remainingPiecesByPlayer.green).toEqual([
      { color: "green", size: "small" },
      { color: "green", size: "small" },
      { color: "green", size: "small" },
      { color: "green", size: "medium" },
      { color: "green", size: "medium" },
      { color: "green", size: "medium" },
      { color: "green", size: "large" },
      { color: "green", size: "large" },
    ]);

    game.placePiece("small", 1);
    expect(game.getBoard().remainingPiecesByPlayer.red).toEqual([
      { color: "red", size: "small" },
      { color: "red", size: "medium" },
      { color: "red", size: "medium" },
      { color: "red", size: "medium" },
      { color: "red", size: "large" },
      { color: "red", size: "large" },
      { color: "red", size: "large" },
    ]);
  });

  it("should detect a win for a stack of 3 matching colors in the same slot", () => {
    const game = new OtrioGame();

    game.placePiece("small", 0); // small red in slot 0
    game.placePiece("small", 1);
    game.placePiece("small", 2);
    game.placePiece("small", 3);

    game.placePiece("medium", 0); // medium red in slot 0
    game.placePiece("medium", 1);
    game.placePiece("medium", 2);
    game.placePiece("medium", 3);

    game.placePiece("large", 0); // large red in slot 0 - should win here
    const board = game.getBoard();
    expect(board.winningPlayer).toBe("red");
  });

  it("should detect a win for a horizontal line of 3 matching colors of same size", () => {
    const game = new OtrioGame();

    game.placePiece("small", 0); // small red in slot 0
    game.placePiece("small", 3);
    game.placePiece("small", 4);
    game.placePiece("small", 5);

    game.placePiece("small", 1); // small red in slot 1
    game.placePiece("medium", 3);
    game.placePiece("medium", 4);
    game.placePiece("medium", 5);

    game.placePiece("small", 2); // small red in slot 2 - should win here

    const board = game.getBoard();
    expect(board.winningPlayer).toBe("red");
  });

  it("should detect a win for a diagonal line of 3 matching colors of same size", () => {
    const game = new OtrioGame();

    game.placePiece("medium", 0); // medium red in slot 0
    game.placePiece("small", 3);
    game.placePiece("small", 2);
    game.placePiece("small", 5);

    game.placePiece("medium", 4); // medium red in slot 4
    game.placePiece("medium", 3);
    game.placePiece("medium", 7);
    game.placePiece("medium", 5);

    game.placePiece("medium", 8); // medium red in slot 8 - should win here

    const board = game.getBoard();
    expect(board.winningPlayer).toBe("red");
  });

  it("should detect a win for a vertical line of 3 matching colors of same size", () => {
    const game = new OtrioGame();

    game.placePiece("large", 0); // large red in slot 0
    game.placePiece("small", 3);
    game.placePiece("small", 2);
    game.placePiece("small", 5);

    game.placePiece("large", 3); // large red in slot 3
    game.placePiece("medium", 3);
    game.placePiece("medium", 7);
    game.placePiece("medium", 5);

    game.placePiece("large", 6); // large red in slot 6 - should win here

    const board = game.getBoard();
    expect(board.winningPlayer).toBe("red");
  });

  it("should detect a win for a horizontal line of 3 matching colors in size order ascending", () => {
    const game = new OtrioGame();

    game.placePiece("small", 0); // small red in slot 0
    game.placePiece("small", 3);
    game.placePiece("small", 2);
    game.placePiece("small", 5);

    game.placePiece("medium", 1); // medium red in slot 1
    game.placePiece("medium", 3);
    game.placePiece("medium", 7);
    game.placePiece("medium", 5);

    game.placePiece("large", 2); // large red in slot 2 - should win here

    const board = game.getBoard();
    expect(board.winningPlayer).toBe("red");
  });

  it("should detect a win for a horizontal line of 3 matching colors in size order descending", () => {
    const game = new OtrioGame();

    game.placePiece("large", 0); // large red in slot 0
    game.placePiece("small", 3);
    game.placePiece("small", 4);
    game.placePiece("small", 5);

    game.placePiece("medium", 1); // medium red in slot 1
    game.placePiece("medium", 3);
    game.placePiece("medium", 7);
    game.placePiece("medium", 5);

    game.placePiece("small", 2); // small red in slot 2 - should win here

    const board = game.getBoard();
    expect(board.winningPlayer).toBe("red");
  });

  it("should do nothing if player does not have any of that piece left", () => {
    const game = new OtrioGame();
    game.placePiece("small", 0); // red plays a small
    game.placePiece("medium", 1); // blue
    game.placePiece("medium", 2); // yellow
    game.placePiece("medium", 3); // green
    expect(game.getBoard().currentTurn).toEqual("red");

    game.placePiece("small", 4); // red plays another small
    game.placePiece("medium", 5); // blue
    game.placePiece("medium", 6); // yellow
    game.placePiece("medium", 7); // green
    expect(game.getBoard().currentTurn).toEqual("red");

    game.placePiece("small", 8); // red plays their last small
    game.placePiece("large", 0); // blue
    game.placePiece("large", 1); // yellow
    game.placePiece("large", 2); // green
    expect(game.getBoard().currentTurn).toEqual("red");

    game.placePiece("small", 7); // Should do nothing - red has no smalls left

    expect(game.getBoard().currentTurn).toEqual("red");
    expect(game.getBoard().slots).toEqual([
      {
        small: { color: "red", size: "small" },
        medium: null,
        large: { color: "blue", size: "large" },
      },
      {
        small: null,
        medium: { color: "blue", size: "medium" },
        large: { color: "yellow", size: "large" },
      },
      {
        small: null,
        medium: { color: "yellow", size: "medium" },
        large: { color: "green", size: "large" },
      },
      {
        small: null,
        medium: { color: "green", size: "medium" },
        large: null,
      },
      { small: { color: "red", size: "small" }, medium: null, large: null },
      { small: null, medium: { color: "blue", size: "medium" }, large: null },
      { small: null, medium: { color: "yellow", size: "medium" }, large: null },
      { small: null, medium: { color: "green", size: "medium" }, large: null },
      { small: { color: "red", size: "small" }, medium: null, large: null },
    ]);
  });
});
