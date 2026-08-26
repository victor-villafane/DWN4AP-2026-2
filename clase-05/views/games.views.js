import { createDetailPage, createListPage, createPage } from "../page/utils.js"

export function gameList(juegos){
    return createPage("juegos", createListPage(juegos))
}

export function game(juego){
    return createPage(juego.name, createDetailPage(juego))
}

export function page404(){
    return createPage("404", "pagina no encontrada")
}