//import { MapScene } from "../map/MapScene";

import { Tile } from "../map/Tile";

/**
 * 
 */
/*
const BATTLESTATES = {
    TOSTART: 'TOSTART',
    WON :'WON',
    DEFEAT:'DEFEAT',
} as const;

type BATTLESTATES = typeof BATTLESTATES[keyof typeof BATTLESTATES];
*/

export class BattleManager {
    /*private state: BATTLESTATES = BATTLESTATES.TOSTART;

    private static instance: BattleManager;
    private static currentMap: MapScene;
    */
    
    public static currentMapGrid: Map<[number, number], Tile> = new Map<[number,number], Tile>;

    private constructor() { }
    
    public static loadMap(): void{
        
    }

    public static getTileAtPosition(x : number,y : number) : Tile | undefined{
        return BattleManager.currentMapGrid.get([x, y]);
    }

}