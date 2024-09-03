

module.exports = class BooksController{
    static async showBooks(req, res) {
        res.render("books/home")
    }
}