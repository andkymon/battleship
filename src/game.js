import { Player } from "./logic/player.js";
import { startShipPlacement } from "./shipPlacementPage.js";
import { placeShipsRandomly } from "./placeComputerShips.js";
import { startBattle } from "./battlePage.js";

let human;
let computer;

export function gameStart() {
  human = new Player();
  computer = new Player();

  displayShipPlacementPage();
  startShipPlacement(human);
}

document.addEventListener("allShipsPlaced", handleAllShipsPlaced);
document.addEventListener("gameEnd", handleGameEnd);

const restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", gameStart);

function displayShipPlacementPage() {
  document.querySelector("#ship-placement-page").style.display = "block";
  document.querySelector("#battle-page").style.display = "none";
  document.querySelector("#win-page").style.display = "none";
  document.querySelector("#title").style.display = "block";
  document.querySelector("#game-message").style.display = "block";
}

function handleAllShipsPlaced() {
  displayBattlePage();
  placeShipsRandomly(computer);
  startBattle(human, computer);
}

function handleGameEnd(event) {
  displayEndPage();
  document.querySelector("#win-page h1").textContent = event.detail;
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
