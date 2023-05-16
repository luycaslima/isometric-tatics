import './style.css'
import { Game } from './game';
import { MapScene } from './map/MapScene';
//import { CompositeTilemap } from '@pixi/tilemap';


Game.initialize(1600, 900, 0x6495ed);

const map: MapScene = new MapScene();
Game.changeScene(map);

/*
//TODO CHeck if tilemap package will be necessary with the size of the map

Assets.add('blockTile','/tiles/block.png');
Assets.load(['blockTile']).then(() =>
{
    const tilemap : CompositeTilemap = new CompositeTilemap();

    // Render your first tile at (0, 0)!
  tilemap.tile('blockTile', 0, 0);
  
  app.stage.addChild(tilemap);
});

*/
