import { selectRandomCoordinates } from "./helpers/selectRandomCoordinates";

// Accessed by all functions
let directions, attackMode, rowSelected, colSelected, direction, initialRowSelected, initialColSelected;

export function resetSmartAttackData() {
  directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];
  attackMode = 0;
  rowSelected = colSelected = direction = initialRowSelected = initialColSelected = null;
}

export function smartSelectCoordinates(availableCoordinates) {
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
        smartSelectCoordinates(availableCoordinates);
      } else {
        rowSelected += direction[0];
        colSelected += direction[1];
      }
      break;
      
    case 3: // Keep hitting opposite direction
      if (`${rowSelected + direction[0]}${colSelected + direction[1]}` in availableCoordinates === false) {
        resetSmartAttackData();
        smartSelectCoordinates(availableCoordinates);
      } else {
        rowSelected += direction[0];
        colSelected += direction[1];
      }
      break;
  }

  return [rowSelected, colSelected];
}

// Logic for next attack mode depending on result
export function updateAttackMode(board) {
  switch (attackMode) {
    case 0:
      if (board[rowSelected][colSelected] === "X") {
        attackMode = 0;
      } else if (board[rowSelected][colSelected] === "O") {
        attackMode = 1;
        initialRowSelected = rowSelected;
        initialColSelected = colSelected;
      }
      break;
    case 1:
      if (board[rowSelected][colSelected] === "X") {
        rowSelected = initialRowSelected;
        colSelected = initialColSelected;
      } else if (board[rowSelected][colSelected] === "O") {
        attackMode = 2;
      }
      break;
    case 2:
      if (board[rowSelected][colSelected] === "X") {
        attackMode = 3;
        rowSelected = initialRowSelected;
        colSelected = initialColSelected;
        direction[0] *= -1;
        direction[1] *= -1;
      }
      break;
    case 3:
      if (board[rowSelected][colSelected] === "X") {
        resetSmartAttackData();
      }
      break;
  }
}
