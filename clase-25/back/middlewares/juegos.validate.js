import { juegosShema } from "../schemas/juegos.js"

export async function validateJuego(req, res, next){
    console.log("Validando...")
    try {
        const juego = await juegosShema.parseAsync(req.body);
        req.body = juego
        next()
    } catch (errors) {
        const messages = errors.issues.map( error => `${error.path}: ${error.message}` ) 
        res.status(400).json(messages)
    }
}