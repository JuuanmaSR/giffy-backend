const { secretToken } = require('../../../config/envConfig')
const { fromDataToEntityUser } = require('../mapper/userMapper')
const { registerSchema } = require('./validations/registerSchema')
const { loginSchema } = require('./validations/loginSchema')
const { encryptPassword, comparePassword } = require('./encrypting/passwordEncrypting')
const { usernameValidation } = require('./validations/usernameValidation')

const jsonwebtoken = require('jsonwebtoken')

module.exports = class UserController {

    /**
     * @param {import('../service/userService')} UserService
     */
    constructor(UserService) {
        this.userService = UserService
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async saveUser(req, res, next) {
        const { body } = req
        const { username, password } = body
        if (!(username && password)) {
            return next({ error: "Data not formatted properly" })
        }
        // Schema check
        const { error } = registerSchema.validate({ username, password })
        if (error) {
            return next({ error: error.details[0].message })
        }

        // Email check
        const usernameExist = await usernameValidation({ username: username.toLowerCase(), service: this.userService })
        if (usernameExist) {
            return next({ error: 'Username already exist' })
        }
        // If all check pass
        try {
            const { hashPassword } = await encryptPassword(password)
            const user = fromDataToEntityUser({ username: username.toLowerCase(), password: hashPassword })
            if (!(user)) {
                throw new Error('On userController(saveUser) the user is undefined')
            }
            const savedUser = await this.userService.saveUser(user)
            if (!(savedUser)) {
                throw new Error('On userController(saveUser) the user not was saved correctly')
            }
            res.json({ savedUser })

        } catch (error) {
            next(error)
        }
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     * @param {import('express').NextFunction} next 
     */
    async loginUser(req, res, next) {
        const { body } = req
        const { username, password } = body
        if (!(username && password)) {
            return next({ error: 'Data no formatted properly' })
        }
        // Schema check
        const { error } = loginSchema.validate({ username, password })
        if (error) {
            return next({ error: error.details[0].message })
        }

        try {
            const user = await this.userService.findUser({ username: username.toLowerCase() })
            const passwordCorrect = user === null ? false : await comparePassword({ password: password, savedPassword: user.password })

            if (!(user && passwordCorrect)) {
                return next({ error: 'Username or password is invalid' })
            }

            const userForJwt = {
                id: user.id,
                username: user.username
            }
            const jwt = jsonwebtoken.sign(userForJwt, secretToken, { expiresIn: '1d' })
            res.json({ jwt })
        } catch (error) {
            next(error)
        }

    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     * @param {import('express').NextFunction} next 
     */
    async clearUsers(req, res, next) {
        try {
            await this.userService.clearUsers()
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }
}