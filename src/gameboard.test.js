import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

describe("constructor()", () => {
    let testGameboard;

    beforeAll(() => {
        testGameboard = new Gameboard();
    });

    test("should initialize 10x10 2D array filled with null, representing the board", () => {
        const sampleArray = new Array(10).fill(null).map(() => new Array(10).fill(null));
        expect(testGameboard.board).toStrictEqual(sampleArray);
    });

    test("should have ships property, an array of all ships", () => {
        expect(testGameboard.ships).toStrictEqual([new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)]);
    });
});

describe("placeShip()", () => {
    let testGameboard, aircraftCarrier, battleship, submarine, cruiser, destroyer;

    beforeEach(() => {
        testGameboard = new Gameboard();
        [aircraftCarrier, battleship, submarine, cruiser, destroyer] = testGameboard.ships;
    })

    test("should not allow ship placement when a ship hits an invalid coordinate", () => {
        expect(testGameboard.placeShip(aircraftCarrier, 0, 9, false)).toBe("Out of bounds.");
    });
    
    test("should place ship vertically when isVertical === true", () => { 
        testGameboard.placeShip(battleship, 5, 5, true);
        expect(testGameboard.board[5]).toStrictEqual([null, null, null, null, null, battleship, null, null, null, null]);
        expect(testGameboard.board[6]).toStrictEqual([null, null, null, null, null, battleship, null, null, null, null]);
        expect(testGameboard.board[7]).toStrictEqual([null, null, null, null, null, battleship, null, null, null, null]);
        expect(testGameboard.board[8]).toStrictEqual([null, null, null, null, null, battleship, null, null, null, null]);
    });

    test("should place ship horizontally when isVertical === false", () => { 
        testGameboard.placeShip(aircraftCarrier, 1, 5, false);
        expect(testGameboard.board[1]).toStrictEqual([null, null, null, null, null, aircraftCarrier, aircraftCarrier, aircraftCarrier, aircraftCarrier, aircraftCarrier]);
    });

    test("should not allow ship placement twice", () => { 
        testGameboard.placeShip(aircraftCarrier, 1, 5, false);
        expect(testGameboard.placeShip(aircraftCarrier, 5, 1, true)).toBe("Ship already placed.");
    });

    test("should not allow ship placement on occupied cells or cells surrounding a ship", () => { 
        testGameboard.placeShip(battleship, 5, 5, true);
        expect(testGameboard.placeShip(submarine, 6, 5, false)).toBe("Space already occupied.");
    });

    test("should allow ship placement on edges", () => { 
        testGameboard.placeShip(cruiser, 0, 0, false);
        expect(testGameboard.board[0]).toStrictEqual([cruiser, cruiser, cruiser, null, null, null, null, null, null, null]);

        testGameboard.placeShip(destroyer, 9, 8, false);
        expect(testGameboard.board[9]).toStrictEqual([null, null, null, null, null, null, null, null, destroyer, destroyer]);
    });
});

describe("receiveAttack()", () => {
    let testGameboard, destroyer;

    beforeEach(() => {
        testGameboard = new Gameboard();
        destroyer = testGameboard.ships[4];
    })
    
    test("should not allow attack on an invalid coordinate", () => {
        expect(testGameboard.receiveAttack(-1, -1)).toBe("Out of bounds.");
        expect(testGameboard.receiveAttack(10, 10)).toBe("Out of bounds.");
    });
    
    test("cell displays 'X' if attack misses", () => {
        testGameboard.receiveAttack(5, 0);
        expect(testGameboard.board[5]).toStrictEqual(["X", null, null, null, null, null, null, null, null, null]);

        testGameboard.receiveAttack(5, 1);
        expect(testGameboard.board[5]).toStrictEqual(["X", "X", null, null, null, null, null, null, null, null]);
    });

    test("cell displays 'O' if attack hits a ship", () => {
        testGameboard.placeShip(destroyer, 9, 8, false);
        testGameboard.receiveAttack(9, 9);
        expect(testGameboard.board[9]).toStrictEqual([null, null, null, null, null, null, null, null, destroyer, "O"]);
    });

    test("should not allow attacks on attacked cells", () => {
        testGameboard.receiveAttack(5, 1);
        expect(testGameboard.receiveAttack(5, 1)).toStrictEqual("Cell already hit.");
    });
    
    test("should increment a ship's hitCounter when hit", () => {
        testGameboard.placeShip(destroyer, 9, 8, false);
        testGameboard.receiveAttack(9, 8);
        expect(destroyer.hitCounter).toStrictEqual(1);
        testGameboard.receiveAttack(9, 9);
        expect(destroyer.hitCounter).toStrictEqual(2);
    });

    test("ship should be sunk when all cells are hit", () => {
        testGameboard.placeShip(destroyer, 9, 8, false);
        testGameboard.receiveAttack(9, 8);
        testGameboard.receiveAttack(9, 9);
        expect(destroyer.isSunk).toStrictEqual(true);
        expect(testGameboard.board[9]).toStrictEqual([null, null, null, null, null, null, null, null, "O", "O"]);
    });
});

describe("allShipsSunk()", () => {
    let testGameboard, aircraftCarrier, battleship, submarine, cruiser, destroyer;

    beforeAll(() => {
        testGameboard = new Gameboard();
        [aircraftCarrier, battleship, submarine, cruiser, destroyer] = testGameboard.ships;

        testGameboard.placeShip(aircraftCarrier, 0, 0, false);
        testGameboard.placeShip(battleship, 2, 0, false);
        testGameboard.placeShip(submarine, 4, 0, false);
        testGameboard.placeShip(cruiser, 6, 0, false);
        testGameboard.placeShip(destroyer, 8, 0, false);
    })

    test("returns false when a ship still stands", () => {
        expect(testGameboard.allShipsSunk()).toBe(false);
    });

    test("returns true when all ships have sunken", () => {
        // Sink Aircraft Carrier
        testGameboard.receiveAttack(0, 0);
        testGameboard.receiveAttack(0, 1);
        testGameboard.receiveAttack(0, 2);
        testGameboard.receiveAttack(0, 3);
        testGameboard.receiveAttack(0, 4);

        // Sink Battleship
        testGameboard.receiveAttack(2, 0);
        testGameboard.receiveAttack(2, 1);
        testGameboard.receiveAttack(2, 2);
        testGameboard.receiveAttack(2, 3);

        // Sink Submarine
        testGameboard.receiveAttack(4, 0);
        testGameboard.receiveAttack(4, 1);
        testGameboard.receiveAttack(4, 2);

         // Sink Cruiser
         testGameboard.receiveAttack(6, 0);
         testGameboard.receiveAttack(6, 1);
         testGameboard.receiveAttack(6, 2);

        // Sink Destroyer
        testGameboard.receiveAttack(8, 0);
        testGameboard.receiveAttack(8, 1);

        expect(testGameboard.allShipsSunk()).toBe(true);
    });
});
