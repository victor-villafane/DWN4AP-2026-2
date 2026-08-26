import { getGames as getGamesService, getGameById as gameById } from "../services/games.services.js"
import { game, gameList, page404 } from "../views/games.views.js"

export async function getGames(req, res) {
    try {
        const juegos = await getGamesService()
        res.send( gameList(juegos) )
    } catch (error) {
        res.send( page404() )
    }
}

export async function getGameById(req, res) {
    try {
        const id = req.params?.id
        const juego = await gameById(id)
        res.send(game(juego))
    } catch (error) {
        res.send( page404() )
    }
}