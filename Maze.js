/**
 * Define what's the map like using array and put corresponding images.
 * Also find player position on the map.
 * @author Shuyun Zheng
 */
/**
 * Define tile name
 * @type {{WALL: number, FLOOR: number, DoorBlue: number, DoorYellow: number, KeyBlue: number,
 * KeyYellow: number, POTION_HP: number, POTION_MP: number, SLIME_RED: number, SLIME_GREEN: number,
 * BAT: number, SKELETON: number, DecorTile: number, Ruby: number, Sapphire: number,
 * YOU: number, Stair: number, SHOP: number, WIZARD: number}}
 */
const Maze1 = [
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 0, 15,  1,  1,  1,  1,  1,  1,  1,  1,  1, 16,  0 ],
    [ 0,  1,  4,  1,  8,  1,  1,  1,  9,  1,  5,  1,  0 ],
    [ 0,  1,  1,  1,  1,  1,  6,  1,  1,  1,  1,  1,  0 ],
    [ 0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0 ],
    [ 0,  1,  0,  8,  1,  1,  0,  1,  1,  9,  0,  1,  0 ],
    [ 0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0 ],
    [ 0,  1,  1,  1,  1,  1,  7,  1,  1,  1,  1,  1,  0 ],
    [ 0,  1,  9,  1, 10,  1,  1,  1,  8,  1, 11,  1,  0 ],
    [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0 ],
    [ 0,  6,  1,  3,  1,  1,  1,  1,  1,  2,  1,  7,  0 ],
    [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0 ],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ]
];
const Maze2 = [
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 0, 16,  1,  1,  1,  1,  1,  1,  1,  1,  1, 17,  0 ],
    [ 0,  1,  8,  1,  4,  1, 10,  1,  5,  1,  9,  1,  0 ],
    [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0 ],
    [ 0,  1,  0,  0,  1,  1,  0,  1,  1,  0,  0,  1,  0 ],
    [ 0,  1,  0, 11,  1,  1,  0,  1,  1,  8,  0,  1,  0 ],
    [ 0,  1,  0,  0,  1,  1,  0,  1,  1,  0,  0,  1,  0 ],
    [ 0,  1,  6,  1,  1,  1,  7,  1,  1,  1,  6,  1,  0 ],
    [ 0,  1,  9,  1, 10,  1, 12,  1,  8,  1, 11,  1,  0 ],
    [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0 ],
    [ 0,  6,  1,  3,  1,  1,  1,  1,  1,  2,  1,  7,  0 ],
    [ 0, 15,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0 ],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ]
];
const Maze3 = [
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 0, 16,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0 ],
    [ 0,  1,  8,  1,  4,  1, 10,  1,  5,  1,  9,  1,  0 ],
    [ 0,  1,  1,  1, 12,  1,  1,  1, 12,  1,  1,  1,  0 ],
    [ 0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0 ],
    [ 0,  1,  0, 11,  1,  1,  0,  1,  1,  8,  0,  1,  0 ],
    [ 0,  1,  0,  1,  0,  1,  0,  1,  0, 10,  0,  1,  0 ],
    [ 0,  1,  7,  1,  1,  1,  7,  1,  1,  1,  6,  1,  0 ],
    [ 0,  1,  9,  1, 10,  1, 13,  1,  8,  1, 11,  1,  0 ],
    [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 18,  0 ],
    [ 0,  6,  1,  3,  1,  1,  1,  1,  1,  2,  1,  7,  0 ],
    [ 0, 15,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0 ],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ]
];
const Maze4 = [
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 0, 15,  1,  8,  1,  1,  1,  1,  9,  1, 10,  1,  0 ],
    [ 0,  1,  0,  1,  1,  19,  1,  1,  0,  1,  1,  1,  0 ],
    [ 0,  4,  1,  9,  1,  1,  1, 11,  1,  1,  5,  1,  0 ],
    [ 0,  1,  0,  0,  0,  1,  0,  0,  0,  1,  0,  1,  0 ],
    [ 0,  1, 10,  1,  1,  1,  1,  8,  1,  1, 11,  1,  0 ],
    [ 0,  1,  0,  0,  0,  1,  0,  0,  0,  1,  0,  1,  0 ],
    [ 0,  6,  1,  1,  1,  1,  7,  1,  1,  1, 13,  1,  0 ],
    [ 0,  1,  0,  0,  0,  1,  0,  0,  0,  1,  0,  1,  0 ],
    [ 0,  1,  1, 11,  1,  1, 10,  1,  9,  1,  1,  1,  0 ],
    [ 0,  1,  1,  1,  1,  1,  0,  2,  0,  1,  1, 16,  0 ],
    [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0 ],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ]
];
const Maze5 = [
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 0, 16,  1,  1,  1,  1,  1,  1,  1,  1, 13,  1,  0 ],
    [ 0,  1, 10,  1,  1,  1,  0,  0,  0,  1, 11,  1,  0 ],
    [ 0,  1,  1,  1,  0,  6,  1,  7,  0,  1,  1,  1,  0 ],
    [ 0,  1,  0,  1,  0,  0, 17,  0,  0,  1,  0,  1,  0 ],
    [ 0,  4,  1,  1,  1,  1,  1,  1,  1,  1,  1,  5,  0 ],
    [ 0,  1,  0,  8,  1,  1, 12,  1,  1,  9,  0,  1,  0 ],
    [ 0,  1,  0,  1,  1,  1, 18,  1,  1,  1,  0,  1,  0 ],
    [ 0,  1,  1, 11,  1,  1,  1,  1,  1, 10,  1,  1,  0 ],
    [ 0,  0,  0,  1,  0,  2,  1,  3,  0,  1,  0,  0,  0 ],
    [ 0,  1,  1,  1,  1,  1, 14,  1,  1,  1,  1, 15,  0 ],
    [ 0,  1,  9,  1,  0,  0,  0,  0,  1,  8,  1,  1,  0 ],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ]
];
const Maze6 = [
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [ 0, 16,  1,  8,  1, 10,  1, 11,  1,  9,  1, 13,  0 ],
    [ 0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0 ],
    [ 0,  6,  1,  1,  1,  1,  7,  1,  1,  1, 14,  1,  0 ],
    [ 0,  1,  0,  9,  0,  1,  0,  1,  0, 10,  0,  1,  0 ],
    [ 0,  1,  0,  1,  0,  1, 18,  1,  0,  1,  0,  1,  0 ],
    [ 0,  1,  1, 11,  1,  1, 12,  1,  1,  8,  1,  1,  0 ],
    [ 0,  0,  0,  1,  0,  2,  1,  3,  0,  1,  0,  0,  0 ],
    [ 0,  4,  1,  1,  1,  1,  5,  1,  1,  1,  6,  1,  0 ],
    [ 0,  1,  0, 10,  0,  1,  0,  1,  0, 11,  0,  1,  0 ],
    [ 0,  1,  0,  1,  0,  1, 18,  1,  0,  1,  0,  1,  0 ],
    [ 0, 15,  1,  1,  1,  1,  1,  1,  1,  1,  1, 16,  0 ],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ]
];
let Tile;
Tile = {
    WALL: 0,
    FLOOR: 1,
    DoorBlue: 2,
    DoorYellow: 3,
    KeyBlue: 4,
    KeyYellow: 5,
    POTION_HP: 6,
    POTION_MP: 7,
    SLIME_RED: 8,
    SLIME_GREEN: 9,
    BAT: 10,
    SKELETON: 11,
    DecorTile: 12,
    Ruby: 13,
    Sapphire: 14,
    YOU: 15,
    Stair: 16,
    SHOP: 17,
    WIZARD: 18,
    TrialDoor: 19,
};
const Floors = [Maze1, Maze2, Maze3, Maze4, Maze5, Maze6];
let currFloor = 0;
let Maze = Floors[currFloor];
/**
 * Draw the map
 */
