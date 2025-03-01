import { isShip } from "../isShip";

describe("isShip", () => {
    test("returns true if the argument passed is not null or string", () => {
        expect(isShip({})).toBe(true);
    });
    test("returns false if the argument passed is a string", () => {
        expect(isShip("test")).toBe(false);
    });
    test("returns true if the argument passed is null", () => {
        expect(isShip(null)).toBe(false);
    });
});