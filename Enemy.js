/**
 * Define the enemy class and basic data for all monsters in the game. Each enemy has its own combat
 * data including HP, attack, defense, EXP and money dropped, and these are useful for battle calculation.
 * @author: Shuyun Zheng
 */
class Enemy{
    /**
     * define attributes
     * @param name
     * @param hp
     * @param atk
     * @param def
     * @param exp
     * @param money
     */
    constructor(name, hp, atk, def, exp, money) {
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.exp = exp;
        this.money = money;
    }
}
/**
 * Set enemy data. Green<Red<Bat<Skeleton(difficulty)
 * @type {{8: Enemy, 9: Enemy, 10: Enemy, 11: Enemy}}
 */
const ENEMY_STATS = {
    8: new Enemy("Red Slime", 60, 14, 2, 3, 3), // SLIME_RED
    9: new Enemy("Green Slime", 50, 10, 1, 2, 2), // SLIME_GREEN
    10: new Enemy("Bat", 80, 18, 3, 4, 4), //BAT
    11: new Enemy("Skeleton", 120, 24, 5, 6, 6), // SKELETON
    18: new Enemy("Wizard",200,35,10,20,20), // WIZARD
    99: new Enemy("Dinosaur",160,28,8,12,18)
};
function BattleMsg(msg){
    console.log(msg);
    appendLog(msg);
}
/**
 * Define battle function: if player win then he gets enemy's hp and money, else died
 * @param enemyID
 * @returns {boolean}
 */
function battle(enemyID) {
    // Make a copy so ENEMY_STATS template is not modified
    const base = ENEMY_STATS[enemyID];
    const enemy = new Enemy(
        base.name,
        base.hp,
        base.atk,
        base.def,
        base.exp,
        base.money
    );
    // Give player attention
    BattleMsg(`You encountered a ${enemy.name}.`);
    // Player attack first
    while (player.hp > 0 && enemy.hp > 0) {
        // First: Player attacks enemy
        const damageToEnemy = Math.max(player.atk - enemy.def, 1);
        enemy.hp -= damageToEnemy;
        // Give damage info
        BattleMsg(`You dealt ${damageToEnemy} to ${enemy.name}. Enemy HP: ${enemy.hp}`);
        // If win the enemy then jump out
        if (enemy.hp <= 0) {
            break;
        }
        // If both alive then enemy attacks player
        const damageToPlayer = Math.max(enemy.atk - player.def, 1);
        player.hp -= damageToPlayer;
        BattleMsg(`${enemy.name} dealt ${damageToPlayer} to you. Your HP: ${player.hp}`);
    }
    if (player.hp <= 0) {
        // Player died
        BattleMsg('Died');
        gameOver(false);
        revivePlayer();
        return false;
    }
    // If player wins then he gains enemy's exp and money
    player.totalExp += enemy.exp;
    player.money += enemy.money;
    BattleMsg(
        `You defeated ${enemy.name}! +${enemy.exp} EXP, +${enemy.money} money.`
    );
    // Update mission progress
    if(currQuest && currQuest.type ==="killSkeleton" && enemyID === 11){
       currQuest.progress++;
       appendLog(`Quest progress update: skeletons defeated ${currQuest.progress}/${currQuest.target}`);
       updateQuestUI();
       if(currQuest.progress >= currQuest.target){
           appendLog("Quest complete!^^");
           appendLog("Get ${currQuest.reward} money");
           player.money += currQuest.reward;
           currQuest = null;
           updateQuestUI();
       }
    }
    return true;
}
function showMonsterInfo(enemyID) {
    const e = ENEMY_STATS[enemyID];
    if (!e) return;
    appendLog(`Monster: ${e.name}`);
    appendLog(`HP: ${e.hp}  ATK: ${e.atk}  DEF: ${e.def}`);
    appendLog(`EXP: ${e.exp}  Money: ${e.money}`);
}
