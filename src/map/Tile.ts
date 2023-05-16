import { Container, Point, Sprite, Texture } from "pixi.js";
import { IScene } from "../game";

// These are the four numbers that define the transform, i hat and j hat
const i_x = 1;
const i_y = 0.5;
const j_x = -1;
const j_y = 0.5;

//Constante por enquanto, futuro ser capaz de editar
export const SPRITESIZE = {w:48,h:48} as const;

//Converte grid position to  isometric position
export function toScreenCoordinates(gridPosition: Point): Point {
    //Multiply by halfbecause of the offset of 0 on the canvas
    return {
        x: gridPosition.x * i_x * 0.5 * SPRITESIZE.w + gridPosition.y * j_x * 0.5 * SPRITESIZE.w,
        y: gridPosition.x * i_y * 0.5 * SPRITESIZE.h + gridPosition.y * j_y *  0.5 * SPRITESIZE.h
    } as Point;
}


export class Tile extends Container implements IScene{
    private sprite: Sprite;

    private gridPosition: Point;
    private isoPosition: Point;
    

    constructor(gridPosition: Point, texture: Texture) {
        super();

        this.gridPosition = gridPosition;
        this.sprite = new Sprite(texture);
        this.isoPosition = toScreenCoordinates(gridPosition);
        
        /*const pivot : Sprite = Sprite.from('/tiles/pivot.png')
        pivot.anchor.set(0.5);
        const pos: Vector2 = this.getTileCentralPosition();
        pivot.x = pos.x;
        pivot.y = pos.y;*/

        this.position.x = this.isoPosition.x;
        this.position.y = this.isoPosition.y;

        //EVENTS MODES
        this.sprite.eventMode = 'static';
        this.sprite.on('pointerdown', this.getGridPosition.bind(this)); // Para que o eventolistener pegue o this do objeto n do window
       
        //TODO Evente call puxa mto desempenho
        //TODO ao mouse sair da tela o tile buga e sobe infinitamente
        //this.sprite.onmouseover = this.hoverTile.bind(this);
        //this.sprite.onmouseout = this.outTile.bind(this);

        this.addChild(this.sprite);
        //this.addChild(pivot);
    }


/*
    private hoverTile() {
        this.sprite.y = this.sprite.y - 8;
    }
    
    private outTile() {
        this.sprite.y = this.sprite.y + 8;
    }
*/

    private getGridPosition() {
        //fazer uma chamada a classe estatica q recbe todos os tiles de leitura pra avisar q foi ESSE que foi clicado
        console.log(`${this.gridPosition.x}  ${this.gridPosition.y}`);
        //return this.gridPosition;
    }

    public update(_delta: number): void {
        
    }

    //Return the top center of the sprite where the unit will stay
    public getTileCentralPosition(): Point {
        return {x:(SPRITESIZE.w /2) + this.position.x , y:(SPRITESIZE.h /2.5) + this.position.y } as Point;
    }


}