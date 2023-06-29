import type { ResolverManifest } from "pixi.js";


//The Assets from pixi never download the same file twice,
//therefore is not a problem to refer to the same asset more than 1 time

//Separate the bundle in maps, characters and audio?
//or only in map(the music, sprite and tiles) and units
export const manifest: ResolverManifest = {
    bundles: [
        {
            name: 'Maps',
            assets: [
                {
                    name: "mGrassField",
                    srcs: "maps/m_grassField.json"
                }
            ]
        },
        {
            name: 'Tilesets',
            assets: [
                {
                    name: "isometric_tiles.png",
                    srcs: "tiles/isometric_tiles.png",
                },
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