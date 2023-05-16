//import { MapScene } from "../map/MapScene";

/**
 * 
 */
const BATTLESTATES = {
    TOSTART: 'TOSTART',
    
    WON :'WON',
    DEFEAT:'DEFEAT',
} as const;

type BATTLESTATES = typeof BATTLESTATES[keyof typeof BATTLESTATES];

export class BattleManager {
    /*private state: BATTLESTATES = BATTLESTATES.TOSTART;

    private static instance: BattleManager;
    private static currentMap: MapScene;
    */
    private constructor() { }
    
    public static initialize(): void{

    }

}