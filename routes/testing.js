const express = require('express')
const router = express.Router()
const container = require('../src/config/dic')()
/**
 * @type {import('../src/modules/users/controller/userController')} UserController
 */
 const UserController = container.get('UserController')

router.post('/testing/reset', UserController.clearUsers.bind(UserController))

module.exports = router