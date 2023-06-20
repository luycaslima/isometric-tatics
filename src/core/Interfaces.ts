import { DisplayObject } from "pixi.js";


export interface IScene extends DisplayObject{
    update(delta: number): void;
}

export interface ITilemap {
    tilesetName: string;
    mapSize: [number, number]; //Number of tiles in the map width x height
    tileSize: [number, number]; //Size of each tile
    layers: Array<ILayer>;
}

//TODO transform those decorative layers in one texture?
export interface ILayer {
    renderOrder: number;
    name: string;
    createdTiles?: Array<ITile>;
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
    tilesetTile: [number, number];
    isoPosition: Vector3;
    gridPosition: Vector3;
    depth: number; //depth
    tileType: TileType; //TODO no purpose in the moment
    neighbours: [Vector3 | undefined, Vector3 | undefined, Vector3 | undefined, Vector3 | undefined]
}