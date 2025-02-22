import { Player } from "../player";
import { Gameboard } from "../gameboard";

test("should have ships property, an array of all ships", () => {
    const testPlayer = new Player();
    expect(testPlayer.gameboard).toStrictEqual(new Gameboard());
});