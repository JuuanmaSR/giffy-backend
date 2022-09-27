const express = require('express')
const router = express.Router()
const container = require('../src/config/dic')()

//User module controller
/**
 * @type {import('../src/modules/users/controller/userController')} UserController
 */
const UserController = container.get('UserController')

router.post('/register', UserController.saveUser.bind(UserController))
router.post('/login', UserController.loginUser.bind(UserController))

module.exports = router