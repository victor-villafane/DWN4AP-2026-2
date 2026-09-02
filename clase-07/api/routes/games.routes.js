import * as gameController from "../controllers/games.controller.js"
import { Router } from "express"

const router = Router()

router.get("/api/juegos", gameController.getGames)
router.get("/api/juegos/:id", gameController.getGameById)
router.post("/api/juegos", gameController.saveGame)
router.put("/api/juegos/:id", gameController.replaceGame) //reemplazar
router.patch("/api/juegos/:id", gameController.updateGame)
router.delete("/api/juegos/:id", gameController.deleteGame)

export default router