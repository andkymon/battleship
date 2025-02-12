import { Ship } from "./ship";

export class Gameboard {
    constructor() {
        this.board = new Array(10).fill(new Array(10).fill(null));
    }

    isValidCoordinates(coordinates) {
        for (const value of coordinates) {
            if (value > 9 || value < 0) {
                return false;
            }
        }
        return true;
    }

    placeShip(ship, col, row, isVertical) {
        const rowIncrement = isVertical ? 1 : 0;
        const colIncrement = isVertical ? 0 : 1;

        for (let i = 0; i < ship.length; i++) {
            this.board[row][col] = ship;
            row += rowIncrement;
            col += colIncrement;
        }
    }
}