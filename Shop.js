/**
 * Shop logic including item effects, purchase confirmation and shop state.
 * @author Shuyun Zheng
 */
// Track when shop UI is open
let shopOpen = false;
/**
 * Displays the effect text for a hovered shop item.
 * @param text
 */
function showEffect(text) {
    document.getElementById("itemEffect").textContent = text;
}
/**
 * Resets the item effect display text when the user is not hovering any item.
 */
function hideEffect() {
    document.getElementById("itemEffect").textContent =
        "Hover an item to see its effect.";
}

/**
 * All items in the shop.
 * @type {{"Arcane Blade Charm": {price: number, effect: SHOP_ITEMS.Arcane Blade Charm.effect},
 * "Aegis Guard Talisman": {price: number, effect: SHOP_ITEMS.Aegis Guard Talisman.effect},
 * "Crimson Life Elixir": {price: number, effect: SHOP_ITEMS.Crimson Life Elixir.effect},
 * "Unity Rune Charm": {price: number, effect: SHOP_ITEMS.Unity Rune Charm.effect},
 * "Azure Rune Key": {price: number, effect: SHOP_ITEMS.Azure Rune Key.effect},
 * "Sunlit Sigil Key": {price: number, effect: SHOP_ITEMS.Sunlit Sigil Key.effect}}}
 */
const SHOP_ITEMS = {
    "Arcane Blade Charm": {
        price: 20,
        effect: () => { player.atk += 3; }
    },
    "Aegis Guard Talisman": {
        price: 15,
        effect: () => { player.def += 3; }
    },
    "Crimson Life Elixir": {
        price: 25,
        effect: () => { player.hp += 100; }
    },
    "Unity Rune Charm": {
        price: 12,
        effect: () => {
            player.atk += 1;
            player.def += 1;
        }
    },
    "Azure Rune Key": {
        price: 15,
        effect: () => { player.blueKey += 1; }
    },
    "Sunlit Sigil Key": {
        price: 15,
        effect: () => { player.yellowKey += 1; }
    }
};
/**
 * Attempt to buy item from shop.
 * @param itemName
 */
function buy(itemName) {
    const item = SHOP_ITEMS[itemName];
    // Check validity
    if (!item) {
        alert("Unknown item.");
        return;
    }
    // Confirm purchase
    const confirmBuy = confirm(
        `Do you want to buy "${itemName}" for ${item.price} ?`
    );
    if (!confirmBuy) {
        alert("Purchase cancelled.");
        return;
    }
    // Check money
    if (player.money < item.price) {
        alert("Not enough money!");
        return;
    }
    // deduct money
    player.money -= item.price;
    // apply item effect
    item.effect();
    alert(`You purchased "${itemName}".`);
    statusUpdate();  // update UI
}
/**
 * Open shop UI and reset hover.
 */
function openShop() {
    const shopDiv = document.getElementById("shop");
    shopDiv.style.display = "block";
    hideEffect();
    shopOpen = true;
}
/**
 * Close shop
 */
function closeShop() {
    const shopDiv = document.getElementById("shop");
    shopDiv.style.display = "none";
    shopOpen = false;
}
