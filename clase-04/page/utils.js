export function createPage(title, content) {
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
    html += `<title>${title}</title></head><body>`
    html += `<h1>${title}</h1>`
    html += content
    html += "</body></html>"
    return html
}

export function createListPage(lista) {
    let html = ""
    html += "<ul>"
    lista.forEach(personaje => html +=
        "<li>Nombre: " + personaje.name + " Nota: " + personaje.actor + "</li>"
    )
    html += "</ul>"
    return html
}

// module.exports = {createPage, createListPage}
export default { createPage, createListPage }