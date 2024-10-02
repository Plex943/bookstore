const Cart = require("../models/Cart")
const Cartitem = require("../models/Cartitem")
const Books = require("../models/books")
const User = require("../models/User")
const { Op, where } = require("sequelize")

Books.hasMany(Cartitem)
User.hasMany(Cart)
Cart.hasMany(Cartitem)

Cartitem.belongsTo(Books)
Cartitem.belongsTo(Cart)
Cart.belongsTo(User)

module.exports = class cartController{

    async buscarProdutos(UserId, search, order) {
        try{
            const user = await User.findByPk(UserId, {
                include: {
                    model: Cart,
                    include: {
                        model: Cartitem,
                        include: {
                            model: Books,
                            attributes: ["id", "title", "autor", "year", "img", "descripition"],
                            where: {title: {[Op.like]: `%${search}%`}}
                        }
                    }
                },
                order: [[{model:Cart}, {model: Cartitem}, {model: Books}, "CreatedAt", order]]
            })

            /*if (!user) {
                return {message: "usuario não encontrado"}
            }

            if (!user.Carts || user.Carts.length === 0) {
                return { message: "Nenhum carrinho encontrado para este usuário" };
            }*/
           user.Carts.map(Cart => {
            Cart.Cartitems.map((item) => {
                console.log(item.Book)
            })
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

                /*return Cart.Cartitems.map(item => ({
                    id: item.Books.id,
                    title: item.Books.title,
                    autor: item.Books.autor,
                    year: item.Books.year,
                    img: item.Books.img,
                    descripition: item.Books.descripition
                }))*/
            })
        } catch(err) {
            console.log("Erro na conexão com o carrinho: ", err)
        }
    }

    async addBooksCart(UserId, BookId){
        try {   
            const user = await User.findByPk(UserId)
            if (!user) {
                throw new Error("Usuario não encontrado")
            }
            
            let cart = await Cart.findOne({where: {UserId: UserId}})

            if (!cart) {
                cart = await Cart.create ({UserId: UserId})
            }

            const book = await Books.findByPk(BookId)
            if(!book) {
                throw new Error("Livro não encontrado")
            }

            let cartitem = await Cartitem.findOne({where: {
                CartId: cart.id, BookId: book.id
            }})

            if (cartitem) {

            } else {
                await Cartitem.create({
                    CartId: cart.id,
                    BookId: book.id,
                    quantyidade: 1
                })   
            }

            return {message: "Produto adicionado ao carrinho com sucesso"}
        } catch(err) {
            console.log("Erro ao adicionar o produto: ", err)
            throw err
        }
    }

    async buscarProduto(UserId, BookId) {
        try {
            const user = await User.findByPk(UserId, {
                include: {
                    model: Cart,
                    include: {
                        model: Cartitem,
                        include: {
                            model: Books,
                            attributes: ["id", "title", "autor", "year", "img", "descripition"],
                            where: {id: BookId}
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
            })
        } catch(err) {
            console.log("err ao buscar o Produto: ", err)
        }
    }

    async removeCart(UserId, BookId) {
        const user = await User.findByPk(UserId, {
            include: {
                model: Cart,
            }
        })
        const CartData = user.Carts.map((results) => results.dataValues)
        const CartId = CartData[0].id

        Cartitem.destroy({where: {
            BookId: BookId,
            CartId: CartId
        }})

        return 
    }
}