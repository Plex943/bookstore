const session = require("express-session")
const Books = require("../models/books")
const User = require("../models/User")
const cartController = require("./cartController")
const { Op } = require("sequelize")

const CartController = new cartController
module.exports = class BooksController{

    static async showBooks(req, res) {
        let search = ""

        if (req.query.search) {
            search = req.query.search
        }
        
        let order = "DESC"

        if (req.query.order === "old") {
            order = "ASC"
        } else {
            order = "DESC"
        }

        const BooksData = await Books.findAll({
            where: {
                title: {[Op.like]: `%${search}%`}
            },
            order: [["CreatedAt", order]]
        })

        const books = BooksData.map((results) => results.get({plain: true}))
        const booksQTY = books.lenght

        res.render("books/home", {books, search, booksQTY})
    }

    static async userBooks(req, res) {
        const id = req.session.userid

        const user = await User.findOne({ 
            where: {id:id},
            plain: true
        })

        if (!user) {
            res.redirect("/register")
        }

        const books = await Books.findAll({where: {admin : id}, raw: true})
        let empityBooks = false

        if (books.lenght === 0) {
            empityBooks = true
        }

        res.render("books/userBooks", { books, empityBooks})
    }

    static async addbook(req, res) {
        res.render("books/addBook")
    }

    static async addbookPost(req, res) {
        const {title, autor, year, img, descripition} = req.body
        const userid = req.session.userid

        try {
            const book = await Books.create({ title, autor, year , img, descripition, admin : userid })
            req.flash("message", "Livro adicionado com sucesso!")

            req.session.save(() => {
                res.redirect("/books/userbooks")
            })
        } catch(err) {
            console.log("erro ao add o livro: ", err)
        }
    }

    static async editbooks(req, res) {
        const id = req.params.id
        const book = await Books.findOne({where: {id:id}, raw: true})

        res.render("books/editbooks", {book: book})
    }

    static async editbooksPost(req, res) {
        const {id, title, autor, year, img, descripition} = req.body
        const book = await Books.findOne({where: {id:id}})
        book.update({title, autor, year, img, descripition})
        req.flash("message", "Livro Editado com sucesso!")

        req.session.save(() => {
            res.redirect("/books/userbooks")
        })
    }
    
    static async remove(req, res) {
        const id = req.body.id
        await Books.destroy({where: {id:id}})
        req.flash("message", "Livro Removido do catalogo com sucesso!")

        req.session.save(() => {
            res.redirect("/books/userbooks")
        })
    }

    static async bookDetails(req, res) {
        const BookId = req.params.id
        const book = await Books.findOne({raw: true, where: 
            {
                id: BookId
            }
        })

        res.render("books/details", { book: book })
    }

    static async addtocart(req, res) {
        try{

            const BookId = req.params.id
            const UserId = req.session.userid

            const user = await User.findOne({where: {
                id:UserId,
                plain: true
            }})

            if (!user) {
                res.redirect("/login")
                req.flash("message", "logue em uma conta primerio para comprar um livro!")
                return
            }

            CartController.addBooksCart(UserId, BookId)
            
            req.flash("Message", "produto adicionado ao carrinho com sucesso!")
            req.session.save(() => {
                res.redirect("/")
            })
        } catch (err) {
            console.log("ocorreu um erro ao adicionar no carrinho: ", err)
        }
    }
    static async showCart(req, res) {
        try {
            // criando a barra de pesquisa

            let search = ""

            if (req.query.search) {
                search = req.query.search
            }
            
            let order = "DESC"

            if (req.query.order === "old") {
                order = "ASC"
            } else {
                order = "DESC"
            }
            
            // recebendo os livros, que o usuario colocou no carrinho, do banco
            const UserId = req.session.userid
            const books = await CartController.buscarProdutos(UserId, search, order)

            res.render("books/cart", { books: books[0], search })

            

        } catch (err) {
            console.log("ocorreu um erro ao buscar os produtos: ", err)
        }        
    }
}


/*  {{#if sesssion.admin}}
    <span class="actions">
        <a href="/books/edit/{{this.id}}" class="btn">Editar</a>
        <form action="/books/remove" method="post">
            <input type="hidden" value="{{this.id}}" name="id">
            <input type="submit" value="Excluir" class="btn">
        </form>
    </span>
{{/if}}*/