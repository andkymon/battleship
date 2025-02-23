import { createCoordinatesObject } from "../createCoordinatesObject";

describe("createCoordinatesObject", () => {
    test("should return an object with correct coordinates for a 10x10 board", () => {
      const coordinates = createCoordinatesObject();
      
      expect(Object.keys(coordinates)).toHaveLength(100);
      
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          const key = `${row}${col}`;
          expect(coordinates).toHaveProperty(key);
          expect(coordinates[key]).toEqual({ row, col });
        }
      }
    });
  });
  