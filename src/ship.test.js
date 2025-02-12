import { Ship } from "./ship";

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

    test("should set default values for isHit and isSunk", () => {
        expect(testShip.hitCounter).toBe(0);  
        expect(testShip.isSunk).toBe(false);
    })
})

describe("hit()", ()=> {
    test("should increase number of hits in a ship", () => {
        testShip.hit();
        testShip.hit();
        expect(testShip.hitCounter).toBe(2); 
    });
})