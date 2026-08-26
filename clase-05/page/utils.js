export function createPage(title, content) {
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
    html += `<title>${title}</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
 </head><body>`
    html += "<div class='container' >"
    html += `<h1>${title}</h1>`
    html += content
    html += "</div></body></html>"
    return html
}

export function createListPage(lista) {
    let html = ""
    html += `
    <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Developer</th>
            <th scope="col">genres</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
  `
    lista.forEach(juego => html += `    
    <tr>
      <th scope="row">${juego.appid}</th>
      <td>${juego.name}</td>
      <td>${juego.developer}</td>
      <td>${juego.genres}</td>
      <td>
        <a href="/juegos/${juego.appid}" >Ver</a>
      </td>
    </tr>` )
    html += "</tbody></table>"
    return html
}

export function createDetailPage(juego){
    let html = ""
    html += `<p>Developer: ${juego.developer}</p>`
    html += `<p>Publisher: ${juego.publisher}</p>`
    html += `<p>Platforms: ${juego.platforms}</p>`
    html += `<p>Categories: ${juego.categories}</p>`
    html += `<p>Genres: ${juego.genres}</p>`
    html += `<p>Price: ${juego.price}</p>`
    html += "<a href='/juegos' >Volver</a>"
    return html
}

// module.exports = {createPage, createListPage}
export default { createPage, createListPage }