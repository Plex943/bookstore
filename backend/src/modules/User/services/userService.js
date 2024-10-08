const User = require("../../../models/User")
const brcypt = require("bcryptjs")

module.exports = class UserServices {
    async CreateUser(data) {
        const {name, email, password, admin} = data
        const passwordhash = await brcypt.hash(password, 5)
        const user = await User.create({name, email, password: passwordhash, admin})
        return user.dataValues
    }

    async GetUser(data) {
        const {email, password} = data
        const user = await User.findOne({where: {email:email}})
        return user
    }

    async UserExists(data) {
        const user = await User.findOne({where: {email: data.email}})
        return user
    }
}