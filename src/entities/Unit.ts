import { Container } from "pixi.js";
import { IScene } from "../game";

export class Unit extends Container implements IScene{

    constructor() {
        super()
    }

    public update(delta: number): void{
        
    }
}