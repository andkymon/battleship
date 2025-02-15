import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const testGameboard = new Gameboard();
const testShip = new Ship(3);
const testShip2 = new Ship(3);
const testShip3 = new Ship(3);
const testShip4 = new Ship(4);

describe("constructor()", () => {
    test("should initialize 10x10 2D array filled with null, representing the board", () => {
        const sampleArray = new Array(10).fill(null).map(() => new Array(10).fill(null));
        expect(testGameboard.board).toStrictEqual(sampleArray);
    });
});

describe("placeShip()", () => {
    test("should not allow ship placement when a ship hits an invalid coordinate", () => {
        expect(testGameboard.placeShip(testShip, 0, 9, false)).toBe("Out of bounds.");
    });

    test("should place ship vertically when isVertical === true", () => { 
        testGameboard.placeShip(testShip, 1, 5, false);
        expect(testGameboard.board[1]).toStrictEqual([null, null, null, null, null, testShip, testShip, testShip, null, null]);
    });
    
    test("should place ship vertically when isVertical === false", () => { 
        testGameboard.placeShip(testShip2, 5, 5, true);
        expect(testGameboard.board[5]).toStrictEqual([null, null, null, null, null, testShip2, null, null, null, null]);
        expect(testGameboard.board[6]).toStrictEqual([null, null, null, null, null, testShip2, null, null, null, null]);
        expect(testGameboard.board[7]).toStrictEqual([null, null, null, null, null, testShip2, null, null, null, null]);
    });

    test("should not allow ship placement on occupied cells or cells surrounding a ship", () => { 
        expect(testGameboard.placeShip(testShip3, 6, 5, false)).toBe("Space already occupied.");
    });

    test("should allow ship placement on edges", () => { 
        testGameboard.placeShip(testShip4, 0, 0, false);
        expect(testGameboard.board[0]).toStrictEqual([testShip4, testShip4, testShip4, testShip4, null, null, null, null, null, null]);
    });
});

describe("receiveAttack()", () => {
    test("should not allow attack on an invalid coordinate", () => {
        expect(testGameboard.receiveAttack(-1, -1)).toBe("Out of bounds.");
        expect(testGameboard.receiveAttack(10, 10)).toBe("Out of bounds.");
    });
    
    test("cell displays 'X' if attack misses", () => {
        testGameboard.receiveAttack(5, 0);
        expect(testGameboard.board[5]).toStrictEqual(["X", null, null, null, null, testShip2, null, null, null, null]);

        testGameboard.receiveAttack(5, 1);
        expect(testGameboard.board[5]).toStrictEqual(["X", "X", null, null, null, testShip2, null, null, null, null]);
    });

    test("cell displays 'O' if attack hits a ship", () => {
        testGameboard.receiveAttack(6, 5);
        expect(testGameboard.board[6]).toStrictEqual([null, null, null, null, null, "O", null, null, null, null]);
    });

    test("should not allow attacks on attacked cells", () => {
        expect(testGameboard.receiveAttack(6, 5)).toStrictEqual("Cell already hit.");
    });
    
    test("should increment a ship's hitCounter when hit", () => {
        expect(testShip2.hitCounter).toStrictEqual(1);
        testGameboard.receiveAttack(7, 5);
        expect(testShip2.hitCounter).toStrictEqual(2);
    });

    //if all ship cells are hit, ship issunk must return true, with hitcounter matching its length
});

//If ship issunk, check all gameboard ships
//ship must have placed property when placed