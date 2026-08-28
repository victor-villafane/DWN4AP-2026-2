import express from "express"
import gamesRoutes from "./routes/games.routes.js"

const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.use(gamesRoutes)

app.listen(2026, () => console.log("Funcionando...."))