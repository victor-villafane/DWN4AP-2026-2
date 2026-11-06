import * as gameController from "../controllers/games.controller.js"
import { Router } from "express"

const router = Router()

router.get("/juegos", gameController.getGames)
router.get("/juegos/nuevo", gameController.newGameForm)         // Route -> Controller -> View/Service
router.get("/juegos/editar/:id", gameController.editGameForm)   // Route -> Controller -> View/Service
router.post("/juegos/editar/:id", gameController.editGame)      // Route -> Controller -> View/Service
router.get("/juegos/borrar/:id", gameController.deleteGameForm) // Route -> Controller -> View/Service
router.post("/juegos/borrar/:id", gameController.deleteGame)    // Route -> Controller -> View/Service
router.post("/juegos/nuevo", gameController.saveGame)           // Route -> Controller -> View/Service
router.get("/juegos/:id", gameController.getGameById)           // Route -> Controller -> View/Service

export default router