
const brcypt = require("bcryptjs")

module.exports = class UserController{

    static async home(req, res) {
        res.status(200).json({message: "Você está na home parabens!"})
        return
    }

}