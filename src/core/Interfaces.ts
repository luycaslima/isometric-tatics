import { DisplayObject } from "pixi.js";


export interface IScene extends DisplayObject{
    update(delta: number): void;
}

export interface ITilemap {
    readonly tilesetName: string;
    readonly mapSize: [number, number]; //Number of tiles in the map width x height
    readonly tileSize: [number, number]; //Size of each tile
    readonly layers: Array<ILayer>;
}

//TODO transform those decorative layers in one texture?
export interface ILayer {
    readonly renderOrder: number;
    readonly name: string;
    readonly createdTiles?: Array<ITile>;
}

//Best to not export a Point from pixi js
export interface Vector3{
    x: number;
    y: number;
    z?: number; //UP directions simulating height(third axis) between tiles in the 2d world
}


export interface SpriteSize {
    w: number;
    h: number
}

export type TileType = "SPAWNER" | "NORMAL";
export interface ITile {
    //the position of the tile on the tileset basetexture (size of the grid * tileset size)
    readonly tilesetTile: [number, number];
    readonly isoPosition: Vector3;
    readonly gridPosition: Vector3;
    readonly depth: number; //depth
    readonly tileType: TileType; //TODO no purpose in the moment
    readonly neighbours: [Vector3 | undefined, Vector3 | undefined, Vector3 | undefined, Vector3 | undefined]
}