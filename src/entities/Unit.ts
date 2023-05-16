import { Container, Point, Sprite, Texture } from "pixi.js";
import { IScene } from "../game";

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
    exp: number;
    //dealDamage(): void;
    //takeDamage(): void;
}


interface ISumonnerActions {
    summonMonster(unit : Monster) : void
}


//Base class for the units (summonner and monster)
class Unit extends Container implements IScene{
    lookDirection: Point;
    sprite: Sprite;
    
    //spriteSheet: AnimatedSprite;
    //stats: IStatus;
    // _currentHp: number = this._hp;
    // _currentMp: number = this._mp;

    constructor(pos : Point,textureSheet : Texture) {
        super()

        this.lookDirection = new Point(0, 0); //Direction that the sprite look

        this.sprite = new Sprite(textureSheet);
        this.sprite.anchor.set(.5, 1); //inferior center of image
        
        this.position.x = pos.x;
        this.position.y = pos.y;

        
        this.addChild(this.sprite);
    }

    public update(_delta: number): void{
        
    }
}

export class Summoner extends Unit implements ISumonnerActions{

    public summonMonster(_unit: Monster): void {
        
    }

}

export class Monster extends Unit{

}