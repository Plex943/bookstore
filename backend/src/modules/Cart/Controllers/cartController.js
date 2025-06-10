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
            res.status(422).json({message: "o itm já está no carrinho"})
            return
        }

        if (BookAdd === "sucessful") {
            res.status(200).json({message: "Livro adicionado ao carrinho"})
            return
        }
    }

    static async ShowCart(req, res) {
        const booksOnCart = await cartservices.ShowBooksOnCart(req, res)
        if (booksOnCart === "notBooks") {
            res.status(422).json({message: "Você não tem nenhum Livro no carrinho"})
            return
        }
        
        res.status(200).json({message: "Livros do carrinho: ", Books: booksOnCart})
    }

    static async removeCartItem(req, res) {
        const BookId = req.params.bookid
        const BookRemoved = await cartservices.removeCartItem(BookId, req, res)
        if (BookRemoved === "notUser") {
            res.status(422).json({message: "Usuario invalido!"})
            return
        }
        if(BookRemoved === "notBook") {
            res.status(422).json({message: "Livro não existe ou invalido!"})
            return
        }

        res.status(200).json({message: "Livro removido do carrinho!"})
    }
}