import { Container, DisplayObject, Point } from "pixi.js";
import { Game, IScene } from "../game";
import { SPRITESIZE } from "./Tiles";

class MapScene extends Container implements IScene{

    //Tiles
    //estrutura do mapa aqui
    //ao ser construido passar pro battle manager seus tiles

    constructor() {
        super(); 
    }

    public update(delta: number) {


        this.checkVisibleEntities();
    }


    private checkVisibleEntities() {
        
        for (const c in this.children) {
            
            const child :DisplayObject = this.children[c];
            const pos = child.toGlobal(new Point(0, 0));
            child.renderable = (pos.x > 0 - SPRITESIZE.w * 2 && pos.y > 0 - SPRITESIZE.h && pos.x < Game.width + SPRITESIZE.w
                                && pos.y < Game.heigth + SPRITESIZE.h);
        }
    }
}