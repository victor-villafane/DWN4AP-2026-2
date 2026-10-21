import { usersSchema } from "../schemas/users.js"

export async function validateUser(req, res, next) {
    try {
        const usuario = await usersSchema.parseAsync(req.body)
        req.body = usuario
        next()
    } catch (err) {
        const messages = errors.issues.map(error => `${error.path}: ${error.message}`)
        res.status(400).json(messages)
    }
} 