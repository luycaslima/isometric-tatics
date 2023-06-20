import { Assets, Container , Graphics } from "pixi.js";
import { manifest } from "./Assets";
import { IScene, ITilemap } from "./Interfaces";
import { Game } from "../game";
import { MapScene } from "../map/MapScene";

export class SceneLoader extends Container implements IScene{

     // for making our loader graphics...
    private loaderBar: Container;
    private loaderBarBorder: Graphics;
    private loaderBarFill: Graphics;
    
    constructor() {
        super();
        
        const loaderBarWidth = Game.rendererWidth * 0.8;
        this.loaderBarFill = new Graphics();
        this.loaderBarFill.beginFill(0x008800, 1);
        this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
        this.loaderBarFill.endFill;
        this.loaderBarFill.scale.x = 0;


        this.loaderBarBorder = new Graphics();
        this.loaderBarBorder.lineStyle(10,0x0,1);
        this.loaderBarBorder.drawRect(0, 0, loaderBarWidth, 50);
        
        this.loaderBar = new Container();
        this.loaderBar.addChild(this.loaderBarFill);
        this.loaderBar.addChild(this.loaderBarBorder);

        //Not working
        //this.loaderBar.position.x = (Game.width - this.loaderBar.width) / 2;
        //this.loaderBar.position.y = (Game.height - this.loaderBar.height) / 2;
        this.addChild(this.loaderBar);

        //Start Loading
        this.initializeLoader().then(() => {
            //call async here because construct cant be async
            this.gameLoaded();
        })

    }

    private async initializeLoader(): Promise<void> {
        
        Assets.init({ manifest:manifest });

        const bundlesIds = manifest.bundles.map(bundle => bundle.name)

        // The second parameter for `loadBundle` is a function that reports the download progress!
        await Assets.loadBundle(bundlesIds, this.downloadProgress.bind(this));

    }
    private downloadProgress(progressRatio: number) : void {
        // progressRatio goes from 0 to 1, so set it to scale
        this.loaderBarFill.scale.x = progressRatio;
    }

    private gameLoaded(): void {
        //finished loading!

        // Let's remove our loading bar
        //this.removeChild(this.loaderBar);
        const tilemap: ITilemap = Assets.get('mGrassField'); 
        //console.log(tilemap as ITilemap) ;
        Game.changeScene(new MapScene(tilemap));
        this.destroy();
    }

    public update(_delta: number): void {}
}

