const Books = require("../models/books")
const User = require("../models/User")
const { Op } = require("sequelize")

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
            include: User,
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

    static async editbooks(req, res) {
        const id = req.params.id
        const book = await Books.findOne({where: {id:id}, raw: true})

        res.render("books/editbooks", {book})
    }

    static async editbooksPost(req, res) {
        const {id, title, autor, year} = req.body
        const book = await Books.findOne({where: {id:id}})
        book.update({title, autor, year})
        req.flash("message", "Livro Editado com sucesso!")

        req.session.save(() => {
            res.redirect("/books/userbooks")
        })
    }
    
    static async remove(req, res) {
        const id = req.body.id
        await Books.destroy({where: {id:id}})
        req.flash("message", "Livro Retirado com sucesso!")

        req.session.save(() => {
            res.redirect("/books/userbooks")
        })
    }
}