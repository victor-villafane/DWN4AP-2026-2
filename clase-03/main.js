// const http = require("http") //Commonjs
import { createServer } from "http"
// const personajes = require("./data/personajes.js") //Commonjs
import { personajes } from "./data/personajes.js"
// const page = require("./page/utils.js") //Commonjs
import { createPage, createListPage } from "./page/utils.js"
import { readFile } from "fs"

const server = createServer((request, response) => {
    console.log(request.url)
    switch (request.url) {
        case "/":
            response.end(createPage("Mi nombre", "Victor Villafañe"))
            break
        case "/materia":
            response.end(createPage("Materia", "Aplicaciones Hibridas"))
            break
        case "/profesor":
            response.end(createPage("Profesor", "SADASDASD"))
            break
        case "/personajes":
            readFile("./data/characters.json", "utf-8", (err, data) => {
                if (err) response.end(createPage("Pagina no encontrada", "404"))
                else {
                    const personajes = JSON.parse(data)
                    response.end(createPage("Personajes", createListPage(personajes)))
                }
            })
            break
        case "/favicon.ico":
            readFile("./public/17871023246a8d.png", (err, data) => {
                response.end(data)
            })
            break
        case "/17871023246a8d.png":
            readFile("./public/17871023246a8d.png", (err, data) => {
                response.end(data)
            })
            break
        case "/contacto":
            readFile("./public/contacto.html", "utf-8", (err, data) => {
                if (err) response.end(createPage("Pagina no encontrada", "404"))
                else {
                    response.end(data)
                }
            })
            break
        case "/saludo":
            response.write( createPage("Saludo", "<h1>Hola</h1>") )
            break            
        case "/home":
            readFile("./public/index.html", "utf-8", (err, data) => {
                if (err) response.end(createPage("Pagina no encontrada", "404"))
                else {
                    response.end(data)
                }
            })
            break
        default:
            response.end(createPage("Pagina no encontrada", "404"))
            break
    }
})

server.listen(2026)