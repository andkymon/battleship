import { Gameboard } from "./gameboard";

const testGameboard = new Gameboard();

describe("constructor()", () => {
    test("should initialize 10x10 2D array filled with null, representing the board", () => {
        const sampleArray = new Array(10).fill(new Array(10).fill(null));
        expect(testGameboard.board).toStrictEqual(sampleArray);
    });
});

describe("isValidCoordinates()", () => {
    test("should return true on valid coordinates", () => {
        expect(testGameboard.isValidCoordinates([0, 2])).toBe(true);
        expect(testGameboard.isValidCoordinates([5, 5])).toBe(true);
    });

    test("should return false on valid coordinates", () => {
        expect(testGameboard.isValidCoordinates([-1, 2])).toBe(false);
        expect(testGameboard.isValidCoordinates([10, 10])).toBe(false);
    });
});
