import { MongoClient, ObjectId } from "mongodb"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const MONGO_URI = "mongodb+srv://admin:admin@dwn4ap.jpdiq2w.mongodb.net/?appName=dwn4ap"

const client = new MongoClient(MONGO_URI)   //Se conectan al cluster
const db = client.db("dwn4ap")              //Se conectan a la db

export async function getUsers() {
    return await db.collection("users").find().toArray()
}

export async function saveUser(usuario) {
    const existe = await db.collection("users").findOne({ email: usuario.email })
    if (existe) throw new Error()
    usuario.password = await bcrypt.hash(usuario.password, 10)
    delete usuario.confirmPassword
    await db.collection("users").insertOne(usuario)
    return usuario
}

export async function deleteUser(id) {
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) })
    await db.collection("users").deleteOne({ _id: ObjectId(id) })
    return user
}

export async function getUserReviews(_id) {
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) })
    return user?.reviews || []
}

export async function login(usuario) {
    const usuarioDB = await db.collection("users").findOne({ email: usuario.email })
    if (!usuarioDB) throw new Error()
    const valido = await bcrypt.compare(usuario.password, usuarioDB.password)
    if (!valido) throw new Error()
    const token = jwt.sign(
        { email: usuarioDB.email, rol: usuarioDB.rol }, "Clave super secreta", { expiresIn: "2h" }
    )
    return {
        email: usuarioDB.email,
        rol: usuarioDB.rol,
        name: usuarioDB.name,
        username: usuarioDB.username,
        token: token
    }
}