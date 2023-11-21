// Add event listener to detect when full DOM loaded
document.addEventListener("DOMContentLoaded", function(){
    let grid = document.getElementsByClassName('grid-area')[0];

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
                    document.getElementById('info-bar').textContent = 'That box isn\'t empty! Please choose an empty one.';
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
    alert(playerMode());
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