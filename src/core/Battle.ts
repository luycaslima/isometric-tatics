
import { Summoner, Unit } from "../entities/Unit";
import { MapScene } from "../map/MapScene";
import { Tile } from "../map/Tile";
import { Queue, Stack } from "./Utils";


/**
 * main ref for the a* algorithm : https://github.com/Matthew-J-Spencer/Pathfinding
 */
//TODO move this to the mapscene that will be updated 
export const BATTLESTATES = {
    TOSTART: 'TOSTART',
    TURN: 'TURN',
    WON :'WON',
    DEFEAT:'DEFEAT',
} as const;

type BATTLESTATES = typeof BATTLESTATES[keyof typeof BATTLESTATES];


export class Battle {
    public static state: BATTLESTATES = BATTLESTATES.TOSTART; //give a getset acess to the scene+
    
    private static queueOfUnitsToAct: Queue<Unit> 
    private static currentMap?: MapScene;
    
    //TODO Ter uma queue list da ordem de jogadas
    //TODO  acessar as Unidades do mapa atual de lá e criar a queue aqui

    //Clicar no tile
    //Checar se é meu turno , aka pode mover 
    //calcular do tile atual da unidade atual ao tile q foi clicado e mandar essar rota pra unidade
    //ao unidade encerrar seu movimento avisar que não está caminhando mais
    
    //TODO breadth by search to calculate which tiles open to movement
    public static setCurrentMap(map: MapScene)
    {
        Battle.currentMap = map;
        Battle.queueOfUnitsToAct = new Queue<Unit>;
        Battle.setQueueOfUnits();
    };

    private static setQueueOfUnits() {
        if (!Battle.currentMap) return;
        Battle.queueOfUnitsToAct.enqueue(Battle.currentMap.getPlayerSummoner)
        Battle.queueOfUnitsToAct.enqueue(Battle.currentMap.getAdversarySummoner)
    }

    //TODO works but refactor it . implement in a typescript way
    public static findPath(target: Tile): void {
        Battle.currentMap?.resetCenterPoingSprite(); //Debug route

        const currentUnit = Battle.queueOfUnitsToAct.peek(); //Peek because it only dequeue when end its turn

        if (Battle.state !== BATTLESTATES.TURN || !Battle.currentMap) return;
        const start: Tile = currentUnit.currentTile; 
        if (target.gridPosition.x === start.gridPosition.x && target.gridPosition.y === start.gridPosition.y) return;

       /* console.log(`H:${start.getDistance(target.gridPosition)} \n
            O x: ${start.gridPosition.x} ,O y: ${start.gridPosition.y} \n
            T x: ${target.gridPosition.x} , T O y: ${target.gridPosition.y}
        `)*/


        let toSearch: Tile[] = [start];
        const processed: Tile[] = []; //TODO Create a Map? to check if was processed

        while (toSearch.length > 0) {
            let current: Tile = toSearch[0];

            //TODO use binary search or heap for better perfomance (its O(4n) here i think)
            toSearch.forEach((t : Tile) => {
                if (t.getF < current.getF || t.getF == current.getF && t.getH < current.getH) current = t; 
            });
            
            processed.push(current);

            //Remove by filter is good for small, indexOF slice work better for bigger arrays
            //const index = toSearch.indexOf(current);
            //toSearch = toSearch.splice(index, 1);
            toSearch.shift(); //not the best to remove from , but it works


            //Route founded
            if (current === target) {
                let currentPathTile: Tile = target;
                const path: Stack<Tile> = new Stack<Tile>();

                let count = 100;
                while (currentPathTile !== start) {
                    path.push(currentPathTile);
                    currentPathTile = currentPathTile.getConnection!;

                    count--;
                    if (count < 0) throw Error('OVERFLOW OF COUNTER. ORIGIN TOO DISTANT');
                }
                currentUnit.setRoute(path);
                //TODO FOR DEBUG IT NEED TO DEQUEUE ONLY WHEN END TURN
                Battle.queueOfUnitsToAct.dequeue();
                if (Battle.queueOfUnitsToAct.isEmpty) Battle.setQueueOfUnits();

                return;
            }

            //Search neighbours 
            //TODO check height based if the unit can move
            current.neighbours.forEach((tilePos) => {
                if (!tilePos) return; //ignores the undefined ones

                const neighbour = Battle.currentMap?.getTiles.get(`${tilePos.x},${tilePos.y}`); //if there is a position for the neighbour, it exists
                if (!neighbour) throw Error("Neighbour not found"); 
                
                if (!processed.includes(neighbour) /*&& neighbour.isWalkable && neighbour.isSelectable */) {
                    const inSearch = toSearch.includes(neighbour);

                    const costToNeighbour = current.getG + current.getDistance(neighbour.gridPosition);

                    if (!inSearch || costToNeighbour < current.getG) {
                        neighbour.setG = costToNeighbour;
                        neighbour.setConnection = current;

                        if (!inSearch) {
                            neighbour.setH = neighbour.getDistance(target.gridPosition)
                            toSearch.push(neighbour);
                        }
                    }
                }
            })
        }

    }
    

}