import { Player } from "../logic/player.js";
import { startShipPlacement } from "./shipPlacementPage.js";
import { placeShipsRandomly } from "../helpers/placeShipsRandomly.js";
import { startBattle } from "./battlePage.js";

// Declared here as it is used by event listeners
let human;
let computer;

export function gameStart() {
  human = new Player();
  computer = new Player();

  displayShipPlacementPage();
  startShipPlacement(human);
}

document.addEventListener("allShipsPlaced", () => {
  displayBattlePage();
  placeShipsRandomly(computer);
  startBattle(human, computer);
});

document.addEventListener("gameEnd", (event) => {
  displayEndPage();
  document.querySelector("#win-page h1").textContent = event.detail; // Display who won
});

// Button to restart the game
document.querySelector("#restart").addEventListener("click", gameStart);

function displayShipPlacementPage() {
  // Switch from end page (if restarting) to ship placement page
  document.querySelector("#win-page").style.display = "none"; 
  document.querySelector("#ship-placement-page").style.display = "block";
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