/**
 * Provides UI updates, quest handling and all door events.
 * @author Shuyun Zheng
 */
/**
 * Appends a message to the on-screen log panel.
 * @param msg
 */
function appendLog(msg){
    const log = document.getElementById("log");
    // If there's no id="log" then create a new one
    const newLog = document.createElement("div");
    newLog.textContent = `${msg}`;
    // Add new msg to original log container
    log.appendChild(newLog);
    log.scrollTop = log.scrollHeight;
}
/**
 * Updates UI based on quest and hide if no quest exists.
 */
function updateQuestUI(){
    const panel = document.getElementById("questPanel");
    const text = document.getElementById("questText");
    // No active quest
    if(!currQuest){
        panel.style.display = "none";
        return;
    }
    // Show UI text
    panel.style.display = "block";
    text.textContent = `${currQuest.title} -${currQuest.progress}/${currQuest.target}`;
}
let currQuest = null;
/**
 * Start a new quest if nothing active, otherwise gives bonus.
 */
function startQuest(){
    // If already have mission with the same target, then give a little bonus
    if (currQuest && currQuest.type === "killSkeleton") {
        appendLog("You already have this hunt order. The extra scroll turns to dust...");
        player.money += 5;
        statusUpdate();
        return;
    }
    // Otherwise create quest
    currQuest = {
        title: 'Defeat 3 Skeletons',
        type: "killSkeleton",
        target: 3,
        progress: 0,
        reward: 45
    };
    appendLog("A Hunt Order has been issued: Slay 3 Skeletons. Bounty: 45 gold");
    updateQuestUI();
}
// Random event triggered
function openDoor(){
    const n = Math.random(); // from 0 to <1
    if (n < 0.5){
        showDinoModal();
    }else{
        appendLog("Ancient quest scroll found — hidden objective unlocked.");
        startQuest();
        statusUpdate();
    }
}
const dinoModal = document.getElementById("afterDoor");
const dinoButton = document.getElementById("DinosaurButton");
function showDinoModal(){
    if(!dinoModal)return;
    dinoModal.classList.remove('Hidden');
}
function hideDinoModal(){
    if(!dinoModal)return;
    dinoModal.classList.add('Hidden');
}
dinoButton.addEventListener("click", ()=>{
    hideDinoModal();
    appendLog("A hidden dinosaur awakens behind the door!TAT");
    battle(99);
})

/**
 * Trial door event that asks player to make a choice.
 * @returns {boolean}
 */
function trialDoor(){
    const msg = "As you stand before the door, its blue light flickers like a dying star.\n" +
        "A voice—old, fractured, barely human—seeps through the cracks in the stone.\n\n" +
        "The Whisper Behind the Door:\n" +
        "“Traveler of fleeting breath…\n" +
        "Before you lies a threshold woven from intention, not stone.\n" +
        "To pass, you must answer a truth only you can shape.”\n\n" +
        "A long silence follows.\n" +
        "Then, quietly:\n\n" +
        "“Tell me…\n" +
        "Which burden would you rather carry into the dark that follows?”\n\n" +
        "A) “The weight of a promise I can no longer name.”\n" +
        "B) “The comfort of forgetting what must not be remembered.”\n\n" +
        "Type A or B:";
    const input = prompt(msg);
    if (input === null) {
        appendLog("You step back from the door. Its blue light fades to a wary glow.");
        return false; // no movement
    }
    const choice = input.trim().toUpperCase();
    if (choice === "A") {
        // Success + reward
        appendLog("You choose to bear the nameless promise. The blue light steadies and welcomes you.");
        appendLog("Power flows through your veins. HP +80, Money +60.");
        player.hp += 80;
        player.money += 60;
        // Open the door and move forward
        Maze[pos.row][pos.col] = Tile.FLOOR;
        Maze[Px][Py] = Tile.YOU;
        statusUpdate();
        return true;
    } else if (choice === "B") {
        // Death ending
        appendLog("You choose the comfort of forgetting.");
        appendLog("The light goes out. The world falls with it.");
        player.hp = 0;
        statusUpdate();
        gameOver(false);
        return false;
    // Invalid response
    } else {
        appendLog("The door does not understand your answer. It remains sealed.");
        return false;
    }
}
