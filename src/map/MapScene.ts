import { Container, DisplayObject, Point, Texture } from "pixi.js";
import { Game, IScene } from "../game";
import { SPRITESIZE, Tile } from "./Tile";
import '@pixi/math-extras';
import Stats from "stats.js";
import InputManager from "../core/InputManager";
import { Camera } from "./Camera";
import { Summoner } from "../entities/Unit";


/**
 * When constructed recieve the file that defines how the map is constructed
 * and the initial positions of the Summoners
 * YOUR MAIN RESPONSABILITY IS CONTROL WHAT IS SHOWED ON THE SCREEN ( RENDERING) WITH THE CAMERA 
 */

export class MapScene extends Container implements IScene{

    private cameraPos: Point;
    private camera: Camera; 
    
    //Tiles
    //ao ser construido passar pro battle manager seus tiles para ser calculado seus vizinhos
    private tiles: Array<Tile> = new Array<Tile>;
    
    // STATS FOR PERFOMANCE DEBUGING   
    private stats: Stats = new Stats();
    
    constructor() {
        super(); 

        this.camera = new Camera();

        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);
        
        
        this.cameraPos = new Point(0, 0);
        
        //TODO  LOAD THE STRUCTURE THROUGH A FILE - THIS IS JUST A DEBUG MAP 
        const tileTexture: Texture = Texture.from('/tiles/block.png');

        this.x = Game.width / 4;
        this.y = 0;

        //TODO Save reference of tiles in the battle manager or give acess here?

        for (let x = 0; x < 32; x++) {
            for (let y = 0; y < 32; y++) {
                const tile: Tile = new Tile(new Point(x, y), tileTexture)
                this.addChild(tile);
                this.tiles.push(tile);
            }
        }

        //TODO For debug Spawn Summoner Spawn in the correct position in each map. 
        const texture: Texture = Texture.from('/sprites/placeholder_nonanimated.png');
        const summoner: Summoner = new Summoner(this.tiles[5].getTileCentralPosition(), texture);
        summoner.position = this.tiles[0].getTileCentralPosition();

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
      
    public update(delta: number) {
        this.stats.begin()


        this.cameraInput(delta);

        this.camera.update(delta);
        //TODO store the units(Monster and summoners) separately of the tiles to update here (check if in the future the tiles need to update too) 
        this.checkVisibleEntities();

        this.stats.end();
    }


    private checkVisibleEntities() {
        if (this.children) {
            for (const c in this.children) {
                
                const child : DisplayObject = this.children[c];
                const pos = child.toGlobal(new Point(0, 0));
                child.renderable = (pos.x > 0 - SPRITESIZE.w * 2 && pos.y > 0 - SPRITESIZE.h && pos.x < Game.width + SPRITESIZE.w
                                    && pos.y < Game.heigth + SPRITESIZE.h);
            }
        }
    }
}