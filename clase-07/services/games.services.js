import { readFile, writeFile } from "fs/promises"

export async function getGames() {
    return JSON.parse(await readFile("./data/steam.json", "utf-8"))
}

export async function getGameById(id) {
    const juegos = await getGames()
    return juegos.find((juego) => juego.appid == id)
}

export async function saveGame(juego) {
    const juegos = await getGames()
    juego.appid = juegos.length + 1
    juegos.push(juego)
    await writeFile("./data/steam.json", JSON.stringify(juegos), "utf8")
    return juego
}

export async function editGame(id, juego) {
    const juegos = await getGames()
    let valido = false
    const juegosNuevos = juegos.map(j => {
        if (j.appid == id) {
            valido = true
            juego.appid = id
            return juego
        } else {
            return j
        }
    })
    if (!valido) throw new Error("No se pudo editar")
    await writeFile("./data/steam.json", JSON.stringify(juegosNuevos), "utf8")
    return juego
}

export async function deleteGameFisico(id) {
    const juegos = await getGames()
    let valido = false
    let juego = {}
    const juegosNuevos = juegos.filter(j => {
        if (j.appid == id) {
            juego = j
            valido = true
            return false
        } else {
            return true
        }
    })
    if (!valido) throw new Error("No se pudo borrar")
    await writeFile("./data/steam.json", JSON.stringify(juegosNuevos), "utf8")
    return juego
}

export async function deleteGameLogico(id) {
    const juegos = await getGames()
    let valido = false
    let juego = {}
    const juegosNuevos = juegos.map(j => {
        if (j.appid == id) {
            valido = true
            juego = j
            j.eliminado = true
            return j
        } else {
            return j
        }
    })
    if (!valido) throw new Error("No se pudo Borrar")
    await writeFile("./data/steam.json", JSON.stringify(juegosNuevos), "utf8")
    return juego
}