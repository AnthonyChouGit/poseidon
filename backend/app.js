import Fastify from "fastify"
import path from "path"
import fastify_static from "@fastify/static"

const port = process.env.PORT || 5173
const host = process.env.HOST || "localhost"

const fastify = Fastify({logger: true})

fastify.register(fastify_static, {
    root: path.join(import.meta.dirname, "../dist")
})

fastify.get('/', (req, reply) => {
    reply.sendFile("index.html")
})

const start = async () =>{
    try {
        fastify.listen({port, host})
    } catch(err){
        fastify.log.error(err)
        process.exit(1)
    }
}

start()