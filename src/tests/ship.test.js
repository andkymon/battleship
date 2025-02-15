import { Ship } from "../logic/ship";

let testShip;

beforeAll(() => {
    testShip = new Ship(5);
});

describe("constructor()", () => {
    test("should require length as a parameter", () => {
        expect(() => new Ship()).toThrow(); // Expect an error if no length is provided
    });

    test("should initialize a ship with required properties", () => {
        expect(testShip).toHaveProperty("length");
        expect(testShip).toHaveProperty("hitCounter");
        expect(testShip).toHaveProperty("isSunk");
    });

    test("should set default values for hitCounter to be 0", () => {
        expect(testShip.hitCounter).toBe(0);  
    })
})

describe("hit()", () => {
    test("should increase number of hits in a ship", () => {
        testShip.hit();
        testShip.hit();
        expect(testShip.hitCounter).toBe(2); 
    });
})

describe("isSunk()", () => {
    test("should return false when the number of hits are less than the ship's length", () => {
        expect(testShip.isSunk).toBe(false);
    });
})