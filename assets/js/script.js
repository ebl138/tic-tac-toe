// Add event listener to detect when full DOM loaded
document.addEventListener("DOMContentLoaded", function(){
    let grid = document.getElementsByClassName('grid-area')[0];
    let infoBar = document.getElementById('info-bar');

    // 'row of grid.children' gets each row in grid
    for (let row of grid.children){
        // 'box of row.children' gets each box in row
        for (let box of row.children){
            // Add event listener to each box to listen for 'click'
            box.addEventListener('click', function(){
                // If box is empty then run game
                if (this.innerHTML === ''){
                    runGame(box);
                // If box isn't empty, display message informing user
                } else {
                    if (checkScore() === 'x'){
                        infoBar.textContent = 'X has already won! Press Restart to play again.';
                    }
                    else if (checkScore() === 'o'){
                        infoBar.textContent = 'O has already won! Press Restart to play again.';
                    } else {
                        infoBar.textContent = 'That box isn\'t empty! Please choose an empty box.';
                    }
                }
            });
        }
    }
});

/**
 * Function that runs game to place Xs and Os in boxes and
 * called when event listener is fired after 'click on box
 */
function runGame(box){
    let infoBar = document.getElementById('info-bar');

    // If an empty box is clicked again, it is required to check if the game has already been won
    if (checkScore() === 'x'){
        infoBar.textContent = 'X has already won! Press Restart to play again.';
        return;
    }

    if (checkScore() === 'o'){
        infoBar.textContent = 'O has already won! Press Restart to play again.';
        return;
    }

    if (playerMode() === 1){
        takeTurn('x', box);

        if (checkScore() === 'x'){
            return;
        }

        // Wait 125 ms after player's turn to take computer's turn
        // setTimeout(() => computerTurn(), 125);
        computerTurn();

        if (checkScore() === 'o'){
            return;
        }

    } else {
        alert('2 player mode functionality yet to be implemented');
    }
}

/**
 * Returns 1 if in 1 player mode and 2 if in 2 player mode
 * @returns {number}
 */
function playerMode(){
    let is1Player = document.getElementById('1-player').checked;
    // If 1 player button selected, return 1 else (player 2 button is implicitly selected) return 2
    return(is1Player ? 1 : 2);
}

/**
 * Places icon ('x' or 'o') in clicked box 
 * @param {string} icon Icon to place in grid box, either 'x' or 'o'
 * @param {HTMLDivElement} box One of nine boxes contained within grid
 */
function takeTurn(icon, box){
    if (icon === 'x'){
        box.innerHTML = '<i class="fa-regular fa-x"></i>';
    } else {
        box.innerHTML = '<i class="fa-regular fa-o"></i>';
    }
}

/**
 * Places 'o' in randomly selected box as computer's turn
 */
function computerTurn(){
    let grid = document.getElementsByClassName('grid-area')[0];
    let emptyBoxes = [];

    // Loop to get all empty boxes and add to emptyBoxes array
    // 'row of grid.children' gets each row in grid
    for (let row of grid.children){
        // 'box of row.children' gets each box in row
        for (let box of row.children){
            if (box.innerHTML === ''){
                emptyBoxes.push(box);
            }
        }
    }
    
    // As per algorithm for computer's turn, create random number to use to index into emptyBoxes
    let randomNumber = Math.floor(Math.random() * emptyBoxes.length);
    let computerBox = emptyBoxes[randomNumber];

    takeTurn('o', computerBox);
}

/**
 * Returns 'x' if X wins and 'o' if O wins
 * @returns {string}
 */
function checkScore(){
    let rowOne, rowTwo, rowThree, colOne, colTwo, colThree, diagOne, diagThree;
    let x = '<i class="fa-regular fa-x"></i>';
    let o = '<i class="fa-regular fa-o"></i>';

    let grid = document.getElementsByClassName('grid-area')[0];
    // Column counter variable to keep track of column (used to check score in each column)
    let colCount = 0;
    let infoBar = document.getElementById('info-bar');

    // Loop to check each row and each column for three consecutive Xs or three consecutive Os
    for (let row of grid.children){
        // Gets inner HTML of three boxes in row
        let firstInRow = row.children[0].innerHTML;
        let secondInRow = row.children[1].innerHTML;
        let thirdInRow = row.children[2].innerHTML;

        // Check if X has won in row
        if (firstInRow === x && secondInRow === x && thirdInRow === x){
            infoBar.textContent = 'X wins! Press Restart to play again.';
            return 'x';
        }

        // Check if O has won in row
        if (firstInRow === o && secondInRow === o && thirdInRow === o){
            infoBar.textContent = 'O wins! Press Restart to play again.';
            return 'o';
        }

        // Gets inner HTML of three boxes in column to compare to x and o variables in belows 'if' statements
        let firstInCol = grid.children[0].children[colCount].innerHTML;
        let secondInCol = grid.children[1].children[colCount].innerHTML;
        let thirdInCol = grid.children[2].children[colCount].innerHTML;
        colCount++;

        // Check if X has won in row
        if (firstInCol === x && secondInCol === x && thirdInCol === x){
            infoBar.textContent = 'X wins! Press Restart to play again.';
            return 'x';
        }

        // Check if O has won in row
        if (firstInCol === o && secondInCol === o && thirdInCol === o){
            infoBar.textContent = 'O wins! Press Restart to play again.';
            return 'o';
        }
    }

    // Check diagonally (squares 1, 5, 9 then squares 3, 5, 9)
    let squareOne = document.getElementById('square-1').innerHTML;
    let squareFive = document.getElementById('square-5').innerHTML;
    let squareNine = document.getElementById('square-9').innerHTML;

    // Check if X has won diagonally from top left to bottom right
    if (squareOne === x && squareFive === x && squareNine === x){
        infoBar.textContent = 'X wins! Press Restart to play again.';
        return 'x';
    }

    //console.log("squareOne innerHTML: " + squareOne);
    //console.log("squareOne, squareTwo, squareThree " + (squareOne, + " " + o + "\n" + squareFive + " " + o + "\n" + squareNine + " " + o));

    // Check if O has won diagonally from top left to bottom right
    if (squareOne === o && squareFive === o && squareNine === o){
        infoBar.textContent = 'O wins! Press Restart to play again.';
        return 'o';
    }

    let squareThree = document.getElementById('square-3').innerHTML;
    let squareSeven = document.getElementById('square-7').innerHTML;

    // Check if X has won diagonally from top right to bottom left
    if (squareThree === x && squareFive === x && squareSeven === x){
        infoBar.textContent = 'X wins! Press Restart to play again.';
        return 'x';
    }

    // Check if O has won diagonally from top right to bottom left
    if (squareThree === o && squareFive === o && squareSeven === o){
        infoBar.textContent = 'O wins! Press Restart to play again.';
        return 'o';
    }
}