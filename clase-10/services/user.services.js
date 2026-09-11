import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@dwn4ap.jpdiq2w.mongodb.net/?appName=dwn4ap"

const client = new MongoClient(MONGO_URI)   //Se conectan al cluster
const db = client.db("dwn4ap")              //Se conectan a la db

export async function getUsers(){
    return await db.collection("users").find().toArray()
}

export async function saveUser(usuario){
    await db.collection("users").insertOne(usuario)
    return usuario
}

export async function deleteUser(id){
    const user  = await db.collection("users").findOne({ _id: new ObjectId(id) })
    await db.collection("users").deleteOne({ _id: ObjectId(id) })
    return user
}

export async function getUserReviews(_id){
    const user  = await db.collection("users").findOne({ _id: new ObjectId(id) })
    return user?.reviews || []
}