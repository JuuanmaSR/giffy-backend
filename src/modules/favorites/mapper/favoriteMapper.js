const Favorite = require('../entity/Favorite')

const fromDataToEntityFavorite = ({ id, gifId, userId }) => {
    return new Favorite({
        id,
        gifId,
        userId
    })
}

const fromModelToEntityFavorite = ({ id, gifId, userId }) => {
    return new Favorite({
        id,
        gifId,
        userId
    })
}

module.exports = {
    fromDataToEntityFavorite,
    fromModelToEntityFavorite
}