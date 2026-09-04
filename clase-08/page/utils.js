export function createPage(title, content) {
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
    html += `<title>${title}</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
 </head><body>`
    html += "<div class='container-fluid' >"
    html += `<h1>${title}</h1>`
    html += content
    html += "</div></body></html>"
    return html
}

export function createListPage(lista) {
    let html = ""
    html += `
    <a href="/juegos/nuevo" class="btn btn-primary my-3" >Nuevo Juego</a>
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
      <th scope="row">${juego._id}</th>
      <td>${juego.name}</td>
      <td>${juego.developer}</td>
      <td>${juego.genres}</td>
      <td class="d-flex" >
        <a class="btn btn-secondary mx-1" href="/juegos/${juego._id}" >Ver</a>
        <a class="btn btn-warning mx-1" href="/juegos/editar/${juego._id}" >Editar</a>
        <a class="btn btn-danger mx-2" href="/juegos/borrar/${juego._id}" >Borrar</a>
      </td>
    </tr>` )
    html += "</tbody></table>"
    return html
}

export function createDetailPage(juego) {
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

export function createGameFormPage() {
    let html = ""
    html += "<form action='/juegos/nuevo' method='POST' >"
    html += `
        <div class="my-2" >
            <label class="form-label" >Nombre: </label>
            <input class="form-control" name="name" />
        </div>
        <div class="my-2" >
            <label class="form-label" >Desarrollar: </label>
            <input class="form-control" name="developer" />
        </div>
        <div class="my-2" >
            <label class="form-label" >Publicado: </label>
            <input class="form-control" name="publisher" />
        </div>
        <div class="my-2" >
            <label class="form-label" >Plataforma: </label>
            <input class="form-control" name="platforms" />
        </div>
        <div class="my-2" >
            <label class="form-label" >Categoria: </label>
            <input class="form-control" name="categories" />
        </div>
        <div class="my-2" >
            <label class="form-label" >Genero: </label>
            <input class="form-control" name="genres" />
        </div>
        <div class="my-2" >
            <label class="form-label" >Precio: </label>
            <input class="form-control" name="price" />
        </div>   
        <button type="submit" class="btn btn-primary" >Guardar</button>                                             
    `
    html += "</form>"
    html += "<a href='/juegos' >Volver</a>"
    return html
}

export function createGameFormEditPage(juego) {
    let html = ""
    html += `<form action='/juegos/editar/${juego._id}' method='POST' >`
    html += `
        <div class="my-2" >
            <label class="form-label" >Nombre: </label>
            <input class="form-control" name="name" value="${juego.name}" />
        </div>
        <div class="my-2" >
            <label class="form-label" >Desarrollar: </label>
            <input class="form-control" name="developer" value="${juego.developer}" />
        </div>
        <div class="my-2" >
            <label class="form-label" >Publicado: </label>
            <input class="form-control" name="publisher" value="${juego.publisher}"/>
        </div>
        <div class="my-2" >
            <label class="form-label" >Plataforma: </label>
            <input class="form-control" name="platforms" value="${juego.platforms}" />
        </div>
        <div class="my-2" >
            <label class="form-label" >Categoria: </label>
            <input class="form-control" name="categories" value="${juego.categories}" />
        </div>
        <div class="my-2" >
            <label class="form-label" >Genero: </label>
            <input class="form-control" name="genres" value="${juego.genres}" />
        </div>
        <div class="my-2" >
            <label class="form-label" >Precio: </label>
            <input class="form-control" name="price" value="${juego.price}"/>
        </div>   
        <button type="submit" class="btn btn-primary" >Guardar</button>                                             
    `
    html += "</form>"
    html += "<a href='/juegos' >Volver</a>"
    return html
}

export function createDetailDelete(juego) {
    let html = `<form action='/juegos/borrar/${juego._id}' method="POST" >`
    html += `<p>Developer: ${juego.developer}</p>`
    html += `<p>Publisher: ${juego.publisher}</p>`
    html += `<p>Platforms: ${juego.platforms}</p>`
    html += `<p>Categories: ${juego.categories}</p>`
    html += `<p>Genres: ${juego.genres}</p>`
    html += `<p>Price: ${juego.price}</p>`
    html += `<button type="submit" class="btn btn-danger" >Borrar</button>`
    html += "</form>"
    html += "<a href='/juegos' >Volver</a>"
    return html
}

export default { createPage, createListPage }