import { smartAttack, resetSmartAttack } from "../smartAttack";
import { selectRandomCoordinates } from "../selectRandomCoordinates"
import { getAdjacentSquaresKeys } from "../getAdjacentSquares";

jest.mock("../selectRandomCoordinates", () => ({
    selectRandomCoordinates: jest.fn(() => ({ row: 2, col: 2 }))
}));

jest.mock("../getAdjacentSquares", () => ({
    getAdjacentSquaresKeys: jest.fn(() => ([11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43]))
}));

describe("smartAttack function", () => {
  let mockPlayer;

  beforeEach(() => {
    resetSmartAttack();
    mockPlayer = {
      gameboard: {
        board: [
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null]
        ],
        receiveAttack: jest.fn()
      }
    };
  });

  test("mode 0: should perform a random attack", () => {
    const attack = smartAttack(mockPlayer);
    expect(attack).toEqual([2, 2]);
    expect(mockPlayer.gameboard.receiveAttack).toHaveBeenCalledWith(2, 2);
  });

  test("mode 1: should check right down left up when a hit is found", () => {
    mockPlayer.gameboard.board[2][2] = "O"; // Mode 1 hit, switch to mode 2
    smartAttack(mockPlayer);

    // Since 0, 0 is hit it should check right next (0, 1)
    mockPlayer.gameboard.board[2][3] = "X";
    smartAttack(mockPlayer);
    expect(mockPlayer.gameboard.receiveAttack).toHaveBeenCalledWith(2, 3);

    // On miss, check next direction (down)
    mockPlayer.gameboard.board[3][2] = "O";
    smartAttack(mockPlayer);
    expect(mockPlayer.gameboard.receiveAttack).toHaveBeenCalledWith(3, 2);
  });

  test("mode 2: keep attacking direction of hit", () => {
    // Simulate a hit on 2, 2 
    mockPlayer.gameboard.board[2][2] = "O";
    mockPlayer.gameboard.board[2][3] = "X";
    mockPlayer.gameboard.board[3][2] = "O"; // Mode 1 hit, switch to mode 2
    smartAttack(mockPlayer);
    smartAttack(mockPlayer);
    smartAttack(mockPlayer);

    // Since hit is down, should continue searching down
    smartAttack(mockPlayer);
    expect(mockPlayer.gameboard.receiveAttack).toHaveBeenCalledWith(4, 2);
  });

  test("mode 3: keep attacking opposite direction of mode 2 from first square hit", () => {
    mockPlayer.gameboard.board[2][2] = "O";
    mockPlayer.gameboard.board[2][3] = "X";
    mockPlayer.gameboard.board[3][2] = "O";
    mockPlayer.gameboard.board[4][2] = "X"; // Mode 2 miss, switch to mode 3
    smartAttack(mockPlayer);
    smartAttack(mockPlayer);
    smartAttack(mockPlayer);
    smartAttack(mockPlayer);

    // Since attack mode 2 has missed on [4, 2], switch to attack mode 3
    // Must go to opposite direction of attack mode 2, from first square hit (2,2)
    smartAttack(mockPlayer);
    expect(mockPlayer.gameboard.receiveAttack).toHaveBeenCalledWith(1, 2);
  });

  test("should reset to mode 0 when mode 3 misses", () => {
    mockPlayer.gameboard.board[2][2] = "O";
    mockPlayer.gameboard.board[2][3] = "X";
    mockPlayer.gameboard.board[3][2] = "O";
    mockPlayer.gameboard.board[4][2] = "X"; 
    mockPlayer.gameboard.board[1][2] = "O"; 
    mockPlayer.gameboard.board[0][2] = "X"; // Mode 3 miss, switch to mode 0

    smartAttack(mockPlayer);
    smartAttack(mockPlayer);
    smartAttack(mockPlayer);
    smartAttack(mockPlayer);
    smartAttack(mockPlayer);
    smartAttack(mockPlayer);


    // Override selectRandomCoordinates just for this test
    selectRandomCoordinates.mockImplementationOnce(() => ({ row: 0, col: 0 }));

    smartAttack(mockPlayer);
    expect(mockPlayer.gameboard.receiveAttack).toHaveBeenCalledWith(0, 0);
  });
});
