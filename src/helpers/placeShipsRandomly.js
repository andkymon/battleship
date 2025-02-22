import { createCoordinatesObject } from "./createCoordinatesObject";
import { selectRandomCoordinates } from "./selectRandomCoordinates";
import { getAdjacentSquaresKeys } from "./getAdjacentSquares";

export function placeShipsRandomly(player) {
  // Updated on successful ship placement
  let currentShipIndex = 0;
  let currentShip = player.gameboard.ships[currentShipIndex];

  // Pool to select coordinates to place ship on, will delete occupied coordinates here so it doesn't get selected again
  const validCoordinates = createCoordinatesObject();

  // Place ships
  while (currentShip !== undefined) {
    // Randomly assign ship orientation
    let isVertical = Math.random() < 0.5;

    // Due to length and orientation differences, each ship's valid and invalid coordinates would not be the same
    let shipSpecificValidCoordinates = { ...validCoordinates };

    // Place ships
    let selectedCoordinates;
    let result;
   
    do {
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
    } while (result !== undefined)

    const adjacentSquaresKeys = getAdjacentSquaresKeys(currentShip);
    for (const adjacentSquaresKey of adjacentSquaresKeys) {
      delete validCoordinates[adjacentSquaresKey];
    }
    currentShipIndex++;
    currentShip = player.gameboard.ships[currentShipIndex];
  }
}