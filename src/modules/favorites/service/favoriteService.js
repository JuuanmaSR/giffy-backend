module.exports = class FavoriteService {
    /**
     * 
     * @param { import('../repository/favoriteRepository')} FavoriteRepository 
     */
    constructor(FavoriteRepository) {
        this.favoriteRepository = FavoriteRepository
    }


    async addFav(favorite) {
        return await this.favoriteRepository.save(favorite)
    }

    async getFavs(id) {
        if (!(id)) {
            throw new Error('On favoriteService(getFavs) the id is undefined')
        }
        return await this.favoriteRepository.findAllByUserId(id)
    }

    async deleteFav(favorite) {
        return await this.favoriteRepository.delete(favorite)
    }

}