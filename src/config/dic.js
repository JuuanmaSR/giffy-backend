const { environment ,databasePath,MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, MYSQLHOST, MYSQLPORT } = require('./envConfig')
const { default: DIContainer, object, use, factory } = require('rsdi')

const { Sequelize } = require('sequelize')

const dbConnectionData = (environment) => {
    return( environment === 'production' ? {
        database: MYSQLDATABASE,
        username: MYSQLUSER,
        password: MYSQLPASSWORD,
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql'
    } : {
        storage: databasePath,
        dialect: 'sqlite'
    })
}

const {
    UserController,
    UserService,
    UserRepository,
    UserModel,
} = require('../modules/users/module')
const {
    FavoriteController,
    FavoriteService,
    FavoriteRepository,
    FavoriteModel,
} = require('../modules/favorites/module')
const { production } = require('./dbConfig')
// Sequelize configuration
function configureSequelizeMainDatabase() {
    const sequelize = new Sequelize(dbConnectionData(environment))
    return sequelize
}
// Common definitions
/**
 * 
 * @param {DIContainer} container 
 */
function addCommonDefinitions(container) {
    container.add({
        Sequelize: factory(configureSequelizeMainDatabase)
    })
}

//Model configuration
/**
 * 
 * @param {DIContainer} container 
 */
function configureUserModel(container) {
    UserModel.setup(container.get('Sequelize'))
    return UserModel
}
/**
 * 
 * @param {DIContainer} container 
 */
function configureFavoriteModel(container) {
    FavoriteModel.setup(container.get('Sequelize'))
    // FavoriteModel.setupAssociations(container.get('UserModel'))
    return FavoriteModel
}


// User module definitions
/**
 * 
 * @param {DIContainer} container 
 */
function addUserModulesDefinitions(container) {
    container.add({
        UserController: object(UserController).construct(use('UserService')),
        UserService: object(UserService).construct(use('UserRepository')),
        UserRepository: object(UserRepository).construct(use('UserModel')),
        UserModel: factory(configureUserModel)
    })
}
/**
 * 
 * @param {DIContainer} container 
 */
function addFavoriteModulesDefinitions(container) {
    container.add({
        FavoriteController: object(FavoriteController).construct(use('FavoriteService')),
        FavoriteService: object(FavoriteService).construct(use('FavoriteRepository')),
        FavoriteRepository: object(FavoriteRepository).construct(use('FavoriteModel')),
        FavoriteModel: factory(configureFavoriteModel)
    })
}

module.exports = function configureDI() {
    const container = new DIContainer()
    addCommonDefinitions(container)
    addUserModulesDefinitions(container)
    addFavoriteModulesDefinitions(container)
    return container
}