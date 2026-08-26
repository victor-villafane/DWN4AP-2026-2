import {readFile} from "fs/promises"

export async function getGames(){
    return JSON.parse(await readFile("./data/steam.json", "utf-8"))
}

export async function getGameById(id){
    const juegos = await getGames()
    return juegos.find((juego) => juego.appid == id)
}