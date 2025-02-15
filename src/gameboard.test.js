import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const testGameboard = new Gameboard();
const aircraftCarrier = testGameboard.ships[0];
const battleship = testGameboard.ships[1];
const submarine = testGameboard.ships[2];
const cruiser = testGameboard.ships[3];
const destroyer = testGameboard.ships[4];

describe("constructor()", () => {
    test("should initialize 10x10 2D array filled with null, representing the board", () => {
        const sampleArray = new Array(10).fill(null).map(() => new Array(10).fill(null));
        expect(testGameboard.board).toStrictEqual(sampleArray);
    });

    test("should have ships property, an array of all ships", () => {
        expect(testGameboard.ships).toStrictEqual([new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)]);
    });
});

describe("placeShip()", () => {
    test("should not allow ship placement when a ship hits an invalid coordinate", () => {
        expect(testGameboard.placeShip(aircraftCarrier, 0, 9, false)).toBe("Out of bounds.");
    });

    test("should place ship vertically when isVertical === true", () => { 
        testGameboard.placeShip(aircraftCarrier, 1, 5, false);
        expect(testGameboard.board[1]).toStrictEqual([null, null, null, null, null, aircraftCarrier, aircraftCarrier, aircraftCarrier, aircraftCarrier, aircraftCarrier]);
    });
    
    test("should place ship vertically when isVertical === false", () => { 
        testGameboard.placeShip(battleship, 5, 5, true);
        expect(testGameboard.board[5]).toStrictEqual([null, null, null, null, null, battleship, null, null, null, null]);
        expect(testGameboard.board[6]).toStrictEqual([null, null, null, null, null, battleship, null, null, null, null]);
        expect(testGameboard.board[7]).toStrictEqual([null, null, null, null, null, battleship, null, null, null, null]);
        expect(testGameboard.board[8]).toStrictEqual([null, null, null, null, null, battleship, null, null, null, null]);
    });

    test("should not allow ship placement twice", () => { 
        expect(testGameboard.placeShip(aircraftCarrier, 5, 1, true)).toBe("Ship already placed.");
    });

    test("should not allow ship placement on occupied cells or cells surrounding a ship", () => { 
        expect(testGameboard.placeShip(submarine, 6, 5, false)).toBe("Space already occupied.");
    });

    test("should allow ship placement on edges", () => { 
        testGameboard.placeShip(cruiser, 0, 0, false);
        expect(testGameboard.board[0]).toStrictEqual([cruiser, cruiser, cruiser, null, null, null, null, null, null, null]);
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

    test("ship should be sunk when all cells are hit", () => {
        testGameboard.receiveAttack(5, 5);
        expect(testShip2.isSunk).toStrictEqual(true);

        expect(testGameboard.board[5]).toStrictEqual(["X", "X", null, null, null, "O", null, null, null, null]);
        expect(testGameboard.board[6]).toStrictEqual([null, null, null, null, null, "O", null, null, null, null]);
        expect(testGameboard.board[7]).toStrictEqual([null, null, null, null, null, "O", null, null, null, null]);
    });
});

let x;

//constructor should create properties for each ships

//when a ship is placed, must 


//gameboard placedships property


//gameboard lost property
//If a ship issunk, check all gameboard ships
//if all ships isunk, lost property will be true


//GAME
//SHOULD NOT ALLOW ATTACKS WHEN SHIP HASNT BEEN PLACED
//SHOULD TAKE TURNS
let r;