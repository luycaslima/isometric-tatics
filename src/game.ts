
import { Application, DisplayObject } from "pixi.js";

//Load Content
//Initiante
//Update(Loop)
    //Process Inpit
    //Update
    //Render


//Initialize, resize window and change scenes
export class Game {
    constructor(){} //used as static

    private static app: Application;
    private static currentScene: IScene; 

    private static _width: number;
    private static _height: number;

    public static get width(): number{
        return Game._width;
    }

    public static get heigth(): number{
        return Game._height;
    }
    

    public static initialize(width : number, height : number, backgroundColor : number) : void {
        Game._width = width;
        Game._height = height;

        Game.app = new Application({
            view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            background: backgroundColor,
            width: width,
            height: height
        });

        //Add ticker
        Game.app.ticker.add(Game.update);
    }

    public static changeScene(newScene: IScene) : void {
        if (Game.currentScene) {
            Game.app.stage.removeChild(Game.currentScene);
            Game.currentScene.destroy();
        }

        Game.currentScene = newScene;
        Game.app.stage.addChild(newScene);
    }

    public static update(delta: number) : void {
        if (Game.currentScene) {
            Game.currentScene.update(delta);
        }
    }

}


export interface IScene extends DisplayObject{
    update(delta: number): void;
}

