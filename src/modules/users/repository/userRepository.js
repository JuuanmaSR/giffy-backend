const User = require('../entity/User')
const { fromModelToEntityUser } = require('../mapper/userMapper')

module.exports = class UserRepository {
    /**
     * 
     * @param {typeof import('../model/userModel')} UserModel 
     */
    constructor(UserModel) {
        this.userModel = UserModel
    }

    async save(user) {
        if (!(user instanceof User)) {
            throw new Error('On userRepository the user is not instance of class User or is undefined')
        }
        let userModel
        const buildOptions = { isNewRecord: !user.id }
        userModel = this.userModel.build(user, buildOptions)
        userModel = await userModel.save()
        if (!(userModel)) {
            throw new Error('On userRepository(save) the user is undefined')
        }
        return fromModelToEntityUser(userModel)
    }

    async find(params) {
        const userModel = await this.userModel.findOne({ where: params })
        if (!(userModel)) {
            return userModel
        }
        return fromModelToEntityUser(userModel)
    }

    async clear(){
         await this.userModel.destroy({where: {}, truncate: true})
    }
}