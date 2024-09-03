const Books = require("../models/books")
const User = require("../models/User")

module.exports = class BooksController{
    static async showBooks(req, res) {
        res.render("books/home")
    }

    static async userBooks(req, res) {
        const id = req.session.userid

        const user = await User.findOne({
            where: {id:id},
            include: Books,
            plain: true
        })

        if (!user) {
            res.redirect("/register")
        }

        const books = user.Books.map((results) => results.dataValues)
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
        const {title, autor, year} = req.body
        const userid = req.session.userid

        try {
            console.log("book")
            const book = await Books.create({ title, autor, year , UserId: userid})
            req.flash("message", "Livro adicionado com sucesso!")

            req.session.save(() => {
                res.redirect("/books/userbooks")
            })
        } catch(err) {
            console.log("erro ao add o livro: ", err)
        }
    }
}