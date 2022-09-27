const usernameValidation = async ({username, service}) => {
    const usernameExist = await service.findUser({username: username})
    
    return usernameExist ? true : false
}



module.exports = {
    usernameValidation
}