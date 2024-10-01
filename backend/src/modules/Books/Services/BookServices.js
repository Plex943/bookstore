const Books = require("../../../models/Books")
const Helpers = require("../../../utils/helpers")

const helpers = new Helpers
module.exports = class BookService {
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
}