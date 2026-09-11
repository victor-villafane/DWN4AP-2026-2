import { Router } from "express"
import * as userController from "../controllers/user.controller.js"
const router = Router()

router.get("/api/users", userController.getUsers)
router.post("/api/users", userController.saveUser)
router.delete("/api/users", userController.deleteUser)

export default router