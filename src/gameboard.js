import { Ship } from "./ship";

export class Gameboard {
    constructor() {
        // TODO: Make getter
        this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    }

    // TODO: Make Private
    isValidCoordinates(coordinates) {
        for (const value of coordinates) {
            if (value > 9 || value < 0) {
                return false;
            }
        }
        return true;
    }

    placeShip(ship, row, col, isVertical) {
        const endRow = isVertical ? row + (ship.length - 1) : row;
        const endCol = isVertical ? col : col + (ship.length - 1);

        // To prevent placing ships at invalid coordinates, check the validity of the last cell the ship will occupy
        if (this.isValidCoordinates([endRow, endCol]) === false) {
            return "Out of bounds.";  
        }

        for (let i = 0; i < ship.length; i++) {
            this.board[row][col] = ship;

            // If vertical, increment row; If horizontal, increment column
            if (isVertical) {
                row++;
            } else {
                col++;
            }
        }
    }
}