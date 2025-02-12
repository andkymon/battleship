export class Ship{
    constructor(length) {
        if (isNaN(length) === true) {
            throw new Error("Ship length invalid.");
        }
        this.length = length;
        this.hitCounter = 0;
        this.isSunk = false;
    }

    hit() {
        this.hitCounter++;
    }
}