import { isValidCoordinates } from "./isValidCoordinates";

export function getAdjacentSquaresKeys(ship, row = ship.firstSquareCoordinates[0], col = ship.firstSquareCoordinates[1], isVertical = ship.isVertical) {
  // For context, here's an example diagram of a 2-cell vertical ship (cells marked by o) with padding (cells marked by x):

  //  x x x  <- Top padding or surrounding cells (first iteration)
  //  x o x  <- Ship cells (o) with padding on both sides
  //  x o x  <- Ship cells (o) with padding on both sides
  //  x x x  <- Bottom padding or surrounding cells (last iteration)

  // All these cells must be null before placing a ship

  // If vertical, iteratively check 3 cells from left to right. If horizontal, iteratively check 3 cells from top to bottom.
  const rowStep = isVertical ? 0 : 1;
  const colStep = isVertical ? 1 : 0;

  // Start checking from one cell before ship's first cell (The x x x cells)
  if (isVertical) row--;
  else col--;

  const adjacentSquaresKeys = [];
  // Loop runs for ship.length + 2 as we have to also check the the ship's surrounding cells
  // Each cell will only be checked if not out of bounds, will skip if it is
  for (let i = 0; i < ship.length + 2; i++) {
    addValidCoordinate(adjacentSquaresKeys, row - rowStep, col - colStep); // Left (vertical) / Top (horizontal)
    addValidCoordinate(adjacentSquaresKeys, row, col); // Current cell
    addValidCoordinate(adjacentSquaresKeys, row + rowStep, col + colStep); // Right (vertical) / Bottom (horizontal)

    row += isVertical ? 1 : 0;

    // If vertical, go to next row on next iteration; If horizontal, go to next column on next iteration
    if (isVertical) row++;
    else col++;
  }
  return adjacentSquaresKeys;
}

function addValidCoordinate(keysArray, row, col) {
  if (isValidCoordinates(row, col)) {
    keysArray.push(`${row}${col}`);
  }
}