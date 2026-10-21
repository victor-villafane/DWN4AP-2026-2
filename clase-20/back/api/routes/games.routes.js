import { Router } from "express"
import * as gameController from "../controllers/games.controller.js"
import { validateJuego } from "../../middlewares/juegos.validate.js"

const router = Router()

router.get("/api/juegos", gameController.getGames)
router.get("/api/juegos/:id", gameController.getGameById)
router.post("/api/juegos",[validateJuego], gameController.saveGame)
router.put("/api/juegos/:id",[validateJuego], gameController.replaceGame) //reemplazar
router.patch("/api/juegos/:id",[[validateJuego]], gameController.updateGame)
router.delete("/api/juegos/:id", gameController.deleteGame)
router.post("/api/juegos/:id/reviews", gameController.saveGameReview) //En el body viaja la info del usuario

export default router