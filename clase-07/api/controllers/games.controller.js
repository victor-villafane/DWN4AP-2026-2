import * as gameService from "../../services/games.services.js"

export async function getGames(req, res) {
    try {
        const juegos = (await gameService.getGames()).filter(j => j.eliminado != true)
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
        const juegoAnterior = await gameService.getGameById(id)
        req.body = {
            "name": req.body.name ? req.body.name : juegoAnterior.name,
            "developer": req.body.developer ? req.body.developer : juegoAnterior.developer,
            "publisher": req.body.publisher ? req.body.publisher : juegoAnterior.publisher,
            "platforms": req.body.platforms ? req.body.platforms : juegoAnterior.platforms,
            "categories": req.body.categories ? req.body.categories : juegoAnterior.categories,
            "genres": req.body.genres ? req.body.genres : juegoAnterior.genres,
            "price": req.body.price ? req.body.price : juegoAnterior.price
        }
        const juego = await gameService.editGame(id, req.body)
        res.status(202).json(juego)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}