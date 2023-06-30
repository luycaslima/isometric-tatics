import { Container, Point, Polygon, Sprite, Texture } from "pixi.js";
import { IScene, ITile, SpriteSize, TileType, Vector3 } from "../core/Interfaces";
import { Battle } from "../core/Battle";


export class Tile extends Container implements IScene, ITile{
    tilesetTile: [number, number];
    depth: number;
    tileType: TileType; 
    
    gridPosition: Vector3;
    isoPosition: Point;

    private sprite: Sprite;
    private tileSize: SpriteSize;
    private centerPoint: Sprite;

    //A* pathfinding
    private _h: number = 0;
    private _g: number = 0;
    private _f: number = this._h + this._g;
    private _isWalkable: boolean = false;
    
    private connection?: Tile; //Tile with the shortest path to the goal 
    // Array of neighbors tiles (the tile can have max 4) no diagonal movement
    neighbours: [Vector3 | undefined, Vector3 | undefined, Vector3 | undefined, Vector3 | undefined]; //Up, left, down, right


    //Has to have undefined because the connection is nullable 
    public get getConnection(): Tile | undefined {
        return this.connection;
    }
    public set setConnection(tile: Tile) {
        this.connection = tile;
    }

    public get g(): number {
        return this._g;
    }
    public set setG(g: number) {
        this._g = g;
    }

    public get h(): number {
        return this._h;
    }
    public set setH(h: number) {
        this._h = h;
    }

    public get f(): number {
        this._f = this._g + this._h;
        return this._f;
    }

    public get isWalkable(): boolean{
        return this._isWalkable;
    }
    public set isWalkable(value: boolean){
        this._isWalkable = value;
    }

    constructor( tileData : ITile, texture: Texture, tileSize : [number,number]) {
        super();

        this.gridPosition = tileData.gridPosition;
        
        this.sprite = new Sprite(texture);
        this.isoPosition = new Point(tileData.isoPosition.x, tileData.isoPosition.y);
        this.neighbours = tileData.neighbours;

        this.depth = tileData.depth;
        this.zIndex = this.depth;

        this.tileSize = { w: tileSize[0], h: tileSize[1] } as SpriteSize;

        //Not useful here anymore
        this.tilesetTile = tileData.tilesetTile;
        //Not useful in the moment
        this.tileType = tileData.tileType;
        
        this.position.x = this.isoPosition.x;
        this.position.y = this.isoPosition.y;

        //TODO implement the hit area data on map editor or here?

        //EVENTS MODES
        this.sprite.hitArea = new Polygon([
            0, 11,
            23, 0,
            47, 12,
            47, 35,
            24, 47,
            0, 35,
        ])
        
        this.sprite.eventMode = 'static';
        this.sprite.on('pointerdown', this.getGridPosition.bind(this)); // Para que o eventolistener pegue o this do objeto n do window
        this.sprite.on('pointerover', this.hoverTile.bind(this));
        this.sprite.on('pointerout', this.outTile.bind(this));
        this.addChild(this.sprite);
        

        //Debug square
        this.centerPoint = Sprite.from('tiles/pivot.png');
        this.centerPoint.x = this.sprite.position.x;
        this.centerPoint.y = this.sprite.position.y - this.tileSize.h /3.5;
        
        this.centerPoint.zIndex = this.zIndex + 1;
        this.addChild(this.centerPoint);
        this.centerPoint.renderable = false;

        
        this.sortChildren();
    }

    public getDistance(coords : Vector3) : number {
        const dist = {x: Math.abs(this.gridPosition.x - coords.x ), y: Math.abs(this.gridPosition.y - coords.y)} as Vector3; 
        //Why max? For Orthogonal movement
        //https://www.reddit.com/r/roguelikedev/comments/o8dy9l/calculate_distance_between_2_entities_on_a_tile/
        const max = Math.max(dist.x, dist.y);
        this.centerPoint.renderable = true;
        return max;
    }

    public hideCenterPoint() {
        this.centerPoint.renderable = false;
    }
    private hoverTile() {
        //this.sprite.y = this.sprite.y - 8;
        this.sprite.tint =  0x666666;
    }
    
    private outTile() {
       // this.sprite.y = this.sprite.y + 8;
        this.sprite.tint = 0xFFFFFF;
    }

    
    private getGridPosition() {
        //console.log(`x: ${this.gridPosition.x}, y: ${this.gridPosition.y},z: ${this.gridPosition.z}`);
        Battle.findPath(this);
        //this.sprite.tint = 0x333333;
    }

    public update(_delta: number): void {
        
    }

    //Return the top center of the sprite where the unit will stay
    public getTileCentralPosition(): Point {
        return {x: (this.tileSize.w/2) + this.position.x , y: (this.tileSize.h)/2.5 + this.position.y } as Point;
    }


}