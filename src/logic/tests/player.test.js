import { Player } from "../logic/player";
import { Gameboard } from "../logic/gameboard";

test("should have ships property, an array of all ships", () => {
    const testPlayer = new Player();
    expect(testPlayer.gameboard).toStrictEqual(new Gameboard());
});