import { Ship } from "./ship";

export class Gameboard {
    constructor() {
        this.playerOneBoard = new Array(10).fill(new Array(10).fill(null));
        this.playerTwoBoard = new Array(10).fill(new Array(10).fill(null));
    }


}