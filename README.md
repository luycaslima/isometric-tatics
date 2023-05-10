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

- [ ] Maps
  
  - [x] Create basic isometric tilemap
  
  - [ ] Map editor (for development ? or use Tiled?)

- [ ] Scale game base on window size
  
  - [x] pixel perfect 

- [ ] A* path algorithm

- [ ] Camera
  
  - [ ] render only the visibile entities 
  
  - [ ] movement 

- [ ] Player
  
  - [ ] Summoner
    
    - [ ] Status
  
  - [ ] actions / states
  
  - [ ] animations
  
  - [ ] Input

- [ ] UI
  
  - [ ] Actions
  
  - [ ] Character Status
  
  - [ ] minimap?
  
  - [ ] Main Menu
  
  - [ ] Room
    
    - [ ] Map selector
    
    - [ ] Character

- [ ] Battle Manager
  
  - [ ] Turns
  
  - [ ] Victory/Defeat Conditions

- [ ] Multiplayer
  
  - [ ] Socket.IO
