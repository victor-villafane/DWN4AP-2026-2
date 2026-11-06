import { validateUser } from "../services/supabase.sevices.js";

export async function validateTokenSupabase(req, res, next) {
    try {
        const [bearer, token] = req.headers.authorization.split(" ");
        const usuario = await validateUser(token);
        req.usuario = {
            email: usuario.email,
            name: usuario.user_metadata.name,
            rol: "user"
        }
        next()
    } catch (error) {
        res.status(401).json({message: "Usuario no autorizado"})
    }
}