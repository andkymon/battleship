import { Player } from "./logic/player.js";
import { startShipPlacement } from "./shipPlacementPage.js";
import { placeShipsRandomly } from "./placeComputerShips.js";
import { startBattle } from "./battlePage.js";

export function gameStart() {
  const human = new Player();
  const computer = new Player();

  displayShipPlacementPage();
  startShipPlacement(human);

  const handleAllShipsPlaced = () => {
    displayBattlePage();
    placeShipsRandomly(computer);
    startBattle(human, computer);
  };

  // Remove any previous event listeners before adding new ones
  document.removeEventListener("allShipsPlaced", handleAllShipsPlaced);
  document.removeEventListener("gameEnd", displayEndPage);

  document.addEventListener("allShipsPlaced", handleAllShipsPlaced);
  document.addEventListener("gameEnd", displayEndPage);

  const restartButton = document.querySelector("#restart");
  restartButton.removeEventListener("click", gameStart);
  restartButton.addEventListener("click", gameStart);
}

function displayShipPlacementPage() {
    document.querySelector("#ship-placement-page").style.display = "flex";
    document.querySelector("#battle-page").style.display = "none";
    document.querySelector("#win-page").style.display = "none";
    document.querySelector("#title").style.display = "block";
    document.querySelector("#game-message").style.display = "block";
}

function displayBattlePage() {
    // Switch from ship placement page to battle page
    document.querySelector("#ship-placement-page").style.display = "none";
    document.querySelector("#battle-page").style.display = "flex";
}

function displayEndPage() {
    // Switch from battle page to end page
    document.querySelector("#battle-page").style.display = "none";
    document.querySelector("#title").style.display = "none";
    document.querySelector("#game-message").style.display = "none";
    document.querySelector("#win-page").style.display = "flex";
}