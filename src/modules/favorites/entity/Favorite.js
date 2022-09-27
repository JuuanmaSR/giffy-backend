module.exports = class Favorite {
    /**
     * 
     * @param {Number} id Number
     * @param {String} gifId String
     * @param {Number} userId Number
     */
    constructor({ id, gifId, userId }) {
        this.id = id
        this.gifId = gifId
        this.userId = userId
    }


}