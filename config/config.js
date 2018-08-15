// config/config.js

require('dotenv').config()

const dbDetails = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false
}

module.exports = {
    development: dbDetails,
    production: dbDetails,
    port: 8082
}