export function createCoordinatesObject() {
    // Object with index as key, and an object with row and column properties as the value
    // Did not use array so their index stays the same even if elements are deleted
    const BOARD_SIZE = 10 * 10; // Board is a 10x10 grid.
    const coordinates = {};
  
    for (let i = 0; i < BOARD_SIZE; i++) {
      const row = Math.floor(i / 10)
      const col = i % 10;
      coordinates[`${row}${col}`] = { row, col };
    }
  
    return coordinates;
}