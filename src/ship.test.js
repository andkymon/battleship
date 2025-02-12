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
        expect(testShip).toHaveProperty("isHit");
        expect(testShip).toHaveProperty("isSunk");
    });

    test("should set isHit and isSunk to false by default", () => {
        expect(testShip.isHit).toBe(false);
        expect(testShip.isSunk).toBe(false);
    });
})
