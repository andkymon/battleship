import { Ship } from "./ship";

export class Gameboard {
    constructor() {
        this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
        this.ships= [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
    }

    placeShip(ship, row, col, isVertical) {
        const endRow = isVertical ? row + (ship.length - 1) : row;
        const endCol = isVertical ? col : col + (ship.length - 1);

        // To prevent placing ships at invalid coordinates, check the validity of the last cell the ship will occupy
        if (this.#isValidCoordinates([endRow, endCol]) === false) {
            return "Out of bounds.";  
        }

        // To prevent placing ships at occupied spaces, the cells this ship will occupy and the cells surrounding it must be null
        if (this.#isSpaceOccupied(ship, row, col, isVertical) === false) {
            return "Space already occupied."; 
        }

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

    #isValidCoordinates(coordinates) {
        for (const value of coordinates) {
            if (value > 9 || value < 0) {
                return false;
            }
        }
        return true;
    }

    #isSpaceOccupied(ship, row, col, isVertical) {
        // For context, here's an example diagram of a 2-cell vertical ship (cells marked by o) with padding (cells marked by x):

        //  x x x  <- Top padding or surrounding cells (first iteration)
        //  x o x  <- Ship cells (o) with padding on both sides
        //  x o x  <- Ship cells (o) with padding on both sides
        //  x x x  <- Bottom padding or surrounding cells (last iteration)

        // All these cells must be null before placing a ship

        // If vertical, iteratively check 3 cells from left to right. If horizontal, iteratively check 3 cells from top to bottom. 
        const rowConstant = isVertical ? 0 : 1;
        const colConstant = isVertical ? 1 : 0;
        
        // Start checking from one cell before ship's first cell (The x x x cells)
        if (isVertical) {
            row--;
        } else {
            col--;
        }

        // Loop runs for ship.length + 2 as we have to also check the the ship's surrounding cells
        // Each cell will only be checked if not out of bounds, will skip if it is
        for (let i = 0; i < ship.length + 2; i++) {
            // Left of current cell (vertical), Top of current cell (horizontal)
            if ((this.#isValidCoordinates([row - rowConstant, col - colConstant]) &&
                this.board[row - rowConstant][col - colConstant] !== null) ||

                // Middle cell (current cell)
                (this.#isValidCoordinates([row, col]) &&
                this.board[row][col] !== null) ||

                // Right of current cell (vertical), Bottom of current cell (horizontal)
                (this.#isValidCoordinates([row + rowConstant, col + colConstant]) &&
                this.board[row + rowConstant][col + colConstant] !== null)
            ) {
                return false;
            }

            // If vertical, go to next row on next iteration; If horizontal, go to next column on next iteration
            if (isVertical) {
                row++;
            } else {
                col++;
            }
        }
        return true;
    }

    receiveAttack(row, col) {
        if (this.#isValidCoordinates([row, col]) === false) {
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
}
