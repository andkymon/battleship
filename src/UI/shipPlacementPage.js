const shipNames = [
  "sub sandwich",
  "burger",
  "hotdog",
  "chicken",
  "ice cream",
];

// Used by event listeners
let gameboard;
let currentShipIndex;
let currentShip;
let isVertical;
const gameMessage = document.querySelector("#game-message");
const grid = document.querySelector("#ship-placement-page .grid");

export function startShipPlacement(player) {
  gameboard = player.gameboard;
  currentShipIndex = 0;
  currentShip = gameboard.ships[currentShipIndex];
  isVertical = true;

  gameMessage.textContent = `Hide your ${shipNames[currentShipIndex]}`;

  // Clear grid before generating grid squares
  grid.replaceChildren();
  generateGridSquares();
}

function generateGridSquares() {
  for (const [rowNumber, row] of gameboard.board.entries()) {
    for (const colNumber of row.keys()) {
      const gridSquare = document.createElement("button");
      gridSquare.classList.add("grid-square");
      gridSquare.setAttribute("data-row", rowNumber);
      gridSquare.setAttribute("data-col", colNumber);
      addSquareEventListeners(gridSquare);
      grid.appendChild(gridSquare);
    }
  }
}

function addSquareEventListeners(gridSquare) {
  // Used by event listeners
  let { row, col } = gridSquare.dataset;

  // Convert string to numbers
  row = Number(row);
  col = Number(col);

  // Each square's event listeners
  gridSquare.addEventListener("click", () => {
    const clickResult = gameboard.placeShip(currentShip, row, col, isVertical);

    // placeShip method returns undefined if successful, returns message string on invalid placement
    if (clickResult !== undefined) {
      gameMessage.textContent = clickResult;
      return;
    }

    applyClickedStyling(row, col);

    if (allShipsPlaced()) {
      disableGridSquares();

      // Announce that this page is done to switch to battle page
      const allShipsPlaced = new Event("allShipsPlaced");
      document.dispatchEvent(allShipsPlaced);
      return;
    }

    // Switch to next ship to be placed
    updateCurrentShip();
  });

  gridSquare.addEventListener("mouseenter", () => {
    applyHoveredStyling(row, col);
  });

  gridSquare.addEventListener("mouseleave", () => {
    clearHoveredStyling();
    gridSquare.replaceChildren();
  });
}

function applyClickedStyling(rowNumber, colNumber) {
  // To set which axis to increment on iterations
  const rowStep = isVertical ? 1 : 0;
  const colStep = isVertical ? 0 : 1;

  let clickedGridSquare;
  let currentRow;
  let currentCol;

  // Goes down if vertical, right if horizontal
  for (let i = 0; i < currentShip.length; i++) {
    currentRow = rowNumber + rowStep * i;
    currentCol = colNumber + colStep * i;
    clickedGridSquare = document.querySelector(
      `[data-row="${currentRow}"][data-col="${currentCol}"]`,
    );
    clickedGridSquare.classList.add("clicked");
  }

  clearHoveredStyling();
}

function allShipsPlaced() {
  return currentShipIndex === 4;
}

function disableGridSquares() {
  const gridSquares = document.querySelectorAll(".grid-square");
  for (const gridSquare of gridSquares) {
    gridSquare.disabled = true;
  }
}

function updateCurrentShip() {
  currentShipIndex++;
  gameMessage.textContent = `Hide your ${shipNames[currentShipIndex]}`;
  currentShip = gameboard.ships[currentShipIndex];
}

// Used by "r" click event listener to determine which square is currently being hovered
let hoveredRowIndex = null;
let hoveredColIndex = null;

// Shared by hovered styling functions
let hoveredGridSquares = [];

function applyHoveredStyling(rowNumber, colNumber) {
  hoveredRowIndex = rowNumber;
  hoveredColIndex = colNumber;

  console.log(hoveredColIndex);

  addFoodDiv(rowNumber, colNumber);

  // To set which axis to increment on iterations
  const rowStep = isVertical ? 1 : 0;
  const colStep = isVertical ? 0 : 1;

  let hoveredGridSquare;
  let currentRow;
  let currentCol;

  // Goes down if vertical, right if horizontal
  for (let i = 0; i < currentShip.length; i++) {
    currentRow = rowNumber + rowStep * i;
    currentCol = colNumber + colStep * i;

    // Avoid style application on non existent squares
    if (currentRow > 9 || currentCol > 9) {
      return;
    }
    hoveredGridSquare = document.querySelector(
      `[data-row="${currentRow}"][data-col="${currentCol}"]`,
    );
    hoveredGridSquare.classList.add("hovered");
    hoveredGridSquares.push(hoveredGridSquare);
  }
}

function clearHoveredStyling() {
  for (const hoveredGridSquare of hoveredGridSquares) {
    hoveredGridSquare.classList.remove("hovered");
  }
  hoveredGridSquares = [];
}

function addFoodDiv(rowNumber, colNumber) {
  const gridSquare = document.querySelector(
    `[data-row="${rowNumber}"][data-col="${colNumber}"]`,
  );
  const foodDiv = document.createElement("div");
  foodDiv.classList.add("food", "sub");
  foodDiv.style.transform = isVertical ? "transform: rotate(90deg) translate(-10%, -50%)" : "none";
  gridSquare.append(foodDiv);
}

// Allow ship rotation when "r" key is pressed
document.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    isVertical = !isVertical;

    if (hoveredRowIndex === null && hoveredColIndex === null) {
      return;
    }

    const hoveredGridSquare = document.querySelector(
      `[data-row="${hoveredRowIndex}"][data-col="${hoveredColIndex}"]`,
    );

    if (hoveredGridSquare.classList.contains("hovered")) {
      clearHoveredStyling();
      hoveredGridSquare.replaceChildren();
      applyHoveredStyling(hoveredRowIndex, hoveredColIndex);
    }
  }
});

// Reset hovered square to null when pointer is outside grid
grid.addEventListener("mouseleave", () => {
  hoveredRowIndex = null;
  hoveredColIndex = null;
})
