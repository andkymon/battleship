import { resetSmartAttack, smartAttack } from "../helpers/smartAttack";

// Used by other functions
let human;
let computer;

export function startBattle(player1, player2) {
  human = player1;
  computer = player2;

  displayGameMessage("");
  generateGridSquares();

  // Reset data for smart computer moves
  resetSmartAttack();
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
  const [rowSelected, colSelected] = smartAttack(human);

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
}