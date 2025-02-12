export class Ship{
    constructor(length) {
        if (isNaN(length) === true) {
            throw new Error("Ship length invalid.");
        }
        this.length = length;
        this.hitCounter = 0;
    }

    hit() {
        this.hitCounter++;
    }

    isSunk() {
        return this.hitCounter < this.length ? false : true;
    }
}