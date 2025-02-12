export class Ship{
    constructor(length) {
        if (isNaN(length) === true) {
            throw new Error("Ship length invalid.");
        }
        this.length = length;
        this.isHit = false;
        this.isSunk = false;
    }
}