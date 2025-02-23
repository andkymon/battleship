import { selectRandomCoordinates } from "../selectRandomCoordinates"; // Replace with your actual file name

describe("selectRandomCoordinates", () => {
    test("should return a random coordinate with a key property", () => {
        const availableCoordinates = {
            A1: { x: 0, y: 0 },
            B2: { x: 1, y: 1 },
            C3: { x: 2, y: 2 },
        };

        const result = selectRandomCoordinates(availableCoordinates);

        expect(result).toHaveProperty("key");
        expect(Object.keys(availableCoordinates)).toContain(result.key);
        expect(availableCoordinates[result.key]).toMatchObject(result);
    });

    test("should throw an error if the object is empty", () => {
        const availableCoordinates = {};
        expect(() => selectRandomCoordinates(availableCoordinates)).toThrow("No available coordinates.");
    });

    test("should throw an error if argument is not an object", () => {
        let availableCoordinates = () => console.log("Hello");
        expect(() => selectRandomCoordinates(availableCoordinates)).toThrow("Invalid input. selectRandomCoordinates expects an object.");

        availableCoordinates = [];
        expect(() => selectRandomCoordinates(availableCoordinates)).toThrow("Invalid input. selectRandomCoordinates expects an object.");

        availableCoordinates = "0, 1";
        expect(() => selectRandomCoordinates(availableCoordinates)).toThrow("Invalid input. selectRandomCoordinates expects an object.");
    });
});