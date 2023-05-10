import { Container, Point, Sprite, Texture } from "pixi.js";

// These are the four numbers that define the transform, i hat and j hat
const i_x = 1;
const i_y = 0.5;
const j_x = -1;
const j_y = 0.5;


//Constante por enquanto, futuro ser capaz de editar
export const SPRITESIZE = {w:48,h:48} as const;
/*
export type Tile = {
    gridPosition: Vector2;
    isoPosition: Vector2;
    sprite: Sprite;
    neighbors: Array<[Tile | undefined, Tile | undefined,Tile | undefined, Tile | undefined]>; // Array de vizinhos do bloco(4)q pode ter ou nao
}
*/

//Converte grid position to  isometric position
export function toScreenCoordinates(gridPosition: Point): Point {

    //Multiply by halfbecause of the offset of 0 on the canvas
    return {
        x: gridPosition.x * i_x * 0.5 * SPRITESIZE.w + gridPosition.y * j_x * 0.5 * SPRITESIZE.w,
        y: gridPosition.x * i_y * 0.5 * SPRITESIZE.h + gridPosition.y * j_y *  0.5   * SPRITESIZE.h
    } as Point;
}


export class Tile extends Container {
    private gridPosition: Point;
    private sprite: Sprite;
    
    private isoPosition: Point;
    
    // Array de vizinhos do bloco(4)q pode ter ou nao
    //private neighbors: Array<[Tile | undefined, Tile | undefined,Tile | undefined, Tile | undefined]>;
    
    constructor(gridPosition: Point, texture: Texture) {
        super();

        this.gridPosition = gridPosition;
        this.sprite = new Sprite(texture);
        this.isoPosition = toScreenCoordinates(gridPosition);
        
        //this.sprite.
        //this.sprite.anchor.set(0.5);
        
        /*const pivot : Sprite = Sprite.from('/tiles/pivot.png')
        pivot.anchor.set(0.5);
        const pos: Vector2 = this.getTileCentralPosition();
        pivot.x = pos.x;
        pivot.y = pos.y;*/

        //pivot.anchor.set(-1,-0.25);

        this.position.x = this.isoPosition.x;
        this.position.y = this.isoPosition.y;
        this.sprite.anchor.set(0,0.5);
        
        //estudar eventmodes
        /**
         * 'none': Ignores all interaction events, even on its children.
            'passive': Does not emit events and ignores all hit testing on itself and non-interactive children. 
            Interactive children will still emit events.
            'auto': Does not emit events and but is hit tested if parent is interactive. Same as interactive = false in v7
            'static': Emit events and is hit tested. Same as interaction = true in v7
            'dynamic': Emits events and is hit tested but will also receive mock interaction events fired from a ticker to allow for interaction 
            when the mouse isn't moving
         */

        //EVENTS
        this.sprite.eventMode = 'static';
        this.sprite.on('pointerdown', this.getGridPosition.bind(this)); // Para que o eventolistener pegue o this do objeto n do window
       
        //TODO Evente call puxa mto desempenho
        //TODO ao mouse sair da tela o tile buga e sobe infinitamente
        this.sprite.onmouseover = this.hoverTile.bind(this);
        this.sprite.onmouseout = this.outTile.bind(this);

        this.addChild(this.sprite);
        //this.addChild(pivot);
        //console.log(`${pivot.x} ${pivot.y} `)
    }

    private hoverTile() {
        this.sprite.y = this.sprite.y - 8;
    }
    
    private outTile() {
        this.sprite.y = this.sprite.y + 8;
    }


    private getGridPosition() {
        //fazer uma chamada a classe estatica q recbe todos os tiles de leitura pra avisar q foi ESSE que foi clicado
        console.log(`${this.gridPosition.x}  ${this.gridPosition.y}`);
        //return this.gridPosition;
    }


    //Refatorar pois o centro n é exatamente o centro do bloco e sim acima dele
    getTileCentralPosition(): Point {
        return {x:(SPRITESIZE.w /2) + this.position.x , y:(SPRITESIZE.h /4) + this.position.y } as Point;
    }


}