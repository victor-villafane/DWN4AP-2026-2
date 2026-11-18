import express from "express"
import gamesRoutes from "./routes/games.routes.js"
import gameApiRoutes from "./api/routes/games.routes.js"
import userApiRoutes from "./api/routes/user.routes.js"
import cors from "cors"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import { getGames, getGameById, saveGame, editGame, updateGame, deleteGameLogico, saveGameReview } from "./services/games.services.js"
import { z } from "zod"
const app = express()

app.use(cors())

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(gamesRoutes)
app.use(gameApiRoutes)
app.use(userApiRoutes)

app.post("/mcp", async (req, res) => {    // Este endpoint es para que el modelo conozca nuestras herramientas y pueda interactuar con ellas
    // Aquí se define el servidor MCP y se registran las herramientas que queremos exponer al modelo
    const server = new McpServer({
        name: "mcp-juegos",
        description: "Servidor de juegos",
        version: "1.0.0",
    })
    // Aquí se registran las herramientas que queremos exponer al modelo
    server.registerTool(
        "obtener_juegos", {
        description: "Obtiene la lista de juegos, con filtros opcionales y paginación",
        inputSchema: {
            page: z.number().int().min(1).optional().describe("Número de página (por defecto 1)"),
            limit: z.number().int().min(1).optional().describe("Juegos por página (por defecto 10)"),
            name: z.string().optional().describe("Busca juegos por nombre"),
            developer: z.string().optional().describe("Filtra por desarrollador exacto"),
            price_min: z.number().min(0).optional().describe("Precio mínimo (mayor que)"),
            price_max: z.number().min(0).optional().describe("Precio máximo (menor que)")
        }
    },
        async (filtros) => {
            try {
                const juegos = await getGames(filtros)
                return {
                    content: [{
                        type: "text",
                        text: JSON.stringify(juegos)
                    }]
                }
            } catch (error) {
                return {
                    isError: true,
                    content: [
                        {
                            type: "text",
                            text: "Error al obtener los juegos"
                        }
                    ]
                }
            }
        }
    )
    // Helper para responder con texto JSON o con error, igual que obtener_juegos
    const responder = (dato) => ({
        content: [{ type: "text", text: JSON.stringify(dato) }]
    })
    const errorRespuesta = (mensaje) => ({
        isError: true,
        content: [{ type: "text", text: mensaje }]
    })

    server.registerTool(
        "obtener_juego_por_id", {
        description: "Obtiene un juego por su _id",
        inputSchema: {
            juego_id: z.string().length(24).describe("_id del juego (24 caracteres hexadecimales)")
        }
    },
        async ({ juego_id }) => {
            try {
                const juego = await getGameById(juego_id)
                if (!juego) return errorRespuesta("Juego no encontrado")
                return responder(juego)
            } catch (error) {
                return errorRespuesta("Error al obtener el juego")
            }
        }
    )

    server.registerTool(
        "crear_juego", {
        description: "Crea un juego nuevo",
        inputSchema: {
            name: z.string().min(3).describe("Nombre del juego (mínimo 3 caracteres)"),
            developer: z.string().min(3).describe("Desarrollador (mínimo 3 caracteres)"),
            publisher: z.string().min(3).describe("Distribuidor (mínimo 3 caracteres)"),
            platforms: z.string().min(3).describe("Plataformas (mínimo 3 caracteres)"),
            categories: z.string().min(3).describe("Categorías (mínimo 3 caracteres)"),
            genres: z.string().min(3).describe("Géneros (mínimo 3 caracteres)"),
            price: z.number().positive().describe("Precio (mayor que 0)")
        }
    },
        async (juego) => {
            try {
                const nuevo = await saveGame(juego)
                return responder(nuevo)
            } catch (error) {
                return errorRespuesta("Error al crear el juego")
            }
        }
    )

    server.registerTool(
        "reemplazar_juego", {
        description: "Reemplaza por completo un juego existente (todos los campos son obligatorios)",
        inputSchema: {
            juego_id: z.string().length(24).describe("_id del juego a reemplazar"),
            name: z.string().min(3).describe("Nombre del juego (mínimo 3 caracteres)"),
            developer: z.string().min(3).describe("Desarrollador (mínimo 3 caracteres)"),
            publisher: z.string().min(3).describe("Distribuidor (mínimo 3 caracteres)"),
            platforms: z.string().min(3).describe("Plataformas (mínimo 3 caracteres)"),
            categories: z.string().min(3).describe("Categorías (mínimo 3 caracteres)"),
            genres: z.string().min(3).describe("Géneros (mínimo 3 caracteres)"),
            price: z.number().positive().describe("Precio (mayor que 0)")
        }
    },
        async ({ juego_id, ...datos }) => {
            try {
                const juego = await editGame(juego_id, datos)
                return responder(juego)
            } catch (error) {
                return errorRespuesta("Error al reemplazar el juego")
            }
        }
    )

    server.registerTool(
        "actualizar_juego", {
        description: "Actualiza parcialmente un juego existente (solo los campos que se envíen)",
        inputSchema: {
            juego_id: z.string().length(24).describe("_id del juego a actualizar"),
            name: z.string().min(3).optional().describe("Nombre del juego"),
            developer: z.string().min(3).optional().describe("Desarrollador"),
            publisher: z.string().min(3).optional().describe("Distribuidor"),
            platforms: z.string().min(3).optional().describe("Plataformas"),
            categories: z.string().min(3).optional().describe("Categorías"),
            genres: z.string().min(3).optional().describe("Géneros"),
            price: z.number().positive().optional().describe("Precio (mayor que 0)")
        }
    },
        async ({ juego_id, ...cambios }) => {
            try {
                const juego = await updateGame(juego_id, cambios)
                return responder(juego)
            } catch (error) {
                return errorRespuesta("Error al actualizar el juego")
            }
        }
    )

    server.registerTool(
        "eliminar_juego", {
        description: "Elimina un juego de forma lógica (no se borra de la base de datos)",
        inputSchema: {
            juego_id: z.string().length(24).describe("_id del juego a eliminar")
        }
    },
        async ({ juego_id }) => {
            try {
                await deleteGameLogico(juego_id)
                return responder({ _id: juego_id, eliminado: true })
            } catch (error) {
                return errorRespuesta("Error al eliminar el juego")
            }
        }
    )

    server.registerTool(
        "agregar_review", {
        description: "Agrega una review de un usuario a un juego",
        inputSchema: {
            juego_id: z.string().length(24).describe("_id del juego a reseñar"),
            usuario_id: z.string().length(24).describe("_id del usuario que escribe la review"),
            usuario_name: z.string().min(1).describe("Nombre del usuario"),
            comentario: z.string().min(1).describe("Texto de la review")
        }
    },
        async ({ juego_id, usuario_id, usuario_name, comentario }) => {
            try {
                const juego = await saveGameReview(juego_id, {
                    _id: usuario_id,
                    name: usuario_name,
                    comentario
                })
                return responder(juego)
            } catch (error) {
                return errorRespuesta("Error al agregar la review")
            }
        }
    )

    // Aqui se define el adaptador de transporte para que el servidor pueda comunicarse con el modelo a través de HTTP
    const transport = new StreamableHTTPServerTransport(
        { sessionIdGenerator: undefined }  // Esto es para que sea stateless
    )

    try {
        await server.connect(transport)                     // Esto es para que el servidor pueda recibir solicitudes del modelo
        await transport.handleRequest(req, res, req.body)   // Esto es para que el servidor pueda manejar la solicitud del modelo y enviar la respuesta
        res.on("close", () => {     // Esto es para cerrar la conexión cuando el cliente cierre la conexión
            transport.close()
            server.close()
        })
    } catch (error) {
        res.status(400).json({ error: "Error al procesar la solicitud" })
    }
})

app.get("/mcp", (req, res) => {
    res.status(400).json({ error: "Método no permitido" })
})

app.delete("/mcp", (req, res) => {
    res.status(400).json({ error: "Método no permitido" })
})
app.listen(2026, () => console.log("Funcionando...."))