module.exports = class UserService {
    /**
     * 
     * @param {import('../repository/userRepository')} UserRepository 
     */
    constructor(UserRepository) {
        this.userRepository = UserRepository
    }


    async saveUser(user) {
        if(!(user)){
            throw new Error('On userService(saveuser) the user is undefined')
        }
        return await this.userRepository.save(user)
    }

    async findUser(params){
        if (!(params)) {
            throw new Error('No params passed')
        }
        return await this.userRepository.find(params)
    }

    async clearUsers() {
        return await this.userRepository.clear()
    }
}