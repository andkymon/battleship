export function startShipPlacement(human) {
  // Used for game message display
  const shipNames = [
    "carrier",
    "battleship",
    "cruiser",
    "submarine",
    "destroyer",
  ];

  // Updated on successful ship placement
  let currentShipIndex = 0;
  let currentShip = human.gameboard.ships[currentShipIndex];

  // Used for ship orientation logic
  let isVertical = true;

  // Display current ship to be placed
  const gameMessage = document.querySelector("#game-message");
  gameMessage.textContent = `Place your ${shipNames[currentShipIndex]}`;

  // Generate grid squares
  const grid = document.querySelector(".grid");
  for (const [rowNumber, row] of human.gameboard.board.entries()) {
    for (const colNumber of row.keys()) {
      const gridSquare = document.createElement("button");
      gridSquare.classList.add("grid-square");
      gridSquare.setAttribute("data-row", rowNumber);
      gridSquare.setAttribute("data-col", colNumber);
      grid.appendChild(gridSquare);

      // Each square's event listeners
      gridSquare.addEventListener("click", () => {
        const clickResult = human.gameboard.placeShip(
          currentShip,
          rowNumber,
          colNumber,
          isVertical,
        );
        if (clickResult !== undefined) {
          gameMessage.textContent = clickResult;
          return;
        }
        applyClickedStyling(rowNumber, colNumber);
        if (allShipsPlaced()) return;
        updateCurrentShip();
      });

      gridSquare.addEventListener("mouseenter", () => {
        applyHoveredStyling(rowNumber, colNumber);
      });

      gridSquare.addEventListener("mouseleave", () => {
        clearHoveredStyling();
      });
    }
  }

  function applyClickedStyling(rowNumber, colNumber) {
    // To set which axis to increment on iterations
    const rowIncrement = isVertical ? 1 : 0;
    const colIncrement = isVertical ? 0 : 1;

    let clickedGridSquare;
    let currentRow;
    let currentCol;

    for (let i = 0; i < currentShip.length; i++) {
      currentRow = rowNumber + rowIncrement * i;
      currentCol = colNumber + colIncrement * i;
      clickedGridSquare = document.querySelector(
        `[data-row="${currentRow}"][data-col="${currentCol}"]`,
      );
      clickedGridSquare.classList.add("clicked");
    }

    clearHoveredStyling();
  }

  function updateCurrentShip() {
    currentShipIndex++;
    gameMessage.textContent = `Place your ${shipNames[currentShipIndex]}`;
    currentShip = human.gameboard.ships[currentShipIndex];
  }

  function allShipsPlaced(){
    if (currentShipIndex === 4) {
      disableGridSquares();

      // Announce that this page is done
      const allShipsPlaced = new Event("allShipsPlaced");
      document.dispatchEvent(allShipsPlaced);
      return true;
    }
    return false;
  }

  // Shared by style applying and clearing functions
  let hoveredGridSquares = [];

  // Used by "r" click event listener to determine which square is currently being hovered
  let hoveredRowIndex;
  let hoveredColIndex;

  // Allow ship rotation when "r" key is pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "r") {
      isVertical = !isVertical;
    }
    clearHoveredStyling();
    applyHoveredStyling(hoveredRowIndex, hoveredColIndex);
  });

  function applyHoveredStyling(rowNumber, colNumber) {
    // Used by "r" click event listener to determine which square is currently being hovered
    hoveredRowIndex = rowNumber;
    hoveredColIndex = colNumber;

    // To set which axis to increment on iterations
    const rowIncrement = isVertical ? 1 : 0;
    const colIncrement = isVertical ? 0 : 1;

    let hoveredGridSquare;
    let currentRow;
    let currentCol;

    for (let i = 0; i < currentShip.length; i++) {
      currentRow = rowNumber + rowIncrement * i;
      currentCol = colNumber + colIncrement * i;

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

  function disableGridSquares() {
    const gridSquares = document.querySelectorAll(".grid-square");
    for (const gridSquare of gridSquares) {
      gridSquare.disabled = true;
    }
  }
}

//document event listener for allshipsplaced
//dispatch event for next page
//next page
