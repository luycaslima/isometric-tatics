import './style.css'
import { Game } from './game';
import { SceneLoader } from './core/SceneLoader';


Game.initialize(1280, 720, 0x6495ed);

const loader: SceneLoader = new SceneLoader();
Game.changeScene(loader);