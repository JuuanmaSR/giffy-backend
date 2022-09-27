module.exports = class User {
    /**
     * @param {Number} id Number
     * @param {String} username String
     * @param {String} password String
     */
    constructor({
        id,
        username,
        password,
        createdAt
    }){
        this.id = id
        this.username = username
        this.password = password
        this.createdAt = createdAt
    }
  
}