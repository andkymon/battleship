import { Player } from "./logic/player.js";
import { startShipPlacement } from "./shipPlacementPage.js";
import { placeShipsRandomly } from "./placeComputerShips.js";
import { startBattle } from "./battlePage.js";

export function gameStart() {
  const human = new Player();
  const computer = new Player();
  startShipPlacement(human);

  const handleAllShipsPlaced = () => {
    // Switch from ship placement page to battle page
    document.querySelector("#ship-placement-page").style.display = "none";
    document.querySelector("#battle-page").style.display = "flex";

    placeShipsRandomly(computer);
    startBattle(human, computer);
  };

  document.addEventListener("allShipsPlaced", handleAllShipsPlaced, {
    once: true,
  });
}
