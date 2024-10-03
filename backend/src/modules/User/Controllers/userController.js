const UserServices = require("../services/userService")
const Helpers = require("../../../utils/helpers")
const brcypt = require("bcryptjs")

const helpers = new Helpers
const userService = new UserServices
module.exports = class UserController{

    static async register(req, res) {
        const {name, email,  password, confirmPassword, accounType} = req.body
        let admin = false

        if (accounType === "on") {
            admin = true
        } else {
            admin = false
        }

        if(!name) {
            res.status(422).json({message: "O nome é obrigatorio!"})
            return
        }

        if (!email) {
            res.status(422).json({message: "O Email é obrigatorio!"})
            return
        }
        
        if (!password) {
            res.status(422).json({message: "A senha é obrigatoria!"})
            return
        }

        if (!confirmPassword) {
            res.status(422).json({message: "A confirmação da senha é obrigatoria!"})
            return
        }

        if ( password !== confirmPassword) {
            res.status(422).json({message: "As senhas não conferem!"})
            return
        }

        const userData = {name, email, password, confirmPassword, admin}
        const userAlreadyexists = await userService.UserExists(userData)
        if (userAlreadyexists) {
            res.status(422).json({message: "O usuario já existe!"})
            return
        }

        try {
            const user = await userService.CreateUser(userData, req, res)
            await helpers.createtoken(user, req, res)
        } catch (err) {
            res.status(500).json({message: "Erro com o servidor!", err})
        }
    }

    static async login(req, res) {
        const {email, password} = req.body

        if(!email) {
            res.status(422).json({message: "O email é obrigatorio!"})
            return
        }
        if (!password) {
            res.status(422).json({message: "A senha é obrigatoria!"})
            return
        }
        const userAlreadyexists = await userService.UserExists({email, password})
        if (!userAlreadyexists) {
            res.status(422).json({message: "O usuario não existe!"})
            return
        }

        const user = await userService.GetUser({email, password})
        const passwordCorrect = brcypt.compareSync(password, user.password)
        if (!passwordCorrect) {
            res.status(422).json({message: "A senha está incorreta!"})
            return
        }

        await helpers.createtoken(user, req, res)
    }
}