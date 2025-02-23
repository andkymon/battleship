import { getAdjacentSquaresKeys } from "../getAdjacentSquares";

describe("getAdjacentSquaresKeys", () => {
  test("returns correct adjacent squares for a length 2 horizontal ship at (0,0)", () => {
    const ship = { firstSquareCoordinates: [0, 0], length: 2, isVertical: false };
    const result = getAdjacentSquaresKeys(ship);

    const expected = ["00", "10", "01", "11", "02", "12"];
    expect(result.sort()).toEqual(expected.sort());
  });

  test("returns correct adjacent squares for a length 3 vertical ship at (4,5)", () => {
    const ship = { firstSquareCoordinates: [4, 5], length: 3, isVertical: true };
    const result = getAdjacentSquaresKeys(ship);

    const expected = ["34", "35", "36", "44", "45", "46", "54", "55", "56", "64", "65", "66", "74", "75", "76"];
    expect(result.sort()).toEqual(expected.sort());
  });

  test("returns correct adjacent squares for a length 3 vertical ship at (5,9)", () => {
    const ship = { firstSquareCoordinates: [5, 9], length: 3, isVertical: true };
    const result = getAdjacentSquaresKeys(ship);

    const expected = ["48", "49", "58", "59", "68", "69", "78", "79", "88", "89"];
    expect(result.sort()).toEqual(expected.sort());
  });
});