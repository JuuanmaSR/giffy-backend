const Favorite = require('../entity/Favorite');
const { fromModelToEntityFavorite } = require('../mapper/favoriteMapper')

module.exports = class FavoriteRepository {
    /**
     * 
     * @param {typeof import('../model/favoriteModel')} FavoriteModel 
     */
    constructor(FavoriteModel) {
        this.favoriteModel = FavoriteModel
    }


    async save(favorite) {
        if (!(favorite instanceof Favorite)) {
            throw new Error('On favoriteRepository(save) the favorite is undefined')
        }
        let favoriteModel;
        const buildOptions = { isNewRecord: !favorite.id }
        favoriteModel = this.favoriteModel.build(favorite, buildOptions)
        favoriteModel = await favoriteModel.save()

    }

    async findAllByUserId(id) {
        if (!(id)) {
            throw new Error('On favoriteRepository(findAllByUserId) the user id is undefined)')
        }
        const favoritesModels = await this.favoriteModel.findAll({ where: { userId: id } })

        if (!(favoritesModels)) {
            throw new Error("On favoriteRepository(findAllByUserId) can't find the model ")
        }
        return favoritesModels.map(fromModelToEntityFavorite)
    }

    delete(favorite) {

    }
}