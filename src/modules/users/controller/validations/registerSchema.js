const Joi = require('joi')

const registerSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .required()
})

module.exports = {
    registerSchema
}