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

    test("should not allow ship placement on occupied cells or cells surrounding a ship", () => { 
        const testShip3 = new Ship(3);
        expect(testGameboard.placeShip(testShip3, 6, 5, false)).toBe("Space already occupied.");
    });

    test("should allow ship placement on edges", () => { 
        const testShip4 = new Ship(4);
        testGameboard.placeShip(testShip4, 0, 0, false);
        expect(testGameboard.board[0]).toStrictEqual([testShip4, testShip4, testShip4, testShip4, null, null, null, null, null, null]);
    });
});

describe("receiveAttack()", () => {
    test("should not allow attack on an invalid coordinate", () => {
        expect(testGameboard.receiveAttack(-1, -1)).toBe("Out of bounds.");
        expect(testGameboard.receiveAttack(10, 10)).toBe("Out of bounds.");
    });
    //validate coordinates
    //if attacked cell is null place X
    //if attacked cell is not null, place O
    //if attacked cell is not null, that ships hitCounter must increase
    //if all ship cells are hit, ship issunk must return true, with hitcounter matching its length
});

//If ship issunk, check all gameboard ships
//ship must have placed property when placed