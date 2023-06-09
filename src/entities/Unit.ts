import { Container, Point, Sprite, Texture } from "pixi.js";
import { IScene, Vector3 } from "../core/Interfaces";
import { Tile } from "../map/Tile";
import { Stack , lerp, roundPosition } from "../core/Utils";
import { Battle } from "../core/Battle";

/*
const ELEMENTS = {
    EARTH: 'EARTH'
} as const;

type ELEMENTS = typeof ELEMENTS[keyof typeof ELEMENTS]; 
*/


//Recieve as parameter or implements in the class?
interface IStatus{
    name: string;
    lvl: number;
    hp: number;
    mp: number;
    //dealDamage(): void;
    //takeDamage(): void;
}


//TODO change this to a interface to be implemented
//Base class for the units (summonner and monster)
export class Unit extends Container implements IScene{
    currentTile: Tile;
    
    private lookDirection: Point;
    private sprite: Sprite;
    private targetTile?: Tile;
    private unitRoute: Stack<Tile>; // TODO learn how to make a QUEUE
    private targetPosition: Vector3;

    //spriteSheet: AnimatedSprite;
    //stats: IStatus;
    // _currentHp: number = this._hp;
    // _currentMp: number = this._mp;
    // _currentexp: number = this._exp;

    constructor(pos : Point,textureSheet : Texture , currentTile : Tile) {
        super()

        this.lookDirection = new Point(0, 0); //Direction that the sprite look

        this.sprite = new Sprite(textureSheet);
        this.sprite.anchor.set(.5, 1); //inferior center of image
        this.targetPosition = {x: 0 , y: 0 } as Vector3

        this.currentTile = currentTile;
        this.zIndex = currentTile.zIndex + 1;
        this.position.x = pos.x;
        this.position.y = pos.y;
        this.unitRoute = new Stack<Tile>();

        this.addChild(this.sprite);
    }

    public setRoute( route : Stack<Tile>): void{
        this.unitRoute = route;
    }

    //TODO refactor to be more readable when scaled up
    public update(delta: number): void{
        this.move(delta);
        this.animate();
    }
    
    private animate(): void{

    }

    private move(delta: number) :void {
        if (!this.unitRoute.isEmpty && !this.targetTile) {
            this.targetTile = this.unitRoute.pop();
            this.targetPosition = this.targetTile!.getTileCentralPosition();
            this.zIndex = this.targetTile!.zIndex + 1; //lerp from the current to the target
            Battle.sortEntities();

        } else if (this.targetTile) {
            this.position.x = lerp(this.position.x, this.targetPosition.x, delta * .5 );
            this.position.y = lerp(this.position.y, this.targetPosition.y, delta * .5 );
            
            /*console.log(`${this.position.x} , ${this.position.y}
                ${this.targetPosition.x}, ${this.targetPosition.y}
            `)*/
            
            //To not get stuck near 0
            this.position = roundPosition(this.position);
            
            if (this.targetPosition.x === this.position.x && this.targetPosition.y === this.position.y) {
                this.currentTile = this.targetTile
                this.targetTile = undefined;
                
            }
        }
    }
}

export class Summoner extends Unit {

    public summonMonster(_monsterUnit: Monster): void {
        
    }

}

export class Monster extends Unit {
    //private _exp: number = 0;
    //private _currentExp: number = 0;
}