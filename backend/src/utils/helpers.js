const jwt = require("jsonwebtoken")
const User = require("../models/User")

class Helpers {

    async createtoken(user, req, res) {
        const token = await jwt.sign({
            name: user.name,
            id: user.id
        }, "secret")

        return res.status(201).json({message: "Usuario criado!", token: token, userId: user.id, admin: user.admin})
    }

    
    async getUserToken(req) {
        const authToken = req.headers.authorization

        if (!authToken || !authToken.startsWith("Bearer ")) {
            throw new Error("Token malformado ou não fornecido")
        }
        const token = authToken.split(" ")[1]

        return token
    }
    
    async getUserByToken(token, res) {
        if (!token) {
            return res.status(401).json({message: "token inexistente"})
        }

        const decoded = jwt.verify(token, "secret")
        const userid = decoded.id
        const user = await User.findOne({where: {id: userid}})
        return user
    }

    verifyAdmToken = async (req, res, next) => {
        if (!req.headers.authorization) {
            res.status(401).json({message: "token inexistente no header"})
            return
        }

        try {
            const token = await this.getUserToken(req)
            if (!token) {
                res.status(401).json({message: "token inexistente"})
                return
            }

            const user = await this.getUserByToken(token , res)
            if(!user) {
                res.status(404).json({message: "usuario não encontrado ou não existe!"})
                return
            }

            if (!user.admin) {
                res.status(403).josn({message: "vocÊ não tem acesso a este recurso!"})
                return
            }

            const verified = jwt.verify(token, "secret")
            req.user = verified
            next()
        } catch(err) {
            res.status(400).json({message: "ocorreu um erro:", err})
        }
        
    }
    
    verifytoken = async (req, res, next) => {
        if (!req.headers.authorization) {
        res.status(401).json({message: "token inexistente no header!"})
        return
        }
        
        try{
            const token = await this.getUserToken(req)
            if (!token) {
                res.status(401).json({message: "token inexistente!"})
                return
            }
                
            const verified = jwt.verify(token, "secret")
            req.user = verified
            next()
        } catch(err) {
                    res.status(400).json({message: `token invalido!`, err})       
                }
    }
}

module.exports = Helpers


