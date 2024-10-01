const CartServices = require("../Services/cartServices")

module.exports = class CartController {
    static async AddCart(req, res) {
        const BookId = req.paramns.BookId

        res.status(200).json({message: "Livro adicionado ao carrinho"})
    }
}