const BookService = require("../Services/BookServices")

const booksService = new BookService
module.exports = class BookController{
    static async addBook(req, res) {
        const {title, autor, year, img, descripition} = req.body
        if (!title) {
            res.status(422).json({message: "O titulo é obgrigatorio!"})
            return
        }

        if (!autor) {
            res.status(422).json({message: "O nome autor é obrigatorio!"})
            return
        }
        if (!year) {
            res.status(422).json({message: "O ano de lançamento é obrigatorio!"})
            return
        }
        if (!img) {
            res.status(422).json({message: "A imagem do livro é obrigatoria!"})
            return
        }
        if(!descripition) {
            res.status(422).json({message: "A descrição do livro é obrigatoria!"})
            return
        }

        try{
            await booksService.CreateBook({title, autor, year, img, descripition}, req, res)
            res.status(201).json({message: "livro adicionado com sucesso"})
        } catch(err) {
            res.status(500).json({message: "Houver um erro com o servidor!", err})
        }
    }

    static async EditBook(req, res) {
        const id = req.params.id
        const {title, autor, year, img, descripition} = req.body
        if (!title) {
            res.status(422).json({message: "O titulo do livro é obrigatorio!"})
            return
        }
        if (!autor) {
            res.status(422).json({message: "O nome do autor é obrigatorio!"})
            return
        }
        if (!year){
            res.status(422).json({message: "O ano de publicação é obrigatorio!"})
            return
        }
        if (!img) {
            res.status(422).json({message: "A imagem do livro é obrigatoria!"})
            return
        }
        if (!descripition) {
            res.status(422).json({message: "A descrição do livro é obrigatoria"})
        }
        const book = await booksService.BookEdit({title, autor, year, img, descripition}, id)
        if(!book) {
            res.status(500).json({message: "O livro solicitado não existe ou não foi encontrado!"})
            return
        }

        res.status(200).json({message: "Livro editado com sucesso"})
    }
    
    async getBook(req, res) {
        const id = req.params.id
        // continuar o codigo a partir daqui
    }
}