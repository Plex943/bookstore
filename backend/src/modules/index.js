const { UserRoutes } = require("./User")
const { BooksRoutes } = require("./Books")
const { CartRoutes } = require("./Cart")

module.exports = (app) => {
    app.use("/user", UserRoutes),
    app.use("/books", BooksRoutes)
    app.use("/cart", CartRoutes)
}