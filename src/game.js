
import { Player } from "./logic/player.js";
import { startShipPlacement } from "./shipPlacementPage.js";

export function gameStart() {
    const human = new Player();
    const computer = new Player();
    startShipPlacement(human);
};


