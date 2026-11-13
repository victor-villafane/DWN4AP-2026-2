import * as gameService from "../services/games.services.js"
import * as gameView from "../views/games.views.js"

export async function getGames(req, res) {
    try {
        const filtros = req.query
        const juegos = await gameService.getGames(filtros)
        res.send(gameView.gameList(juegos))
    } catch (error) {
        res.send(gameView.page404())
    }
}

export async function getGameById(req, res) {
    try {
        const id = req.params?.id
        const juego = await gameService.getGameById(id)
        res.send(gameView.game(juego))
    } catch (error) {
        res.send(gameView.page404())
    }
}

export function newGameForm(req, res) {
    try {
        res.send(gameView.newGameForm())
    } catch (error) {
        res.send(gameView.page404())
    }
}
export async function editGameForm(req, res) {
    try {
        const id = req.params?.id
        const juego = await gameService.getGameById(id)
        res.send(gameView.editGameForm(juego))
    } catch (error) {
        res.send(gameView.page404())
    }
}
export async function saveGame(req, res) {
    try {
        const juego = await gameService.saveGame(req.body)
        res.send(gameView.game(juego))
    } catch (error) {
        res.send(gameView.page404())
    }
}

export async function editGame(req, res) {
    try {
        const id = req.params?.id
        const juego = await gameService.editGame(id, req.body)
        res.send(gameView.game(juego))
    } catch (error) {
        res.send(gameView.page404())
    }
}

export async function deleteGameForm(req, res) {
    try {
        const id = req.params?.id
        const juego = await gameService.getGameById(id)
        res.send(gameView.createDetailDeletePage(juego))
    } catch (error) {
        res.send(gameView.page404())
    }
}

export async function deleteGame(req, res) {
    try {
        const id = req.params?.id
        const juego = await gameService.deleteGameLogico(id)
        res.send(gameView.game(juego))
    } catch (error) {
        res.send(gameView.page404())
    }
}