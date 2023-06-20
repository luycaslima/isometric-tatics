import { BaseTexture, Container, DisplayObject, Point, Rectangle, Texture } from "pixi.js";
import { Game } from "../game";
import { Tile } from "./Tile";
import '@pixi/math-extras';
import Stats from "stats.js";
import InputManager from "../core/InputManager";
import { Camera } from "./Camera";
import { Summoner } from "../entities/Unit";
import { ILayer, IScene, ITile, ITilemap, SpriteSize } from "../core/Interfaces";


/**
 * When constructed recieve the file that defines how the map is constructed
 * and the initial positions of the Summoners
 * YOUR MAIN RESPONSABILITY IS CONTROL WHAT IS SHOWED ON THE SCREEN ( RENDERING) WITH THE CAMERA  
*/

export class MapScene extends Container implements IScene/*, ITilemap*/{

    tilesetName: string;
    mapSize: [number, number];
    tileSize: SpriteSize;
    //layers: ILayer[];

    private baseTexture: BaseTexture;
    
    private cameraPos: Point;
    private camera: Camera; 
    
    //Tiles
    //ao ser construido passar pro battle manager 
    private tiles: Map<string,Tile> = new Map();
    
    // STATS FOR PERFOMANCE DEBUGING   
    private stats: Stats = new Stats();
    
    constructor(tilemap: ITilemap) {
        //TODO pass the loaded assets here the json, and the name of the map
        super();

        this.camera = new Camera();
        //For debug
        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);
        
        
        this.cameraPos = new Point(0, 0);
        this.tilesetName = tilemap.tilesetName;
        this.mapSize = tilemap.mapSize;
        this.tileSize = { w: tilemap.tileSize[0], h: tilemap.tileSize[1] } as SpriteSize;

        this.baseTexture = BaseTexture.from(`${tilemap.tilesetName}`);
        
        //TODO understand the origin to always center
        this.x = Game.rendererWidth / 6;
        this.y = -Game.rendererHeight / 6;
        
        this.generateMap(tilemap);

        const tile = this.tiles.get("13,11");
        //TODO For debug Spawn Summoner Spawn in the correct position in each map.  
        const texture: Texture = Texture.from('/sprites/placeholder_nonanimated.png');
        const summoner: Summoner = new Summoner(tile!.getTileCentralPosition(), texture);
        summoner.position = tile!.getTileCentralPosition();

        this.addChild(summoner);
    }

    
    //TODO  MOVE TO THE CAMERA CLASS AND MOVE ONLY TROUGHT TARGET POSITION (OR STORE HERE THESE FUNCTIONS?)
    private cameraInput(delta: number) {
        if (InputManager.state.get('ArrowRight')) {
          this.cameraPos.x += 4 * delta;
        } else if (InputManager.state.get('ArrowLeft')) {
          this.cameraPos.x -= 4 * delta;
        } else if (InputManager.state.get('ArrowUp')) {
          this.cameraPos.y -= 4 * delta;
        } else if (InputManager.state.get('ArrowDown')) {
          this.cameraPos.y += 4 * delta;
        }
        this.cameraPos.normalize();

        Game.setCameraPosition(this.cameraPos.x, this.cameraPos.y);
    }
      
    public update(delta: number) : void {
        this.stats.begin()

        this.cameraInput(delta);
        this.camera.update(delta);
        //TODO store the units(Monster and summoners) separately of the tiles to update here (check if in the future the tiles need to update too) 
        this.checkVisibleEntities();

        this.stats.end();
    }


    private checkVisibleEntities() :void {
        if (this.children) {
            for (const c in this.children) {
                
                const child : DisplayObject = this.children[c];
                const pos = child.toGlobal(new Point(0, 0));
                child.renderable = (pos.x > 0 - this.tileSize.w * 2 && pos.y > 0 - this.tileSize.h * 2 && pos.x < Game.rendererWidth + this.tileSize.w
                                    && pos.y < Game.rendererHeight + this.tileSize.h);
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
}