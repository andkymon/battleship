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
}