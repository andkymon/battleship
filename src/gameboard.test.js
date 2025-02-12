import { Gameboard } from "./gameboard";

const testGameboard = new Gameboard();

describe("constructor()", () => {
    test("should initialize 2 10x10 2D array sfilled with null, representing the board", () => {
        const sampleArray = new Array(10).fill(new Array(10).fill(null));
        expect(testGameboard.playerOneBoard).toEqual(sampleArray);
        expect(testGameboard.playerTwoBoard).toEqual(sampleArray);
    });
});
