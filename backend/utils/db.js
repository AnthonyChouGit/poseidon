const postgres = require('pg-promise')();
const db_host = process.env.DB_HOST || '172.17.0.1';
const db_port = process.env.DB_PORT || 5432;
const db_database = process.env.DB_DATABASE || 'public_db';
const db_user = process.env.DB_USER || 'public_db_root';
const db_password = process.env.DB_PASSWORD || '970928';
const { QueryResultError, queryResultErrorCode } = postgres.errors;
const db=postgres({
    host: db_host,
    port: db_port,
    database: db_database,
    user: db_user,
    password: db_password
})

module.exports = { db, QueryResultError, queryResultErrorCode };