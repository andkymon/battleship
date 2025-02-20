
import { Player } from "./logic/player.js";

export function gameStart() {
    const human = new Player();
    //const computer = new Player();

    placeHumanShips(human);

    console.log(human.gameboard.board);
};

function placeHumanShips(human) {
    for (const [index, ship] of human.gameboard.ships.entries()) {
        let row, col, isVertical, result;

        do {
            row = parseInt(prompt(`Select Ship#${index + 1}'s row:`));
            col = parseInt(prompt(`Select Ship#${index + 1}'s column:`));
            isVertical = prompt(`Place vertically? (y/n)`);
            
            // Convert user input to boolean (true if "y", false otherwise)
            //TODO: handle invalid input
            isVertical = isVertical.toLowerCase() === "y";

            result = human.gameboard.placeShip(ship, row, col, isVertical);
            
            if (result !== undefined) {
                alert(result);
            }
        } while (result !== undefined);
    }
}


//if vertical is empty throw new error

//TODO
//ship names


//Randomly place player 2s ships smartly

//while no one lost
//prompt player 1 for attack
//wait 3 seconds
//make computer randomly attack

//if player lost message1
//else message 2
