import { Ship } from "./ship";
import { isValidCoordinates } from "../helpers/isValidCoordinates";
import { getAdjacentSquaresKeys } from "../helpers/getAdjacentSquares";

export class Gameboard {
    constructor() {
        this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
        this.ships= [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
        this.placedShipsCounter = 0;
    }

    placeShip(ship, row, col, isVertical) {
        const endRow = isVertical ? row + (ship.length - 1) : row;
        const endCol = isVertical ? col : col + (ship.length - 1);

        // To prevent placing ships at invalid coordinates, check the validity of the last cell the ship will occupy
        if (isValidCoordinates(endRow, endCol) === false) {
            return "Out of bounds.";  
        }

        // To prevent placing ships at occupied spaces, the cells this ship will occupy and the cells surrounding it must be null
        if (this.#isSpaceOccupied(ship, row, col, isVertical) === false) {
            return "Space already occupied."; 
        }

        // To prevent placing ship twice
        if (ship.isPlaced === true) {
            return "Ship already placed."
        }
        ship.isPlaced = true;
        this.placedShipsCounter++;

        // Keep track of ship's row, column, and orientation for other functions
        ship.firstSquareCoordinates = [row, col];
        ship.isVertical = isVertical;

        for (let i = 0; i < ship.length; i++) {
            this.board[row][col] = ship;

            // If vertical, go to next row on next iteration; If horizontal, go to next column on next iteration
            if (isVertical) {
                row++;
            } else {
                col++;
            }
        }
    }

    #isSpaceOccupied(ship, row, col, isVertical) {
        const adjacentSquaresKeys = getAdjacentSquaresKeys(ship, row, col, isVertical);
        for (const adjacentSquaresKey of adjacentSquaresKeys) {
            if (this.board[adjacentSquaresKey[0]][adjacentSquaresKey[1]] !== null) {
                return false;
            }
        }
        return true;
    }

    receiveAttack(row, col) {
        if (this.placedShipsCounter < 5) {
            return "All ships must be placed before attacking."
        }

        if (isValidCoordinates(row, col) === false) {
            return "Out of bounds.";  
        }

        if (this.board[row][col] === "X" || this.board[row][col] === "O") {
            return "Cell already hit.";  
        }

        if (this.board[row][col] === null) {
            this.board[row][col] = "X";
        } else {
            this.board[row][col].hitCounter++;
            this.board[row][col] = "O";
        }
    }

    allShipsSunk() {
        for (const ship of this.ships) {
            if (ship.isSunk === false) {
                return false;
            }
        }
        return true;
    }
}
