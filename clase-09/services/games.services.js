import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@dwn4ap.jpdiq2w.mongodb.net/?appName=dwn4ap"

const client = new MongoClient(MONGO_URI)   //Se conectan al cluster
const db = client.db("dwn4ap")              //Se conectan a la db

export async function getGames(filtros = {}) {
    const filter = { eliminado: { $ne: true } }
    // Calculo de paginas
    const page = parseInt(filtros.page) || 1
    const limit = parseInt(filtros.limit) || 10

    const skip = ( page - 1 ) * limit
    // Ordenamiento
    // 1 asc
    //-1 desc
    //positive_ratings
    const sortBy = filtros.sort_by || "positive_ratings"                //Columna
    const sortOrder = filtros.sort_order == "asc" ? 1 : -1              //Ordenamiento por default desc
    const orderOptions = { [sortBy]: sortOrder }                        //obj para mongodb
    // Filtros por precio
    if( filtros?.price_min ) filter.price = { $gt: parseInt(filtros.price_min) }
    if( filtros?.price_max ) filter.price = { $lt: parseInt(filtros.price_max) }

    if( filtros?.price_min && filtros?.price_max){ 
        filter.$and = [
            { price: { $gt: parseInt(filtros.price_min) } },
            { price: { $lt: parseInt(filtros.price_max) } }
        ] //https://www.mongodb.com/es/docs/manual/reference/operator/query/and/
    }
    // Filtro por desarrollador
    if( filtros?.developer ) filter.developer = { $eq: filtros?.developer }
    // Filtro por Nombre
    if( filtros?.name ) filter.$text = { $search: filtros.name }
    //https://www.mongodb.com/es/docs/manual/reference/operator/query/ne/
    const juegos = await db.collection("juegos")
                    .find( filter )
                    .sort( orderOptions )
                    .skip( skip )
                    .limit( limit )
                    .toArray()
    const documentos = await db.collection("juegos").countDocuments( filter )
    juegos.push({ documentos: documentos, totalPages: Math.ceil(documentos/limit), currentPage: page })
    return juegos
}

export async function getGameById(id) {
    const juego = await db.collection("juegos").findOne({ _id: new ObjectId(id) })
    return juego
}

export async function saveGame(juego) {
    await db.collection("juegos").insertOne(juego)
    return juego
}

export async function editGame(id, juego) {
    await db.collection("juegos").replaceOne({ _id: new ObjectId(id) }, juego)
}

export async function updateGame(id, juego) {
    await db.collection("juegos").updateOne(
        { _id: new ObjectId(id) }, { $set: juego }//https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
    )
    return juego
}

export async function deleteGameFisico(id) {
    await db.collection("juegos").deleteOne({ _id: new ObjectId(id) })
    return id
}

export async function deleteGameLogico(id) {
    const juego = getGameById(id)
    await db.collection("juegos").updateOne(
        { _id: new ObjectId(id) }, { $set: { eliminado: true } }//https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
    )
    return juego
}