const Cartitem = require("../../../models/Cartitem")
const Cart = require("../../../models/Cart")
const User = require("../../../models/User")
const Books = require("../../../models/Books")
const Helpers = require("../../../utils/helpers")

// configurando as relações das tabelas

Books.hasMany(Cartitem)
User.hasMany(Cart)
Cart.hasMany(Cartitem)

Cartitem.belongsTo(Books)
Cartitem.belongsTo(Cart)
Cart.belongsTo(User)

const helpers = new Helpers
module.exports = class CartServices {
    async AddToCArt(BookId, req, res) {
        try {
            const token = await helpers.getUserToken(req)
            const user = await helpers.getUserByToken(token, res)
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

            let cartitem = await Cartitem.findOne({where: {CartId: cart.id, BookId: book.id}})
            if (!cartitem) {
                await Cartitem.create({
                    CartId: cart.id,
                    BookId: book.id,
                    quantyidade: 1
                })
                return "sucessful"
            } else {
                return "itemAlready"
            }

        } catch(err) {
            res.status(500).json({message: "Erro ao adicionar Livro no carrinho: ", err})
        }
    }

    async ShowBooksOnCart(req, res) {
        const token = await helpers.getUserToken(req)
        const userData = await helpers.getUserByToken(token, res)

        try {
            const user = await User.findByPk(userData.id, {
                include: {
                    model: Cart,
                    include: {
                        model: Cartitem,
                        include: {
                            model: Books,
                            attributes: ["id", "title", "autor", "year", "img", "descripition"]
                        }
                    }
                } 
            })
            // volte a analisarb o codigo a partir daqui
            return user.Carts.map(Cart => {
                return Cart.Cartitems.map((item) => {
                    console.log(item)
                })
            })


        } catch (err) {
            return err
        }
        
    }
}