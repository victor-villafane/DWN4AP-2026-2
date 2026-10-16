# 1. La url no hace referencia a la accion sino al recurso

    /juegos/nuevo ----> X       -> POST
    /juego/editar ----> X       -> PUT/PATCH

    /juegos POST        -> 🆗 
    /juegos PUT/PATCH   -> 🆗

    url -> Localizador de Recursos Uniforme
    uri -> Identificador Uniforme de Recursos

# 2. Utilizamos Verbos HTTP para identificar la accion

    GET     -> Obtener
    POST    -> Crear
    PUT     -> Reemplazar
    PATCH   -> Actualizar
    DELETE  -> Borrar

    QUERY -> No esta del todo implementado

# 3. Utilizamos JSON como formato para intercambio de datos
# 4. Estados para las respuestas

    1xx: Informativos
    2xx: OK
    3xx: Redireccion
    4xx: Errores del cliente
    5xx: Errores del servidor

npm install omit=dev

pnpm --prod install