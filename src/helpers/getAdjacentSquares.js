import { isValidCoordinates } from "./isValidCoordinates";

export function getAdjacentSquaresKeys(ship, row = ship.firstSquareCoordinates[0], col = ship.firstSquareCoordinates[1], isVertical = ship.isVertical) {
  // For context, here's an example diagram of a 2-cell vertical ship (cells marked by o) with padding (cells marked by x):

  //  x x x  <- Top padding or surrounding cells (first iteration)
  //  x o x  <- Ship cells (o) with padding on both sides
  //  x o x  <- Ship cells (o) with padding on both sides
  //  x x x  <- Bottom padding or surrounding cells (last iteration)

  // All these cells must be null before placing a ship

  const adjacentSquaresKeys = [];
  // Start checking from one cell before ship's first cell (The x x x cells)
  // Each cell will only be added if not out of bounds, will skip if it is
  for (let i = -1; i <= ship.length; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = isVertical ? row + i : row + j;
      const newCol = isVertical ? col + j : col + i;

      addValidCoordinate(adjacentSquaresKeys, newRow, newCol);
    }
  }
  return adjacentSquaresKeys;
}

function addValidCoordinate(keysArray, row, col) {
  if (isValidCoordinates(row, col)) {
    keysArray.push(`${row}${col}`);
  }
}