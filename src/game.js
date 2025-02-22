import { Player } from "./logic/player.js";
import { startShipPlacement } from "./shipPlacementPage.js";
import { placeShipsRandomly } from "./placeComputerShips.js";
import { startBattle } from "./battlePage.js";

// Declared here as it is used by event listeners
let human;
let computer;

export function gameStart() {
  human = new Player();
  computer = new Player();

  // Switch from end page to ship placement page
  document.querySelector("#ship-placement-page").style.display = "block";
  document.querySelector("#win-page").style.display = "none";
  document.querySelector("#title").style.display = "block";
  document.querySelector("#game-message").style.display = "block";

  // Allow human to place their ships
  startShipPlacement(human);
}

document.addEventListener("allShipsPlaced", () => {
  // Switch from ship placement page to battle page
  document.querySelector("#ship-placement-page").style.display = "none";
  document.querySelector("#battle-page").style.display = "flex";

  // Efficiently place a computer's ships randomly
  placeShipsRandomly(computer);
  startBattle(human, computer);
});

document.addEventListener("gameEnd", (event) => {
  // Switch from battle page to end page
  document.querySelector("#battle-page").style.display = "none";
  document.querySelector("#title").style.display = "none";
  document.querySelector("#game-message").style.display = "none";
  document.querySelector("#win-page").style.display = "flex";

  // Display who won
  document.querySelector("#win-page h1").textContent = event.detail;
});

// Button to restart the game
document.querySelector("button #restart").addEventListener("click", gameStart);
