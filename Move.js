/**
 * Handle keyboard input and convert to movement
 * @param e
 * @constructor
 * @author Shuyun Zheng
 */
function Keyboard(e) {
    if (!gameStart) return;
    let dx = 0, dy = 0;
    // Convert key input into movement
    // Left
    if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft')  dy = -1;
    // Right
    else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') dy = 1;
    // Up
    else if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp')    dx = -1;
    // Down
    else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown')  dx = 1;
    // Close shop
    else if (shopOpen && (e.key === "q" || e.key === "Q")) {
        closeShop();
        alert("Shop closed.");
        return;
    }
    // If shop is opening cannot move
    else if (shopOpen) return;
    else return;

    Move(dx, dy);
}
/**
 * Get user input and move
 * @param dx
 * @param dy
 * @constructor
 */
function Move(dx, dy) {
    // If not enter the game then exit
    if (!gameStart) return;
    // Find player
    const pos = findPlayer();
    if(!pos) return;
    const Px = pos.row + dx; // new row
    const Py = pos.col + dy; // new col
    // Check if over bound(new pos>=13 or <0)
    if (Px<0 || Py<0 || Px>= 13 || Py >= 13) {
        return;
    }
    // Create a target the player is walking to
    const target = Maze[Px][Py];
    console.log("Enter tile:", target);
    // Handle diff objects
    switch (target) {
        // Case 1: Wall -- cannot move
        case Tile.WALL:
            return;

        // Case 2: Floor/DecorTile -- can move -- update pos on map
        case Tile.FLOOR:
            Maze[pos.row][pos.col] = Tile.FLOOR;
            Maze[Px][Py] = Tile.YOU;
            break;
        case Tile.DecorTile:
            Maze[pos.row][pos.col] = Tile.FLOOR;
            Maze[Px][Py] = Tile.YOU;
            break;

        // Case 3: Key -- pick up -- update num and pos
        case Tile.KeyBlue:
            player.blueKey++;
            appendLog("Get a blue key!^^");
            Maze[pos.row][pos.col] = Tile.FLOOR;
            Maze[Px][Py] = Tile.YOU;
            break;
        case Tile.KeyYellow:
            player.yellowKey++;
            appendLog("Get a yellow key!^^");
            Maze[pos.row][pos.col] = Tile.FLOOR;
            Maze[Px][Py] = Tile.YOU;
            break;

        // Case 4: Door -- key>0 -- update pos -- num - 1; else return
        case Tile.DoorBlue:
            if(player.blueKey > 0 ) {
                player.blueKey--;
                Maze[pos.row][pos.col] = Tile.FLOOR;
                Maze[Px][Py] = Tile.YOU;
                openDoor();
            }else{
                alert("You don't have any blue key!TAT");
            }
            break;
        case Tile.DoorYellow:
            if (player.yellowKey > 0 ) {
                player.yellowKey--;
                Maze[pos.row][pos.col] = Tile.FLOOR;
                Maze[Px][Py] = Tile.YOU;
                openDoor();
            }else{
                alert("You don't have any yellow key!TAT");
            }
            break;

        // Case 5: Potions -- hp+50 or mp+30 -- update pos
        case Tile.POTION_HP:
            player.hp += 50;
            appendLog("Drank a red potion - HP +50.^^")
            Maze[pos.row][pos.col] = Tile.FLOOR;
            Maze[Px][Py] = Tile.YOU;
            break;
        case Tile.POTION_MP:
            player.mp += 30;
            appendLog("Drank a blue potion — MP +30.^^");
            Maze[pos.row][pos.col] = Tile.FLOOR;
            Maze[Px][Py] = Tile.YOU;
            break;

        // Case 6: Gems -- add money -- update pos
        case Tile.Ruby:
            player.money += 15;
            appendLog("Picked up the Witch’s Ruby — money +15.^^")
            Maze[pos.row][pos.col] = Tile.FLOOR;
            Maze[Px][Py] = Tile.YOU;
            break;
        case Tile.Sapphire:
            player.money += 10;
            appendLog("Picked up mysterious Sapphire - money +10.^^")
            Maze[pos.row][pos.col] = Tile.FLOOR;
            Maze[Px][Py] = Tile.YOU;
            break;

        // Case 7: Monsters -- call battle logic
        case Tile.SLIME_RED: {
            showMonsterInfo(8);
            const yes= confirm("Red Slime encountered. Fight?")
            if(yes){
                const win = battle(8);
                if (!win) return;
                Maze[pos.row][pos.col] = Tile.FLOOR;
                Maze[Px][Py] = Tile.YOU;
            }else{
                alert("Red Slime blocks your path! You cannot continue unless you defeat it.TAT")
            }
            break;
        }
        case Tile.SLIME_GREEN:{
            showMonsterInfo(9);
            const yes= confirm("Green Slime encountered. Fight?")
            if(yes) {
                const win = battle(9);
                if (!win) return;
                Maze[pos.row][pos.col] = Tile.FLOOR;
                Maze[Px][Py] = Tile.YOU;
            }else {
                alert("Green Slime blocks your path! You cannot continue unless you defeat it.TAT")
            }
            break;
        }
        case Tile.BAT:{
            showMonsterInfo(10);
            const yes= confirm("Bat encountered. Fight?")
            if(yes){
                const win = battle(10);
                if (!win) return;
                Maze[pos.row][pos.col] = Tile.FLOOR;
                Maze[Px][Py] = Tile.YOU;
            }else {
                alert("Bat blocks your path! You cannot continue unless you defeat it.TAT")
            }
            break;
        }
        case Tile.SKELETON:{
            showMonsterInfo(11);
            const yes= confirm("Skeleton encountered. Fight?")
            if(yes){
               const win = battle(11);
               if (!win) return;
                Maze[pos.row][pos.col] = Tile.FLOOR;
                Maze[Px][Py] = Tile.YOU;
            }else {
                alert("Skeleton blocks your path! You cannot continue unless you defeat it.TAT")
            }
            break;
        }
        case Tile.WIZARD:{
            showMonsterInfo(18);
            const yes= confirm("Wizard encountered. Fight?")
            if(yes){
                const win = battle(18);
                if (!win) return;
                Maze[pos.row][pos.col] = Tile.FLOOR;
                Maze[Px][Py] = Tile.YOU;
            }else {
                alert("Wizard blocks your path! You cannot continue unless you defeat it.TAT")
            }
            break;
        }

        // Case 8: Shop -- open shop
        case Tile.SHOP:
            Maze[pos.row][pos.col] = Tile.FLOOR;
            Maze[Px][Py] = Tile.YOU;
            openShop();
            break;

        // Case 9: Stair
        case Tile.Stair:
            goToNextFloor();
            break;

        // Case10: TrialDoor
        case Tile.TrialDoor:
            const survive = trialDoor(pos, Px, Py);
            if(!survive){
                return;
            }
            break;
    }
    statusUpdate();
    drawMap();
    }

/**
 * When step on stair should be able to go to next floor.
 */
    function goToNextFloor(){
        appendLog("Running to next floor...");
        if(currFloor<Floors.length-1){
            currFloor++;
            Maze = Floors[currFloor];
            drawMap();
            statusUpdate();
            appendLog(`You are in floor ${currFloor+1}!`)
        }else{
            appendLog(`You have reached top floor! Demo is done!`);
            gameOver(true);
        }
    }
