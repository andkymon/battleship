import { isValidCoordinates } from "../isValidCoordinates";

describe("isValidCoordinates", () => {
    test("should return true when both numbers are more than 0 and less than 9", () => {
        expect(isValidCoordinates(0,0)).toBe(true);
        expect(isValidCoordinates(5,6)).toBe(true);
        expect(isValidCoordinates(9,9)).toBe(true);
    });

    test("should return false when one number or both is less than 0", () => {
        expect(isValidCoordinates(0,-1)).toBe(false);
        expect(isValidCoordinates(-1,-1)).toBe(false);
    });

    test("should return false when one number or both is more than 9", () => {
        expect(isValidCoordinates(9,10)).toBe(false);
        expect(isValidCoordinates(10,10)).toBe(false);
    });
  });