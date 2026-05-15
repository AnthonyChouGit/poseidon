import { fetchAllApps } from '../../services/app_services.js'

/**
 * Schema for the response of fetching all apps
 */
const all_apps_res_schema = {
    200: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                appid: { type: 'string' },
                title: { type: 'string' },
                summary: { type: 'string' },
                url: { type: 'string' },
                about_url: { type: 'string' },
                tags: { type: 'array', items: { type: 'string' } },
                create_at: { type: 'string', format: 'date-time' }
            },
            required: ['appid', 'title', 'summary', 'url', 'about_url', 'tags', 'create_at']
        }
    },
    500: {
        type: 'object',
        properties: {
            code: { type: 'integer' },
            message: { type: 'string' }
        },
        required: ['code', 'message']
    },
    404: {
        type: 'object',
        properties: {
            code: { type: 'integer' },
            message: { type: 'string' }
        },
        required: ['code', 'message']
    }
}

const appRoutes = async (fastify, options) => {
    fastify.get('/apps', {schema: {response: all_apps_res_schema}}, async (req, reply) => {
        const result = await fetchAllApps(fastify.pg)
        if (!result.success) {
            if (result.code === 1)
                return reply.status(404).send({ code: result.code, message: result.message })
            return reply.status(500).send({ code: result.code, message: result.message })
        }
        return reply.status(200).send(result.data)
    })
}

export default appRoutes