import { Router } from "express"
import * as userController from "../controllers/user.controller.js"
import { validateUser } from "../../middlewares/users.validate.js"
const router = Router()

router.get("/api/users", userController.getUsers)
router.post("/api/users",[validateUser], userController.saveUser)
router.post("/api/login", userController.loginUser)
router.delete("/api/users", userController.deleteUser)

export default router