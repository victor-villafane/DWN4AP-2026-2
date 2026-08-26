import express from "express"
import { getGameById, getGames } from "./controllers/games.controller.js"

const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get("/juegos", getGames)
app.get("/juegos/:id", getGameById)

app.listen(2026, () => console.log("Funcionando...."))