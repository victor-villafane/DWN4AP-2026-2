import jwt from "jsonwebtoken"

export function validateToken(req, res, next) {
    try {
        const auth = req.headers.authorization
        const [bearer, token] = auth.split(" ")
        if (bearer != "Bearer") throw new Error()
        const payload = jwt.verify(token, "Clave super secreta")
        req.usuario = payload
        next()
    } catch (error) {
        res.status(401).json({ message: "token invalido" })
    }
}

export function validateRol(roles) {
    return (req, res, next) => {
        if (roles.includes(req.usuario.rol)) {
            next()
        } else {
            res.status(401).json({ message: "Usuario no autorizado" })
        }
    }
}