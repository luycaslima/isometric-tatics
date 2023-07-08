import { BaseTexture, Container, DisplayObject, Point, Rectangle, Sprite, Texture } from "pixi.js";
import { Game } from "../game";
import { Tile } from "./Tile";
import '@pixi/math-extras';
import Stats from "stats.js";
import { Monster, Summoner, Unit } from "../entities/Unit";
import { IScene, ITile, ITilemap, SpriteSize, Vector3 } from "../core/Interfaces";
import { Battle,BATTLESTATES } from "../core/Battle";
import { lerp } from "../core/Utils";


/**
 * When constructed recieve the file that defines how the map is constructed
 * and the initial positions of the Summoners
 * YOUR MAIN RESPONSABILITY IS CONTROL THE CURRENT MAP (RENDER THE POSITION OF ENTITIES)  
*/

//TODO change from container to Stage from the plugin PIXI JS LAYERS?
export class MapScene extends Container implements IScene/*, ITilemap*/{

    tilesetName: string;
    mapSize: [number, number];
    tileSize: SpriteSize;
    //layers: ILayer[];

    private baseTexture: BaseTexture;
    
    //TODO Ter uma lista de unidades de cada player
    private playerSummoner: Summoner;
    private adversarySummoner: Summoner;

    private playerUnits: Array<Monster>;
    private adversaryUnits: Array<Monster>;

    private targetOfCamera?: Vector3;

    //Tiles
    //ao ser construido passar pro battle manager 
    private tiles: Map<string,Tile> = new Map();
    
    
    // STATS FOR PERFOMANCE DEBUGING   
    private stats: Stats = new Stats();
    
    public get getPlayerSummoner(): Summoner { return this.playerSummoner; }
    public get getAdversarySummoner(): Summoner { return this.adversarySummoner; }
    public get getTiles(): Map<string, Tile> { return this.tiles; }

    constructor(tilemap: ITilemap) {
        super();
        
        //For debug
        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);
        
        
        //Load map
        this.tilesetName = tilemap.tilesetName;
        this.mapSize = tilemap.mapSize;
        this.tileSize = { w: tilemap.tileSize[0], h: tilemap.tileSize[1] } as SpriteSize;

        this.baseTexture = BaseTexture.from(`${tilemap.tilesetName}`);
        
        //const spr = Sprite.from('tiles/block.png');
        this.pivot.set(tilemap.tileSize[0] * 0.5,tilemap.tileSize[1] * 0.5)
        //this.addChild(spr);
        
        this.generateMap(tilemap);
        
        //Under here load both summoners and make a cutscene
        this.playerUnits = [];
        this.adversaryUnits = [];

        //TODO For debug Spawn Summoner Spawn in the correct position in each map.  
        let tile = this.tiles.get("10,11");
        const texture: Texture = Texture.from('/sprites/placeholder_nonanimated.png');
        const summoner: Summoner = new Summoner(tile!.getTileCentralPosition(), texture, tile!);
        
        tile = this.tiles.get('14,17');
        const summoner2 = new Summoner(tile!.getTileCentralPosition(), texture, tile!);

        this.playerSummoner = summoner;
        this.adversarySummoner = summoner2;
        this.adversarySummoner.renderable = false;

