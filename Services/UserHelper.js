const User = require("../Models/User")

exports.addUser = (email, password) => {
    return User.create({
        email,
        password
    })
}

exports.foundUserByEmail = async(email) => {
    return User.findOne({
        email
    })
}