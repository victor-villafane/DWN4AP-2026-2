const http = require("http")

const personajes = [
    {
        id: 1,
        nombre: "Homero Simpson",
        nota: 7
    },
    {
        id: 2,
        nombre: "Marge Simpson",
        nota: 10
    },
    {
        id: 3,
        nombre: "Bart Simpson",
        nota: 5
    },
    {
        id: 4,
        nombre:  "Lisa Simpson",
        nota: 10
    },
    {
        id: 5,
        nombre: "Maggie Simpson",
        nota: 10
    }            
]

const server = http.createServer( (request, response) => {
    console.log(request.url)
    response.write('<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Document</title></head><body>')
    response.write("<h1>Mi espectacular página web!</h1>")
    switch( request.url ){
        case "/":
            response.write("Victor Villafañe")
            break
        case "/materia":
            response.write("Aplicaciones Hibridas")
            break
        case "/profesor":
            response.write("SADASDASD")
            break
        case "/alumnos":
            response.write("<ul>")
            personajes.forEach( personaje => response.write( 
                    "<li>Nombre: "+personaje.nombre+" Nota: "+personaje.nota+"</li>" 
                ) )
            response.write("</ul>")            
            break
        default:
            response.write("404")
            break
    }
    response.end("</body></html>")
} )

server.listen(2026)