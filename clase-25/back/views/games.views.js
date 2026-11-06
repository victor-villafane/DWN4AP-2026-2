import { createDetailDelete, createDetailPage, createGameFormEditPage, createGameFormPage, createListPage, createPage } from "../page/utils.js"

export function gameList(juegos) {
    return createPage("juegos", createListPage(juegos))
}

export function game(juego) {
    return createPage(juego.name, createDetailPage(juego))
}

export function page404() {
    return createPage("404", "pagina no encontrada")
}

export function newGameForm() {
    return createPage("Nuevo juego", createGameFormPage())
}

export function editGameForm(juego) {
    return createPage("Editar juego", createGameFormEditPage(juego))
}

export function createDetailDeletePage(juego) {
    return createPage("Desea borrar: " + juego.name, createDetailDelete(juego))
}