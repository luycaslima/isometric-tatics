import { Application, BaseTexture, SCALE_MODES,settings } from "pixi.js";
import InputManager from "./core/InputManager";
import { IScene } from "./core/Interfaces";



//Initialize, resize window and change scenes
export class Game {
    constructor(){} 

    private static app: Application;
    private static currentScene: IScene; 

    private static _width: number; //the inside resolution not the window
    private static _height: number;


    public static get rendererWidth(): number{
        return Game.app.renderer.width;
    }

    public static get rendererHeight(): number{
        return Game.app.renderer.height;
    }
    
    public static setCameraPosition(x: number, y: number): void { 
        Game.app.stage.pivot.x = x;
        Game.app.stage.pivot.y = y;
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
        settings.ROUND_PIXELS = true; //sharper imgs but movement can appear less smooth 
        
        InputManager.initialize();

        //Pixel art style
        BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

        //TODO Set scale with the RESIZE OF THE CANVAS
        //Game.app.stage.scale.set(2);
        Game.resizeScreenHandler();
        window.addEventListener('resize', Game.resizeScreenHandler, false);
        
        //Add ticker
        Game.app.ticker.add(Game.update);
    }
    private static resizeScreenHandler(): void{
        const scaleFactor = Math.min(
            window.innerWidth / Game._width,
            window.innerHeight / Game._height
        );
        const newSize: [number, number] = [
            Math.ceil(Game._width * scaleFactor),
            Math.ceil(Game._height * scaleFactor)
        ];

        Game.app.renderer.view.style!.width = `${newSize[0]}px`;
        Game.app.renderer.view.style!.height = `${newSize[1]}px`;

        Game.app.renderer.resize(newSize[0], newSize[1]);
        Game.app.stage.scale.set(scaleFactor);
    }

    public static changeScene(newScene: IScene) : void {
        if (Game.currentScene) {
            Game.app.stage.removeChild(Game.currentScene);
            Game.currentScene.destroy();
        }

        Game.currentScene = newScene;
        Game.app.stage.addChild(newScene);
    }

    private static update(delta: number): void {
        if (Game.currentScene) {
            Game.currentScene.update(delta);
        }
    }

}

