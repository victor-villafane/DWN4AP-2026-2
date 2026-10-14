import { juegosShema } from "../schemas/juegos.js"

export async function validateJuego(req, res, next){
    console.log("Validando...")
    try {
        await juegosShema.parseAsync(req.body);
        // next()
    } catch (error) {
        console.log(error)
    }
    // res.status(400).json({message: "Estructura no valida"})
}