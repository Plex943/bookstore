const Books = require("../../../models/Books")
const Helpers = require("../../../utils/helpers")
const {Op, Model} = require("sequelize")

const helpers = new Helpers
module.exports = class BookService {

    async getAllBooks(search, order) {
        const BooksData = await Books.findAll({where: {title: {[Op.like]: `%${search}%`}}, order: [["CreatedAt", order]] })
        const books = BooksData.map((results) => results.get({plain: true}))
        if (!books) {
            return false
        }
        return books
    }
    async CreateBook(data, req, res) {
        const {title, autor, year, img, descripition} = data
        const token = await helpers.getUserToken(req)
        const user = await helpers.getUserByToken(token, res)
        await Books.create({title, autor, year, img, descripition, admin: user.id})
        return
    }

    async BookEdit(data, id) {
        const {title, autor, year, img, descripition} = data
        const book = await Books.findOne({where: {id: id}})
        if (!book) {
            return false
        }
        await book.update({title, autor, year, img, descripition})
        return true
    }
    async GetBook(id) {
        const book = await Books.findOne({where: {id:id}})
        if (!book) {
            return false
        } else {
            return book
        }
    }

    async remove(id) {
        const book = await Books.findOne({where: {id:id}})
        if (!book) {
            return false
    
        } else {
            await Books.destroy({where: {id:id}})
            return true
        }
    }
    
    async getAdminBooks(req, res) {
        const token = await helpers.getUserToken(req)
        const user = await helpers.getUserByToken(token, res)

        const books = await Books.findAll({where: {admin : user.id}})

        if (books) {
            return books
        } else {
            return false
        }
    }
}