import express from "express"
import gamesRoutes from "./routes/games.routes.js"
import gameApiRoutes from "./api/routes/games.routes.js"
const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(gamesRoutes)
app.use(gameApiRoutes)

app.listen(2026, () => console.log("Funcionando...."))