        this.addChild(this.adversarySummoner)
        this.addChild(this.playerSummoner);
        Battle.setCurrentMap(this);
    }
    
    public setCameraTarget(target: Vector3): void{
        this.targetOfCamera = target
    }
    private moveCameraToTarget(delta: number): void{
        //TODO Smooth position
        /*if (this.targetOfCamera) {
            Game.getAppStage.pivot.x = lerp(Game.getAppStage.pivot.x, this.targetOfCamera.x, delta * .5);
            Game.getAppStage.pivot.y = lerp(Game.getAppStage.pivot.x, this.targetOfCamera.y, delta * .5);

            Game.getAppStage.pivot.x = Math.round((Game.getAppStage.pivot.x + Number.EPSILON) * 100) / 100;
            Game.getAppStage.pivot.y = Math.round((Game.getAppStage.pivot.y + Number.EPSILON) * 100) / 100;
           
            console.log(`${this.targetOfCamera.y} ${Game.getAppStage.pivot.y}`)
            if (Game.getAppStage.pivot.x === this.targetOfCamera.x && Game.getAppStage.pivot.y === this.targetOfCamera.y) {
                this.targetOfCamera = undefined;
            }
 
        }*/
        const stage = Game.getCurrentScene;
        if (this.targetOfCamera) {
            stage.pivot.x = this.targetOfCamera.x
            stage.pivot.y = this.targetOfCamera.y
            //stage.position.x = Game.rendererWidth/2;
            //stage.position.y = Game.rendererHeight/2;
        }
    }

    /*
    //TODO  MOVE TO THE CAMERA CLASS AND MOVE ONLY TROUGHT TARGET POSITION (OR STORE HERE THESE FUNCTIONS?)
    private cameraInput(delta: number) {
        if (Input.state.get('ArrowRight')) {
          this.cameraPos.x += 200 * delta;
        } else if (Input.state.get('ArrowLeft')) {
          this.cameraPos.x -= 200 * delta;
        } else if (Input.state.get('ArrowUp')) {
          this.cameraPos.y -= 200 * delta;
        } else if (Input.state.get('ArrowDown')) {
          this.cameraPos.y += 200 * delta;
        }
        this.cameraPos.normalize();

        Game.setCameraPosition(this.cameraPos.x, this.cameraPos.y);
    }*/
      
    private checkVisibleEntities() :void {
        if (this.children) {
            for (const c in this.children) {  
                const child : DisplayObject = this.children[c];
                const pos = child.toGlobal(new Point(0, 0));
                child.renderable = (pos.x > 0 + (-this.tileSize.w * 4 ) && pos.y > 0 +(-this.tileSize.h * 4) && pos.x < Game.rendererWidth + this.tileSize.w
                                    && pos.y < Game.rendererHeight + this.tileSize.h);
            }
        }
    }

    public resetCenterPoingSprite(): void {
        if (this.getTiles) {
            for (const tile of this.tiles.values()) {
                tile.hideCenterPoint();
            }
        }
    }

    private generateMap(tilemap: ITilemap): void {
        //Treat the other layers and data
        for (let x = 0; x < tilemap.layers[1].createdTiles!.length ; x++) { 
            const tileData = tilemap.layers[1].createdTiles![x] as ITile;
            
            const rect = new Rectangle(tileData.tilesetTile[0], tileData.tilesetTile[1],
                tilemap.tileSize[0], tilemap.tileSize[1]);
            const texture = new Texture(this.baseTexture, rect);
            
            const tile = new Tile(tileData, texture, tilemap.tileSize);
        
            this.tiles.set(`${tileData.gridPosition.x},${tileData.gridPosition.y}`, tile);
            this.addChild(tile);
        }
        this.sortChildren();
    }

    public update(delta: number) : void {
        this.stats.begin()

        //this.cameraInput(delta);
        this.checkVisibleEntities();
        
        this.moveCameraToTarget(delta);
        this.updateEntities(delta);
        this.updateBattleStates(delta);

        this.stats.end();
    }

    private updateEntities(delta: number): void {
        this.playerSummoner.update(delta);
        this.adversarySummoner.update(delta);
        this.playerUnits.forEach(unit => {
            unit.update(delta);
        })
        this.adversaryUnits.forEach(unit => {
            unit.update(delta);
        })
    }

    private updateBattleStates(_delta: number): void{
        switch (Battle.state) {
            case  BATTLESTATES.TOSTART: //Here show the cinematic of the begin of battle
                Battle.state = BATTLESTATES.TURN;
                break;
            case BATTLESTATES.TURN:
                
                break;
            case BATTLESTATES.WON:
                
                break;
            
            case BATTLESTATES.DEFEAT:
                break;
            
            default:
                break;
        }
    }

}