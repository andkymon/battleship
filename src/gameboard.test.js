import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const testGameboard = new Gameboard();


describe("constructor()", () => {
    test("should initialize 10x10 2D array filled with null, representing the board", () => {
        const sampleArray = new Array(10).fill(null).map(() => new Array(10).fill(null));
        expect(testGameboard.board).toStrictEqual(sampleArray);
    });
});

describe("placeShip()", () => {
    const testShip = new Ship(3);

    test("should not allow ship placement when a ship hits an invalid coordinate", () => {
        expect(testGameboard.placeShip(testShip, 0, 9, false)).toBe("Out of bounds.");
    });

    test("should place ship vertically when isVertical === true", () => { 
        testGameboard.placeShip(testShip, 1, 5, false);
        expect(testGameboard.board[1]).toStrictEqual([null, null, null, null, null, testShip, testShip, testShip, null, null]);
    });
    
    test("should place ship vertically when isVertical === false", () => { 
        const testShip2 = new Ship(3);
        testGameboard.placeShip(testShip2, 5, 5, true);
        expect(testGameboard.board[5]).toStrictEqual([null, null, null, null, null, testShip2, null, null, null, null]);
        expect(testGameboard.board[6]).toStrictEqual([null, null, null, null, null, testShip2, null, null, null, null]);
        expect(testGameboard.board[7]).toStrictEqual([null, null, null, null, null, testShip2, null, null, null, null]);
    });

    //should not allow occupation of a placed ship's cells or adjacent cells
});
