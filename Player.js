/**
 * Define player class and all logic related to player, including data and status updates.
 * @author Shuyun Zheng
 */
class Player {
    constructor() {
        this.name = "";
        this.hp = 200;
        this.mp = 50;
        this.atk = 10;
        this.def = 5;
        this.yellowKey = 0;
        this.blueKey = 0;
        this.money = 0;
        this.totalExp = 0;
        // Current level
        this.level = 1;
        this.quest = null;
    }
}
/**
 * Only one player in the whole game.
 * @type {Player}
 */
const player = new Player();
/**
 * Calculate total xp required to reach next level using Pokemon fast growth curve: round(4 * level^3 / 5).
 * @param level
 * @returns {number}
 */
function xpToReachLevel(level) {
    return Math.round((4 * level ** 3) / 5);
}
/**
 * Determine player's current level and how much XP need for next level.
 * @param totalExp - player's total XP
 * @returns {{level: number, xpNeeded: number}}
 */
function getLevelInfo(totalExp) {
    let level = 1;
    // Find the highest level such that totalExp is still enough
    while (totalExp >= xpToReachLevel(level + 1)) {
        level++;
    }
    const nextLevelXp = xpToReachLevel(level + 1);
    const xpNeeded = nextLevelXp - totalExp;
    return { level, xpNeeded };
}
/**
 * Update status panel and writes to html
 */
function statusUpdate() {
    // Level & XP info from totalExp
    const info = getLevelInfo(player.totalExp);
    player.level = info.level;
    document.getElementById("nameInput").textContent = player.name;
    document.getElementById("level").textContent = `${info.level}`;
    document.getElementById("needed").textContent = `${info.xpNeeded}`;
    document.getElementById("hp").textContent = player.hp;
    document.getElementById("mp").textContent = player.mp;
    document.getElementById("atk").textContent = player.atk;
    document.getElementById("def").textContent = player.def;
    document.getElementById("yellowKey").textContent = player.yellowKey;
    document.getElementById("blueKey").textContent = player.blueKey;
    document.getElementById("money").textContent = player.money;
    const questBox = document.getElementById("questText");
    if (!questBox) return;
    if (!currQuest) {
        questBox.style.display = "none";
    }else{
        questBox.style.display = "inline";
        questBox.textContent = currQuest.title;
    }
}
