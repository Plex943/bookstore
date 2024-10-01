const CartItem = require("../../../models/CartItem")
const Cart = require("../../../models/Cart")
const User = require("../../../models/User")
const Books = require("../../../models/Books")
const Helpers = require("../../../utils/helpers")

// configurando as relações das tabelas

Books.hasMany(CartItem)
User.hasMany(Cart)
// continuar codigo aqui

const helpers = new Helpers
module.exports = class CartServices {
    async AddToCArt(BookId, req, res) {
        try {
            const token = helpers.getUserToken(req)
            const user = helpers.getUserByToken(token, res)
            if (!user) {
                return "notUser"
            }

            let cart = await Cart.findOne({where: {UserId: user.id}})

            if (!cart) {
                await Cart.create({UserId: user.id})
            }

            const book = await Books.findOne({where: {id: BookId}})
            if (!book) {
                return "notBook"
            }


        } catch(err) {
            res.status(500).json({message: "Erro ao adicionar Livro no carrinho: ", err})
        }
    }
}