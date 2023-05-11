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

- [ ] Render
  
  - [x] pixel perfect 
  - [ ] scale based on window

- [ ] A* path algorithm

- [ ] Camera
  
  - [x] render only the visibile entities 
  
  - [x] movement (debug mode on arrows)
    
    - [ ] movement in target entity

- [ ] Player
  
  - [ ] Summoner
    
    - [ ] Status
  
  - [ ] actions / states
  
  - [ ] animations
  
  - [ ] Input

- [ ] UI ( HTML or CANVAS?)
  
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
