import Fastify from "fastify"
import path from "node:path"
import fastify_static from "@fastify/static"
import apiRoutes from "./routes/api_routes.js"

const port = process.env.PORT || 5173
const host = process.env.HOST || "0.0.0.0"

const fastify = Fastify({logger: true})

fastify.register(fastify_static, {
    root: path.join(import.meta.dirname, "../dist") //Default to "serve: true"
})

fastify.register(apiRoutes, { prefix: "/api" })

fastify.get('/*', (req, reply) => {
    reply.sendFile("index.html")
})

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