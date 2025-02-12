import { Gameboard } from "./gameboard";

const testGameboard = new Gameboard();

describe("constructor()", () => {
    test("should initialize a 2D array filled with null, representing the board", () => {
        const sampleArray = new Array(10).fill(new Array(10).fill(null));
        expect(testGameboard.array).toEqual(sampleArray);
    });
});