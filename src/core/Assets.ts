import type { ResolverManifest } from "pixi.js";


//The Assets from pixi never download the same file twice,
//therefore is not a problem to refer to the same asset more than 1 time

//Separate the bundle in maps, characters and audio?
//or only in map(the music, sprite and tiles) and units
export const manifest : ResolverManifest = {
    bundles:[
        {
            name: 'Map',
            assets: [
                {
                    name: "tilemap",
                    srcs: "tiles/isometric_tiles.png",
                },
                {
                    name: "tilemapData",
                    srcs: "maps/m_grassField.json"
                }
            ]
        }
    ]
}

/* Can be like this the bundle 
{
        ...
        "my text": "./myTextFile.txt",
        "my json": "./myJsonFile.json",
        "my xml": "./myXMLFile.xml",
        ...
    }
*/