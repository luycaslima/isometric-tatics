import { Container, Point, Sprite, Texture } from "pixi.js";
import { IScene, Vector3 } from "../core/Interfaces";
import { Tile } from "../map/Tile";
import { Stack , lerp } from "../core/Utils";

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
class Unit extends Container implements IScene{
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
        if (!this.unitRoute.isEmpty && !this.targetTile) {
            this.targetTile = this.unitRoute.pop();
            this.targetPosition = this.targetTile!.getTileCentralPosition();
            
            //console.log(this.unitRoute);
        } else if (this.targetTile) {
            this.position.x = lerp(this.position.x, this.targetPosition.x, delta * 30 );
            this.position.y = lerp(this.position.y, this.targetPosition.y, delta * 30 );
            
            //To not get stuck near 0
            this.position.x = Math.round((this.position.x + Number.EPSILON) * 100) / 100
            this.position.y = Math.round((this.position.y + Number.EPSILON) * 100) / 100
            
            console.log(`x: ${this.position.x} y: ${this.position.y}`)
    
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