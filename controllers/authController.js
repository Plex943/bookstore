const User = require("../models/User")
const bcrypt = require("bcryptjs")

module.exports = class authController {
    static async login(req, res) {
        res.render("auth/login")
    }
    static async register(req, res) {
        res.render("auth/register")
    }
    static async registerPost(req, res) {
        const {name,email, password, confirmpassword} = req.body

        if (password != confirmpassword) {
            req.flash("message", "As senha não conferem")
            res.render("auth/register")
            return
        }

        const alreadyExist = await User.findOne({where: { email : email }})
        if (alreadyExist) {
            req.flash("message", "O usuario ja existe!")
            res.render("auth/register")

            return
        }
        
        const Salt = bcrypt.genSaltSync(10)
        const hash = await bcrypt.hash(password, Salt)



        try {
            const CreatedUser = await User.create({name, email, password:hash})
            req.session.userid = CreatedUser.id
            req.flash("message", "Usuario criado com sucesso!")

            req.session.save(() => {
                res.redirect("/books")
            })
        } catch (err) {
            console.log("ocorreu um erro ao criar o Usuario: ", err)
        }
    }
    static async loginPost(req, res) {
        const {email, password} = req.body

        const user = await User.findOne({where: {email:email}})

        if (!user) {
            req.flash("message", "O usuarioa não existe")
            res.render("auth/login")

            return
        }

        const matchPassword = bcrypt.compareSync(password, user.password)
        if (!matchPassword){
            req.flash("message", "senah incorreta!")
            res.render("auth/login")
            return
        }

        try {
            req.session.userid = user.id
            req.flash("message", "Conectou ao usuario!")

            req.session.save(() => {
                res.redirect("/books")
            })
        } catch(err) {
            console.log("erro ao logar o usuario: ", err)
        }
    }
    static async logout(req, res) {
        req.session.destroy()
        res.redirect("/books")
    }
}