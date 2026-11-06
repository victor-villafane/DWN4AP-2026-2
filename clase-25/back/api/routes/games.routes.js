import { Router } from "express"
import * as gameController from "../controllers/games.controller.js"
import { validateJuego } from "../../middlewares/juegos.validate.js"
import { validateRol, validateToken } from "../../middlewares/auth.validate.js"

const router = Router()

router.get("/api/juegos",validateToken,validateRol(["user","admin", "superadmin"]), gameController.getGames)
router.get("/api/juegos/:id", gameController.getGameById)
router.post("/api/juegos", [validateToken, validateRol(["admin", "superadmin"]), validateJuego], gameController.saveGame)
router.put("/api/juegos/:id", [validateToken, validateRol(["admin", "superadmin"]), validateJuego], gameController.replaceGame) //reemplazar
router.patch("/api/juegos/:id", [validateToken, validateRol(["admin", "superadmin"]), validateJuego], gameController.updateGame)
router.delete("/api/juegos/:id", [validateToken, validateRol(["superadmin"])], gameController.deleteGame)
router.post("/api/juegos/:id/reviews", gameController.saveGameReview) //En el body viaja la info del usuario

export default router