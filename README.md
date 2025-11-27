# Magic Tower

Magic Tower is a lightweight browser-based RPG featuring tile-based movement, 
classic dungeon exploration, battle encounters, quests, and an interactive shop system. The project is written in HTML, CSS, and JavaScript.

## Game Overview

- Goal: Climb the magic tower floor by floor, defeat enemies, and survive using limited resources(HP/MP, keys, money).
- Player Status: HP, MP, Attack, Defense, Keys, Money, Level and XP
- Map: The tower is designed as 13*13 tile maps per floor.
- Battle: Walking into a monster to start a battle. If HP reaches 0, the player dies and the game ends.
- Shop: Standing on a shop tile automatically opens the store.
- Quest: Doors may trigger a quest.
- Psychological Choice Doors: Some doors force the player to make a choice via dialogue.
- Special event with a popup modal.

## Save and Load

Game progress is stored using localStorage.
Save Includes: 
- Player stats
- Current floor number
- Floor states (items picked up / enemies defeated)
- Quests
- Game start flag
- Continue Behavior:
  - If so save exists: No saved game found. Please start a new game first! TAT
  - If save exists: You return. The tower remembers.

## Short Cut

<img width="1170" height="715" alt="main" src="https://github.com/user-attachments/assets/8ebf669d-d19b-4432-a19f-983f9082afc5" />
<img width="428" height="296" alt="popup" src="https://github.com/user-attachments/assets/1644962d-3305-4bb4-bd6b-cee3f4f29fc9" />

## Contributing

Pull requests are welcome. If you're planning a major change (e.g., rewriting battle mechanics or adding new floors),
please open an issue first to discuss your ideas.

Make sure to include:

- Code comments (Javadoc style recommended)

- Updated screenshots / documentation if UI changes

- Testing notes for new mechanics

## License

[Apache2.0](https://choosealicense.com/licenses/apache-2.0/#)
