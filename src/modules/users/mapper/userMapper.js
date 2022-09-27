const User = require('../entity/User')


const fromDataToEntityUser = ({ id, username, password }) => {
    return new User({
        id,
        username,
        password
    })
}

const fromModelToEntityUser = ({ id, username, password, createdAt }) => {
    return new User({
        id,
        username,
        password,
        createdAt
    })
}


module.exports = {
    fromDataToEntityUser,
    fromModelToEntityUser
}