function drawMap() {
    /**
     * @type {HTMLElement}
     */
    const mapDiv = document.getElementById("map");
    mapDiv.innerHTML = "";
    for (let row = 0; row < 13; row++) {
        for (let col = 0; col < 13; col++) {
            const tileValue = Maze[row][col];

            // create a tile div
            const tile = document.createElement("div");
            tile.classList.add("tile");

            // add extra class based on tile type
            switch (tileValue) {
                case Tile.WALL:
                    tile.classList.add("wall");
                    break;
                case Tile.FLOOR:
                    tile.classList.add("floor");
                    break;
                case Tile.DoorBlue:
                    tile.classList.add("door-blue");
                    break;
                case Tile.DoorYellow:
                    tile.classList.add("door-yellow");
                    break;
                case Tile.KeyBlue:
                    tile.classList.add("key-blue");
                    break;
                case Tile.KeyYellow:
                    tile.classList.add("key-yellow");
                    break;
                case Tile.POTION_HP:
                    tile.classList.add("potion-hp");
                    break;
                case Tile.POTION_MP:
                    tile.classList.add("potion-mp");
                    break;
                case Tile.SLIME_RED:
                    tile.classList.add("slime-red");
                    break;
                case Tile.SLIME_GREEN:
                    tile.classList.add("slime-green");
                    break;
                case Tile.BAT:
                    tile.classList.add("bat");
                    break;
                case Tile.SKELETON:
                    tile.classList.add("skeleton");
                    break;
                case Tile.DecorTile:
                    tile.classList.add("decor");
                    break;
                case Tile.Ruby:
                    tile.classList.add("ruby");
                    break;
                case Tile.Sapphire:
                    tile.classList.add("sapphire");
                    break;
                case Tile.YOU:
                    tile.classList.add("hero");
                    break;
                case Tile.Stair:
                    tile.classList.add("stair");
                    break;
                case Tile.SHOP:
                    tile.classList.add("shop");
                    break;
                case Tile.WIZARD:
                    tile.classList.add("wizard");
                    break;
                case Tile.TrialDoor:
                    tile.classList.add("trial-door");
                    break;
                default:
                    tile.classList.add("floor");
            }
            // Add images
            tile.style.backgroundImage = `url('imgProj/${tileValue}.jpg')`;
            tile.style.backgroundSize = "cover";
            // Store grid position on the element
            tile.dataset.row = `${row}`;
            tile.dataset.col = `${col}`;
            tile.addEventListener("click", () => {
                if (
                    tileValue === Tile.SLIME_RED ||
                    tileValue === Tile.SLIME_GREEN ||
                    tileValue === Tile.BAT ||
                    tileValue === Tile.SKELETON ||
                    tileValue === Tile.WIZARD
                ) {
                    showMonsterInfo(tileValue);
                }
            });
            mapDiv.appendChild(tile);
        }
    }
}
/**
 * Find the player
 * @returns {{row: *, col: *}}
 */
function findPlayer() {
    let row, col;
    // outer loop over rows
    for (row = 0; row < Maze.length; row++) {
        // inner loop over columns
        for ( col = 0; col < Maze[row].length; col++) {
            if (Maze[row][col] === Tile.YOU) {
                // found the player, break out of both loops
                return { row, col };
            }
        }
    }
}
