const Cartitem = require("../../../models/Cartitem")
const Cart = require("../../../models/Cart")
const User = require("../../../models/User")
const Books = require("../../../models/Books")
const Helpers = require("../../../utils/helpers")
const { remove } = require("../../../../../controllers/booksController")
const { use } = require("../Routes/cartRoutes")
const { where } = require("sequelize")

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
            console.log(token)
            console.log(user)
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
        //const BookId = Number(req.params.bookid)

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

            return user.Carts.map(Cart => {
                return Cart.Cartitems.map(item => ({
                    id: item.Book.id,
                    title: item.Book.title,
                    autor: item.Book.autor,
                    year: item.Book.year,
                    img: item.Book.img,
                    descripition: item.Book.descripition
                }))
            })[0]

            /*if(BookId) {
                const booksOnCart = user.Carts.map(Cart => {
                    return Cart.Cartitems.map(item => ({
                        id: item.Book.id,
                        title: item.Book.title,
                        autor: item.Book.autor,
                        year: item.Book.year,
                        img: item.Book.img,
                        descripition: item.Book.descripition
                    }))
                })[0]
                const Book = booksOnCart.find(book => book.id === BookId);

                if (Book) {
                    if(BookId === Book.id) {
                        return Book
                    }
                } else {
                    return "notBooks"
                }
            }*/
        } catch (err) {
            console.log(err)
        }
    }

    async removeCartItem(BookId, req, res) {
        const token = await helpers.getUserToken(req)
        const userData = await helpers.getUserByToken(token , res)
        const user = await User.findByPk(userData.id, {
            include:{
                model: Cart
            }
        })
        if(!user) {
            return "notUser"
        }
        const CartData = user.Carts.map((results) => results.dataValues)
        const CartId = CartData[0].id

        const book = await Books.findOne({where: {id: BookId}})
        if (!book) {
            return "notBook"
        }

        await Cartitem.destroy({where: {CartId: CartId, BookId: BookId}})

        return true
    }
}