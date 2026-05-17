import Fastify from "fastify"
import path from "node:path"
import apiRoutes from "./routes/api_routes.js"

const port = process.env.PORT || 5173
const host = process.env.HOST || "0.0.0.0"

const fastify = Fastify({logger: true})

fastify.register(apiRoutes, { prefix: "/api" })

const start = async () =>{
    try {
      console.log(`Server is running at http://${host}:${port}`)
      fastify.listen({port, host})
    } catch(err){
        fastify.log.error(err)
        process.exit(1)
    }
}

start()