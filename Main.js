/**
 * Define when the game is start or over.
 * @author Shuyun Zheng
 */
// Read keyboard
document.addEventListener('keydown', Keyboard);
let gameStart = false;
/**
 * Start game and reset player status
 */
function startGame() {
    player.name = document.getElementById("nameInput").value;
    player.hp = 200;
    player.mp = 50;
    player.atk = 15;
    player.def = 5;
    player.yellowKey = 0;
    player.blueKey = 0;
    player.money = 0;
    player.totalExp = 0;
    player.level = 1;
    gameStart = true;
    statusUpdate();
    drawMap();
}
document.getElementById("submitButton").addEventListener("click", startGame);
function gameOver(isWin = false){
    gameStart = false;
    if(isWin){
        alert("You win!^^");
    }else{
        alert("You died... Game over.");
    }
}
function revivePlayer() {
    // Reset player's attributes
    player.hp = 200;
    player.mp = 50;
    player.atk = 15;
    player.def = 5;
    player.yellowKey = 0;
    player.blueKey = 0;
    player.money = 0;
    player.totalExp = 0;
    player.level = 1;
    // Back to first floor
    currFloor = 0;
    Maze = Floors[currFloor];
    // Find old pos and clean
    for (let r = 0; r < Maze.length; r++) {
        for (let c = 0; c < Maze[r].length; c++) {
            if (Maze[r][c] === Tile.YOU) {
                Maze[r][c] = Tile.FLOOR;
            }
        }
    }
    // Put player to [1][1]
    Maze[1][1] = Tile.YOU;
    statusUpdate();
    drawMap();
}
