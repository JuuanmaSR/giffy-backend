require('dotenv').config()

const envConfig = {
    MYSQLDATABASE: process.env.MYSQLDATABASE,
    MYSQLHOST: process.env.MYSQLHOST,
    MYSQLPASSWORD: process.env.MYSQLPASSWORD,
    MYSQLPORT: process.env.MYSQLPORT,
    MYSQLUSER: process.env.MYSQLUSER,
    secretToken: process.env.SECRET_TOKEN,
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    databasePath: process.env.DB_PATH,
}


module.exports = envConfig