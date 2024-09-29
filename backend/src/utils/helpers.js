const jwt = require("jsonwebtoken")

module.exports = class Helpers {
    async createtoken(user, req, res) {
        const token = await jwt.sign({
            name: user.name,
            id: user.id
        }, "secret")

        return res.status(201).json({message: "Usuario criado!", token: token, userId: user.id})
    }

}

