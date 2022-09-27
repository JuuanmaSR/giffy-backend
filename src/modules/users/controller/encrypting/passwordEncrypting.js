const bcrypt = require('bcrypt')

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    return { hashPassword }
}

const comparePassword = async ({password, savedPassword}) => {
    return await bcrypt.compare(password, savedPassword)
}



module.exports = { encryptPassword, comparePassword }