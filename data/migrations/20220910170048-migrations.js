'use strict';
const container = require('../../src/config/dic')()

/**
 * @type {typeof import('../../src/modules/users/module').UserModel} UserModel
 */
const UserModel = container.get('UserModel')

/**
 * @type {typeof import('../../src/modules/favorites/module').FavoriteModel} FavoriteModel
 */
const FavoriteModel = container.get('FavoriteModel')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await UserModel.setup(queryInterface.sequelize).sync({ force: true })
    await FavoriteModel.setup(queryInterface.sequelize).setupAssociations(UserModel).sync({force: true})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('favorites')
  },

};
