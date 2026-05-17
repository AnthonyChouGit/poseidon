import postgres from '@fastify/postgres'
import appRoutes from './subroutes/app_routes.js'

const db_host = process.env.DB_HOST || 'db';
const db_port = process.env.DB_PORT || 5432;
const db_database = process.env.DB_DATABASE || 'db_dev';
const db_user = process.env.DB_USER || 'db_dev_root';
const db_password = process.env.DB_PASSWORD || '970928';

const apiRoutes = async (fastify, options) => {
    fastify.register(postgres, {
        connectionString: `postgresql://${db_user}:${db_password}@${db_host}:${db_port}/${db_database}`
    })
    fastify.register(appRoutes)
}

export default apiRoutes