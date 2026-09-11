import * as gameController from "../controllers/games.controller.js"
import { Router } from "express"

const router = Router()

router.get("/api/juegos", gameController.getGames)
router.get("/api/juegos/:id", gameController.getGameById)
router.post("/api/juegos", gameController.saveGame)
router.put("/api/juegos/:id", gameController.replaceGame) //reemplazar
router.patch("/api/juegos/:id", gameController.updateGame)
router.delete("/api/juegos/:id", gameController.deleteGame)
router.post("/api/juegos/:id/reviews", gameController.saveGameReview) //En el body viaja la info del usuario

export default router