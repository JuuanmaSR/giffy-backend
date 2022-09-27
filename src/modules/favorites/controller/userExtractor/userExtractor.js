const { secretToken } = require('../../../../config/envConfig')
const jsonwebtoken = require('jsonwebtoken')

const userExtractor = (jwt) => {
    try {
        const decodeToken = jsonwebtoken.verify(jwt, secretToken)
        return decodeToken    
    } catch (error) {
        return error
    }
    
}

module.exports = {
    userExtractor
}