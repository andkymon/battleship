import { createCoordinatesObject } from "./createCoordinatesObject";
import { selectRandomCoordinates } from "./selectRandomCoordinates";
import { getAdjacentSquaresKeys } from "./getAdjacentSquares";

// Accessed by all functions
let directions, attackMode, rowSelected, colSelected, direction, initialRowSelected, initialColSelected, human, targetShip, availableCoordinates;

export function resetSmartAttack() {
  directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];
  attackMode = 0;
  rowSelected = colSelected = direction = human = initialRowSelected = initialColSelected = targetShip = null;

  // Used to keep track of coordinates the computer has not selected yet
  availableCoordinates = createCoordinatesObject();
}

export function smartAttack(playerObject) {
  // Assign argument to global variable for other functions to access
  human = playerObject;
  switch (attackMode) {
    case 0: { // Random attack
      const randomCoordinates = selectRandomCoordinates(availableCoordinates);
      const { row, col } = randomCoordinates;
      rowSelected = row;
      colSelected = col;
      break;
    }
    
    case 1: // Guess direction of ship
      direction = directions.pop();
      while (`${rowSelected + direction[0]}${colSelected + direction[1]}` in availableCoordinates === false) {
        direction = directions.pop();
      }
      rowSelected += direction[0];
      colSelected += direction[1];
      break;
      
    case 2: // Keep hitting direction of ship
      if (`${rowSelected + direction[0]}${colSelected + direction[1]}` in availableCoordinates === false) {
        attackMode = 3;
        rowSelected = initialRowSelected;
        colSelected = initialColSelected;
        direction[0] *= -1;
        direction[1] *= -1;
        smartAttack(human); // Use next attack mode (3)
      } else {
        rowSelected += direction[0];
        colSelected += direction[1];
      }
      break;
      
    case 3: // Keep hitting opposite direction
      if (`${rowSelected + direction[0]}${colSelected + direction[1]}` in availableCoordinates === false) {
        removeAdjacentSquares();
        directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];
        attackMode = 0;
        smartAttack(human); // Use next attack mode (0)
      } else {
        rowSelected += direction[0];
        colSelected += direction[1];
      }
      break;
  }

  // If a ship is found, assign it as the targetShip for removal of adjacent squares from the selection pool once done
  if (human.gameboard.board[rowSelected][colSelected] !== null && typeof human.gameboard.board[rowSelected][colSelected] !== "string") {
    targetShip = human.gameboard.board[rowSelected][colSelected];
  }

  // Had to store this for the return value as rowSelected and colSelected is updated by updateAttackMode()
  const attackedCoordinates = [rowSelected, colSelected];
  console.log(`${rowSelected}${colSelected}`);
  human.gameboard.receiveAttack(rowSelected, colSelected);
  delete availableCoordinates[`${rowSelected}${colSelected}`];
  updateAttackMode();
  

  return attackedCoordinates;
}

// Logic for next attack mode depending on result
function updateAttackMode() {
  switch (attackMode) {
    case 0:
      if (human.gameboard.board[rowSelected][colSelected] === "X") {
        attackMode = 0;
      } else if (human.gameboard.board[rowSelected][colSelected] === "O") {
        attackMode = 1;
        initialRowSelected = rowSelected;
        initialColSelected = colSelected;
      }
      break;
    case 1:
      if (human.gameboard.board[rowSelected][colSelected] === "X") {
        rowSelected = initialRowSelected;
        colSelected = initialColSelected;
      } else if (human.gameboard.board[rowSelected][colSelected] === "O") {
        attackMode = 2;
      }
      break;
    case 2:
      if (human.gameboard.board[rowSelected][colSelected] === "X") {
        attackMode = 3;
        rowSelected = initialRowSelected;
        colSelected = initialColSelected;
        direction[0] *= -1;
        direction[1] *= -1;
      }
      break;
    case 3:
      if (human.gameboard.board[rowSelected][colSelected] === "X") {
        // So case 3's if statement will trigger next time smartAttack is called, which resets it back to 0
        rowSelected = null;
        colSelected = null;
      }
      break;
  }
}

function removeAdjacentSquares() {
  const adjacentSquaresKeys = getAdjacentSquaresKeys(targetShip);
  for (const adjacentSquaresKey of adjacentSquaresKeys) {
    delete availableCoordinates[adjacentSquaresKey];
  }
}
