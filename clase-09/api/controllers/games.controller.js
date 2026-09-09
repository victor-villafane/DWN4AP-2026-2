import * as gameService from "../../services/games.services.js"

export async function getGames(req, res) {
    try {
        const filtros = req.query
        const juegos = await gameService.getGames(filtros)
        res.status(200).json(juegos)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function getGameById(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.getGameById(id)
        if (juego.length == 0) return res.status(404).json({ message: "Juego no encontrado" })
        res.status(200).json(juego)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function saveGame(req, res) {
    try {
        const juego = await gameService.saveGame(req.body)
        res.status(201).json(juego)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function replaceGame(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.editGame(id, req.body)
        res.status(202).json(juego)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function deleteGame(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.deleteGameLogico(id)
        res.status(202).json(juego)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function updateGame(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.updateGame(id, req.body)
        res.status(202).json(juego)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}