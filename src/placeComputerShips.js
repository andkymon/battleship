export function placeShipsRandomly(player) {
  // Updated on successful ship placement
  let currentShipIndex = 0;
  let currentShip = player.gameboard.ships[currentShipIndex];

  // Pool to select coordinates to place ship on, will delete occupied coordinates here so it doesn't get selected again
  const validCoordinates = createCoordinatesObject();

  // Place ships
  while (currentShip !== undefined) {
    // Randomly assign as true or false
    let isVertical = Math.random() < 0.5;

    // Due to length and orientation differences, each ship's valid and invalid coordinates would not be the same
    let shipSpecificValidCoordinates = { ...validCoordinates };

    // Place ships
    let selectedCoordinates;
    let result = null;

    while (result !== undefined) {
      selectedCoordinates = selectRandomCoordinates(
        shipSpecificValidCoordinates,
      );
      result = player.gameboard.placeShip(
        currentShip,
        selectedCoordinates.row,
        selectedCoordinates.col,
        isVertical,
      );
      // Remove from pool of valid coordinates once attempted
      delete shipSpecificValidCoordinates[selectedCoordinates.key];
    }

    const adjacentSquaresKeys = getAdjacentSquaresKeys(
      currentShip,
      selectedCoordinates.row,
      selectedCoordinates.col,
      isVertical,
    );
    for (const adjacentSquaresKey of adjacentSquaresKeys) {
      delete validCoordinates[adjacentSquaresKey];
    }
    currentShipIndex++;
    currentShip = player.gameboard.ships[currentShipIndex];
  }
}

function createCoordinatesObject() {
  // Object with index as key, and an object with row and column properties as the value
  // Did not use array so their index stays the same even if other elements are deleted
  const BOARD_SIZE = 100; // Board is a 10x10 grid
  const coordinates = {};

  for (let i = 0; i < BOARD_SIZE; i++) {
    coordinates[i] = { row: Math.floor(i / 10), col: i % 10 };
  }

  return coordinates;
}

function selectRandomCoordinates(coordinatesObject) {
  const keys = Object.keys(coordinatesObject);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  coordinatesObject[randomKey].key = randomKey;
  return coordinatesObject[randomKey];
}

function getAdjacentSquaresKeys(ship, row, col, isVertical) {
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
  if (isVertical) row--; else col--;

  const adjacentSquaresKeys = [];
  // Loop runs for ship.length + 2 as we have to also check the the ship's surrounding cells
  // Each cell will only be checked if not out of bounds, will skip if it is
  for (let i = 0; i < ship.length + 2; i++) {
    addValidCoordinate(adjacentSquaresKeys, row - rowStep, col - colStep); // Left (vertical) / Top (horizontal)
    addValidCoordinate(adjacentSquaresKeys, row, col); // Current cell
    addValidCoordinate(adjacentSquaresKeys, row + rowStep, col + colStep); // Right (vertical) / Bottom (horizontal)

    row += isVertical ? 1 : 0;

    // If vertical, go to next row on next iteration; If horizontal, go to next column on next iteration
    if (isVertical) row++; else col++;
  }
  return adjacentSquaresKeys;
}

function addValidCoordinate(keysArray, row, col) {
  if (isValidCoordinates([row, col])) {
    keysArray.push("" + row + col);
  }
}

function isValidCoordinates(coordinates) {
  return coordinates.every(value => value >= 0 && value <= 9);
}
