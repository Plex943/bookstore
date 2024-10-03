const BooksRoutes = require("./Books/Routes/BooksRoutes")
const { UserRoutes } = require("./User")
const { CartRoutes } = require("./Cart")

module.exports = (app) => {
    app.use("/books", BooksRoutes)
    app.use("/user", UserRoutes),
    app.use("/cart", CartRoutes)
}