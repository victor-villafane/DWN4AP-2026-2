import express from "express"
import gamesRoutes from "./routes/games.routes.js"
import gameApiRoutes from "./api/routes/games.routes.js"
import userApiRoutes from "./api/routes/user.routes.js"
import cors from "cors"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import { getGames } from "./services/games.services.js"
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
        description: "Obtiene la lista de juegos"
    },
        async (filtros) => {
            try {
                const juegos = await getGames()
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