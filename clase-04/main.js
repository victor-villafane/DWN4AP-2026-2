import express from "express"
import { createPage } from "./page/utils.js"
const app = express()

app.use( "/", express.static("public") )

// app.get("/", (req, res) => {
//     res.send( createPage("Bienvenido", "Victor") )
// } )
app.get("/saludo", (req, res) => {
    console.log("OK")
    res.send("ok")
})
app.post("/saludo", (req, res) => {
    console.log("OK")
})

app.listen( 2026, () => console.log("Funcionando....") )