import * as userService from "../../services/user.services.js"

export async function getUsers(req, res) {
    try {
        const usuarios = await userService.getUsers()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({ message: "No se encontraron los usuarios" })
    }
}

export async function saveUser(req, res) {
    try {
        const user = await userService.saveUser(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: "No se pudo guardar el usuario" })
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.params.id
        const user = await userService.deleteUser(id)
        if (user) res.status(202).json(user)
        else res.status(404).json({ message: "usuario no encontrado" })
    } catch (error) {
        res.status(500).json({ message: "No se pudo borrar el usuario" })
    }
}

export async function loginUser(req, res) {
    try {
        const user = await userService.login(req.body)
        if (!user) return res.status(400).json({ message: "Usuario o contraseña incorrecto" })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: "No se pudo guardar el usuario" })
    }
}

export async function asignarRol(req, res) {
    try {
        const user = await userService.asignarRol(req.body)
        if (!user) return res.status(400).json({ message: "Usuario no encontrado" })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: "Usuario no encontrado" })
    }
}

export async function resetPassword(req, res) {
    try {
        const user = await userService.resetPassword(req.body)
        if (!user) return res.status(400).json({ message: "Usuario no encontrado" })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: "Usuario no encontrado" })
    }
}