import { Container, Point } from "pixi.js";
import { IScene } from "../game";

//import { Point } from "pixi.js";
export class Camera extends Container implements IScene{
    private targetPosition: Point;

    constructor() {
        super();
        this.targetPosition = new Point(0, 0);
    }

    update(_delta: number): void {
        //Move the camera in all directions to the target or through a path like the units?
        /*this.position.x = this.targetPosition.x * delta;
        this.position.y*/
    }
/*
    private cameraPosition : Point = new Point(0,0);
    private targetPosition : Point


    constructor() {
        
    }

    public setTargetPosition(targetPos : Point) {
        
    }

    public initialize() : void {
        
    }

    public update(delta: number) {
        
    }*/
}