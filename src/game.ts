
//Initiante

import { Application, DisplayObject } from "pixi.js";

//Load Content

//Update(Loop)
    //Process Inpit
    //Update
    //Render


//maintain the states of the game and load scenes

export default class Game {
    constructor(){}

    private static game: Application;
    private static currentScene: IScene; 


    public static initialize() {
        
    }
}


export interface IScene extends DisplayObject{

}

