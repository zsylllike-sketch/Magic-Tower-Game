/**
 * Define when the game is start or over.
 * @author Shuyun Zheng
 */
// Read keyboard
document.addEventListener('keydown', Keyboard);
let gameStart = false;
function resetFloors() {
    // A copy of mazes as the original templates
    Floors[0] = Maze1.map(row => row.slice());
    Floors[1] = Maze2.map(row => row.slice());
    Floors[2] = Maze3.map(row => row.slice());
    Floors[3] = Maze4.map(row => row.slice());
    Floors[4] = Maze5.map(row => row.slice());
    Floors[5] = Maze6.map(row => row.slice());
}
function saveGame(){
    let floorsCopy;
    floorsCopy = Floors;
    const state = {player:{
        name: player.name,
        hp: player.hp,
        mp: player.mp,
        atk: player.atk,
        def: player.def,
        yellowKey: player.yellowKey,
        blueKey: player.blueKey,
        money: player.money,
        totalExp: player.totalExp,
        level: player.level,
        },
        currFloor: currFloor,
        floors: floorsCopy,
        gameStart: gameStart,
    };
    // Save curr game to localstorage, using json to change to string
    localStorage.setItem('gameSave', JSON.stringify(state));
    alert("Game saved successfully^^");
}
function loadGame(){
    // Try to load game, if no saves before
    const before = localStorage.getItem('gameSave');
    if(!before){
        return false;
    }
    try{
        const game = JSON.parse(before);
        // Restore player
        const p = game.player;
        player.name = p.name;
        player.hp = p.hp;
        player.mp = p.mp;
        player.atk = p.atk;
        player.def = p.def;
        player.yellowKey = p.yellowKey;
        player.blueKey  = p.blueKey;
        player.money = p.money;
        player.totalExp = p.totalExp;
        player.level = p.level;
        // Restore floor index
        currFloor = game.currFloor;
        Maze = Floors[currFloor];
        // Update UI
        gameStart = true;
        statusUpdate();
        drawMap();
        return true;
    }catch (e) {
        console.error("Failed to load:", e);
        return false;
    }
}
/**
 * Start game and reset player status
 */
function newGame() {
    player.name = document.getElementById("nameInput").value || 'Traveler';
    // Set player stats
    player.hp = 200;
    player.mp = 50;
    player.atk = 15;
    player.def = 5;
    player.yellowKey = 0;
    player.blueKey = 0;
    player.money = 0;
    player.totalExp = 0;
    player.level = 1;
    // Set floor to floor 1 with original layout
    resetFloors();
    currFloor = 0;
    Maze = Floors[currFloor];
    gameStart = true;
    statusUpdate();
    drawMap();
    // Only can use continue button after a new game
    const continueButton = document.getElementById("continueButton");
    if (continueButton) {
        continueButton.disabled = false;
    }
}
function manualSave() {
    if (!gameStart) {
        alert("Game has not started yet. Start a New Game first.");
        return;
    }
    saveGame();
}
function continueGame(){
    const cont = loadGame();
    if (cont === false) {
        alert("No saved game found. Please start a new game first!TAT");
        return;
    }
    alert("You return. The tower remembers.");
}
const newGameButton = document.getElementById("newGameButton");
const saveButton = document.getElementById("saveButton");
const continueButton = document.getElementById("continueButton");
if (newGameButton) {
    newGameButton.addEventListener("click", newGame);
}
if (saveButton) {
    saveButton.addEventListener("click", manualSave);
}
if (continueButton) {
    const save = localStorage.getItem("gameSave");
    const saveData = save !==null;
    continueButton.disabled = !saveData;
    continueButton.addEventListener("click", continueGame);
}
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
