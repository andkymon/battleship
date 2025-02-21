
import { Player } from "./logic/player.js";
import { startShipPlacement } from "./shipPlacementPage.js";
import { placeShipsRandomly } from "./placeComputerShips.js";
import { startBattle } from "./battlePage.js";

export function gameStart() {
    const human = new Player();
    const computer = new Player();
    startShipPlacement(human);

    document.addEventListener("allShipsPlaced", () => {
        // Switch from ship placement page to battle page
        const shipPlacementPage = document.querySelector("#ship-placement-page");
        const battlePage = document.querySelector("#battle-page");

        shipPlacementPage.style.display = "none";
        battlePage.style.display = "flex";

        placeShipsRandomly(computer);
        startBattle(human, computer);
    });
};


