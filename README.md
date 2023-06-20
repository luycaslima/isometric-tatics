# Isometric Tatics Game

A typescript + vite + pixi js project for a isometric tatics game.

(In the future implement Socket.io for 1v1)

---

## Concept

The game consist in a 1v1 where the player is a especial type of entity:  a summoner. 

Players can summon 1 unit/monster per round, if having enough mana. Each unit has an element attribute that influences movement depending on the terrain and the damage that takes.

Wins who defeat the adversary summoner. (Think of other condition of winning)

---

## TODO

The ideias listed here in the moment is just for the concept.

**PRIORITY** : Insert two entities in a map and control each through socket io 

- [x] Create BASIC Unit/ Summoner class (Sprite, container)
  
  - [x] Spawn on the map scene

- [x] Create my own tilemap editor

- [ ] Implement the A* algorithm

- [ ] Implement Socket io for the connection

---

- [ ] Game Manager
  
  - [x] create application
  
  - [x] manage change of scenes
  
  - [x] update current scene
  
  - [x] Refactor the initialization from main.ts to the game class

- [ ] Map Scene
  
  - [x] Tile class
    
    - [x] Create basic isometric tilemap
  
  - [x] MapScene class
  
  - [x] Map Editor (export in JSON)
  
  - [x] Load and create instance of map from JSON file

- [ ] Render
  
  - [x] pixel perfect 
  - [x] scale based on window
    - [ ] Give a max size or full document screen?
    - [x] Maintain the proportion to screen

- [ ] A* path algorithm used by the BattleManager

- [ ] Camera
  
  - [x] render only the visibile entities ( On map scene class)
  
  - [ ] movement
    
    - [ ] move to target entity
    - [ ] mouse Zoom in/out
    - [ ] Mouse Drag
    - [x] (debug mode on arrows)

- [ ] Player Units
  
  - [ ] Summoner / Monster Units
    
    - [ ] Status
    - [x] Basic Unit Class
      - [x] Summoner Class
      - [ ] Monster Class
  
  - [ ] actions / states
  
  - [ ] animations

- [ ] Assets loading
  
  - [x] Basic Map*(JSON) and Image loading

- [ ] UI Manager ( HTML or pixi UI ?)
  
  - [ ] Actions (Atack, Move, Magic, Wait)
  
  - [ ] Description box (Skills,etc)
  
  - [ ] Skill list
  
  - [ ] Character Status (Sprite, lvl, hp,mp, strength, speed etc)
  
  - [ ] Minimap?
  
  - [ ] Main Menu
  
  - [ ] Online Room
    
    - [ ] Map selector
    
    - [ ] Character

- [ ] Battle Manager
  
  - [ ] Turns
  
  - [ ] Battle States
  
  - [ ] Victory/Defeat Conditions

- [ ] Multiplayer
  
  - [ ] Use Socket.IO
  - [ ] Rooms
  - [ ] Hosting ( Render, Pie socket?)
