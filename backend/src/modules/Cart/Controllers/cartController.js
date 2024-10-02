const CartServices = require("../Services/cartServices")

const cartservices = new CartServices
module.exports = class CartController {
    static async AddCart(req, res) {
        const BookId = req.params.bookid

        const BookAdd = await cartservices.AddToCArt(BookId, req, res)
        if (BookAdd === "notUser") {
            res.status(401).json({message: "usuario invalido ou inesxistente!"})
            return
        }

        if ( BookAdd === "notBook") {
            res.status(422).json({message: "Não foi possivel encontrar este livro ou ele não existe"})
            return
        }
        if (BookAdd === "itemAlready") {
            //função para aumentra a quantidade de livros no carrinho
        }

        if (BookAdd === "sucessful") {
            res.status(200).json({message: "Livro adicionado ao carrinho"})
            return
        }
    }

    static async ShowCart(req, res) {
        const booksOnCart = await cartservices.ShowBooksOnCart(req, res)
        console.log(booksOnCart, "74665656565656565")
        res.status(200).json({message: "Livros do carrinho: ", Books: booksOnCart[0]})
    }
}