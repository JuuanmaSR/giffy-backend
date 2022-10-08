const { userExtractor } = require('./userExtractor/userExtractor')
const { fromDataToEntityFavorite } = require('../mapper/favoriteMapper')

module.exports = class FavoriteController {

    /**
     * 
     * @param {import('../service/favoriteService')} FavoriteService 
     */
    constructor(FavoriteService) {
        this.favoriteService = FavoriteService
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     * @param {import('express').NextFunction} next 
     */
    async addFav(req, res, next) {
        const { body } = req
        const { id: gifId, jwt } = body
        if (!(gifId && jwt)) {
            return next({ error: 'Data from body is undefined' })
        }
        const decodeToken = userExtractor(jwt)
        const { id: userId } = decodeToken


        try {

            const favorite = fromDataToEntityFavorite({ gifId, userId })

            if (!(favorite)) {
                throw new Error('On favoriteController(addFav) the favorite gif is undefined')
            }

            await this.favoriteService.addFav(favorite)
            const favorites = await this.favoriteService.getFavs(userId)
            res.json({ favorites })
        } catch (error) {
            next(error)
        }

    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     * @param {import('express'.NextFunction)} next 
     */
    async getFavs(req, res, next) {
        const { headers } = req
        const { authentication: jwt } = headers
        if (!(jwt)) {
            return next({ error: 'Data from body is undefined' })
        }
        const decodeToken = userExtractor(jwt)
        const { id: userId } = decodeToken
        if (!(userId)) {
            return next({ error: 'User id is undefined' })
        }

        try {
            const favorites = await this.favoriteService.getFavs(Number(userId))
            if (favorites.length === 0) {
                return next({ error: `Favorites not found or hasn't favorites saved`})
            }
            res.json({ favorites })
        } catch (error) {
            next(error)
        }

    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     * @param {import('express'.NextFunction)} next 
    */
    async deleteFav(req, res, next) {
        const { headers, body } = req
        const { id: gifId } = body
        const { authentication: jwt } = headers

        if (!(gifId && jwt)) {
            return next({ error: 'Data from body is undefined' })
        }

        const decodeToken = userExtractor(jwt)
        const { id: userId } = decodeToken
        if (!(userId)) {
            return next({ error: 'User id is undefined' })
        }

        try {
            const isDeleted = await this.favoriteService.deleteFav({ gifId, userId })
            const favorites = await this.favoriteService.getFavs(Number(userId))
            isDeleted ? res.json({ favorites }) :
                next({ error: `The favorite doesn't exist or has already been deleted` })

        } catch (error) {
            next(error)
        }
    }

}