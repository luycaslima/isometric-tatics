//import InputManager from './core/InputManager';
import { SPRITESIZE, Tile } from './map/Tiles';
import './style.css'
import Stats from 'stats.js';
import {Application, BaseTexture, Container, Point, SCALE_MODES, Texture} from 'pixi.js'
//import { CompositeTilemap } from '@pixi/tilemap';



const stats : Stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);


const app: Application = new Application ({
  view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1, //?
  autoDensity: true, //?
  backgroundColor: 0x6495ed,
  width: 1280,
  height: 720,
})


BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;
//InputManager.initialize();

/*
Assets.add('blockTile','/tiles/block.png');
Assets.load(['blockTile']).then(() =>
{
    const tilemap : CompositeTilemap = new CompositeTilemap();

    // Render your first tile at (0, 0)!
  tilemap.tile('blockTile', 0, 0);
  
  app.stage.addChild(tilemap);
});
*/

const tileTexture: Texture = Texture.from('/tiles/block.png');
const tileMap: Container = new Container();

tileMap.x = app.screen.width / 2;
tileMap.y = 0;

for (let x = 0; x < 32; x++) {
  for (let y = 0; y < 32; y++) {
    const tile : Tile = new Tile(new Point(x,y), tileTexture)
    tileMap.addChild(tile);
  }
}

app.stage.addChild(tileMap);
app.stage.scale.set(2);


function loop(_delta: number) {
  stats.begin();
  
  //Para derenderizar os elementos na tela ( Porém se eu mandar desrenderizar o tilemap ele vai fz com os filhos)
  for (const c in tileMap.children) {
    const child = tileMap.children[c];
    const pos = child.toGlobal(new Point(0, 0)); //Essa tem que ser a posição atual da camera
    child.renderable = (pos.x > 0 - SPRITESIZE.w && pos.y - SPRITESIZE.h > 0 && pos.x < app.screen.width + SPRITESIZE.w  && pos.y < app.screen.height + SPRITESIZE.h );
    /*var pos = child.toGlobal(new PIXI.Point(0, 0))
      child.renderable = (pos.x > 0 && pos.y > 0 && pos.x < screenW && pos.y < screenH)
      if (child.children.length > 0) loopChildsDisableRenderablesOffScreen(child.children)
    */
  }
  stats.end();
}

//Core Loop
app.ticker.add(delta => loop(delta))

