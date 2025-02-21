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
}

function displayGameMessage(string) {
  const gameMessage = document.querySelector("#game-message");
  gameMessage.textContent = string;
}

function generateGridSquares() {
  const humanGrid = document.querySelector(".human.grid");
  const computerGrid = document.querySelector(".computer.grid");

  // Clear the grid
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

function createCoordinatesObject() {
  // Object with index as key, and an object with row and column properties as the value
  // Did not use array so their index stays the same even if other elements are deleted
  const BOARD_SIZE = 10 * 10; // Board is a 10x10 grid.
  const coordinates = {};

  for (let i = 0; i < BOARD_SIZE; i++) {
    coordinates[i] = { row: Math.floor(i / 10), col: i % 10 };
  }

  return coordinates;
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
  const row = computerGridSquare.getAttribute("data-row");
  const column = computerGridSquare.getAttribute("data-col");
  const attackResult = computer.gameboard.receiveAttack(row, column);

  if (attackResult !== undefined) {
    displayGameMessage(attackResult);
    return;
  }

  displayGameMessage("");
  applyHitStyling(computer, computerGridSquare);

  // Check if human won
  if (computer.gameboard.allShipsSunk() === true) {
    const gameEndEvent = new CustomEvent("gameEnd", { detail: "Human wins." });
    document.dispatchEvent(gameEndEvent);
    return;
  }

  const computerTurn = new Event("computerTurn");
  document.dispatchEvent(computerTurn);
}

function applyHitStyling(player, gridSquare) {
  // dataset property is an object containing an element's custom data attributes
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

  // Select random coordinates from selection pool, and attack
  const randomCoordinates = selectRandomCoordinates();
  const { row, col, key } = randomCoordinates;
  human.gameboard.receiveAttack(row, col);

  // Square will be blue on miss, red on hit
  const humanGridSquare = document.querySelector(
    `.human.grid-square[data-row="${row}"][data-col="${col}"]`,
  );
  applyHitStyling(human, humanGridSquare);

  // Check if computer won
  if (human.gameboard.allShipsSunk() === true) {
    const gameEndEvent = new CustomEvent("gameEnd", {
      detail: "Computer wins.",
    });
    document.dispatchEvent(gameEndEvent);
    return;
  }

  // If not, remove from selection pool so the coordinates do not get selected again
  delete availableCoordinates[key];

  // Re-enable human clicks for human's turn
  computerGrid.classList.remove("disabled");
}

function selectRandomCoordinates() {
  const keys = Object.keys(availableCoordinates);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  availableCoordinates[randomKey].key = randomKey;
  return availableCoordinates[randomKey];
}
