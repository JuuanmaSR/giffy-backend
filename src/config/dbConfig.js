const { databasePath, MYSQLDATABASE, MYSQLPASSWORD, MYSQLPORT, MYSQLUSER, MYSQLHOST } = require('./envConfig')
module.exports = {
    development: {
        storage: databasePath,
        dialect: 'sqlite'
    },
    production: {
        database: MYSQLDATABASE,
        username: MYSQLUSER,
        password: MYSQLPASSWORD,
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql'
    }
}