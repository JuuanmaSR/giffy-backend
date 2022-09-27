const express = require('express')
const router = express.Router()

const container = require('../src/config/dic')()
// Favorite module controller
/**
 * @type {import('../src/modules/favorites/controller/favoriteController')} FavoriteController
 */
const FavoriteController = container.get('FavoriteController')


router.post('/favs', FavoriteController.addFav.bind(FavoriteController))
router.get('/favs', FavoriteController.getFavs.bind(FavoriteController))



module.exports = router