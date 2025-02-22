import { createCoordinatesObject } from "./helpers/createCoordinatesObject";
import { resetSmartAttackData, smartSelectCoordinates, setShip, updateAttackMode } from "./helpers/smartAttack";

// Used by other functions
let human;
let computer;
let availableCoordinates;

export function startBattle(player1, player2) {
  human = player1;
  computer = player2;

  displayGameMessage("");
  generateGridSquares();

  // Used to keep track of coordinates the computer has not selected yet
  availableCoordinates = createCoordinatesObject();
  resetSmartAttackData();
}

function displayGameMessage(string) {
  const gameMessage = document.querySelector("#game-message");
  gameMessage.textContent = string;
}

function generateGridSquares() {
  const humanGrid = document.querySelector(".human.grid");
  const computerGrid = document.querySelector(".computer.grid");

  // Clear the grids
  humanGrid.replaceChildren();
  computerGrid.replaceChildren();

  for (const [rowNumber, row] of human.gameboard.board.entries()) {
    for (const colNumber of row.keys()) {
      const humanGridSquare = createHumanGridSquare(rowNumber, colNumber);
      humanGrid.appendChild(humanGridSquare);

      const computerGridSquare = createComputerGridSquare(rowNumber, colNumber);
      computerGrid.appendChild(computerGridSquare);
    }
  }
}

function createHumanGridSquare(rowNumber, colNumber) {
  const humanGridSquare = document.createElement("div");
  humanGridSquare.classList.add("human", "grid-square");
  humanGridSquare.setAttribute("data-row", rowNumber);
  humanGridSquare.setAttribute("data-col", colNumber);

  if (human.gameboard.board[rowNumber][colNumber] !== null) {
    humanGridSquare.classList.add("clicked");
  }

  return humanGridSquare;
}

function createComputerGridSquare(rowNumber, colNumber) {
  const computerGridSquare = document.createElement("button");
  computerGridSquare.classList.add("computer", "grid-square");
  computerGridSquare.setAttribute("data-row", rowNumber);
  computerGridSquare.setAttribute("data-col", colNumber);

  computerGridSquare.addEventListener("click", () => {
    attackComputer(computerGridSquare);
  });

  return computerGridSquare;
}

function attackComputer(computerGridSquare) {
  const { row, col } = computerGridSquare.dataset;
  const attackResult = computer.gameboard.receiveAttack(row, col);

  if (attackResult !== undefined) {
    displayGameMessage(attackResult);
    return;
  }

  displayGameMessage("");
  applyHitStyling(computer, computerGridSquare);

  // Check for win condition
  if (computer.gameboard.allShipsSunk() === true) {
    const gameEndEvent = new CustomEvent("gameEnd", { detail: "Human wins." });
    document.dispatchEvent(gameEndEvent);
    return;
  }

  const computerTurn = new Event("computerTurn");
  document.dispatchEvent(computerTurn);
}

function applyHitStyling(player, gridSquare) {
  const { row, col } = gridSquare.dataset;

  // Blue on miss, red on hit
  gridSquare.style.backgroundColor =
    player.gameboard.board[row][col] === "X" ? "blue" : "red";
}

document.addEventListener("computerTurn", attackHuman);

function attackHuman() {
  // Disable human clicks
  const computerGrid = document.querySelector(".computer.grid");
  computerGrid.classList.add("disabled");

  // Select coordinates to attack 
  const [rowSelected, colSelected] = smartSelectCoordinates(availableCoordinates);

  // If a ship is found, let smartAttack.js keep track of it for adjacency square removal
  if (human.gameboard.board[rowSelected][colSelected] !== null &&
    typeof human.gameboard.board[rowSelected][colSelected] !== "string"
  ) {
    setShip(human.gameboard.board[rowSelected][colSelected]);
  }

  human.gameboard.receiveAttack(rowSelected, colSelected);

  // smartAttack.js attack mode changes depending on result
  updateAttackMode(human.gameboard.board);

  // Styling
  const humanGridSquare = document.querySelector(
    `.human.grid-square[data-row="${rowSelected}"][data-col="${colSelected}"]`,
  );
  applyHitStyling(human, humanGridSquare);

  // Re-enable human clicks for human's turn
  computerGrid.classList.remove("disabled");

  // Check if computer won
  if (human.gameboard.allShipsSunk() === true) {
    const gameEndEvent = new CustomEvent("gameEnd", {
      detail: "Computer wins.",
    });
    document.dispatchEvent(gameEndEvent);
    return;
  }

  // If not, remove attacked square from selection pool so the coordinates do not get selected again
  delete availableCoordinates[`${rowSelected}${colSelected}`];
}