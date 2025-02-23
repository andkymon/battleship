import { placeShipsRandomly } from "../placeShipsRandomly";
import { Player } from "../../logic/player"

// Mock Player and Gameboard classes
const mockPlayer = new Player();

describe("placeShipsRandomly", () => {
  test("should place all ships on board without errors", () => {
    placeShipsRandomly(mockPlayer);
  
    expect(mockPlayer.gameboard.placedShipsCounter).toBe(5);
    expect(mockPlayer.gameboard.ships).toHaveLength(5); // Ensure placedShipsCounter matches the total ships
    expect(mockPlayer.gameboard.ships.every(ship => ship.isPlaced)).toBe(true); // Ensure all are placed
  });
});
