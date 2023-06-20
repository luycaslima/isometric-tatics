import { MapScene } from "../map/MapScene";

/**
 * 
 */

const BATTLESTATES = {
    TOSTART: 'TOSTART',
    WON :'WON',
    DEFEAT:'DEFEAT',
} as const;

type BATTLESTATES = typeof BATTLESTATES[keyof typeof BATTLESTATES];


export class Battle {
    private state: BATTLESTATES = BATTLESTATES.TOSTART;
    
    

    private constructor() { }
    


}