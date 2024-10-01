const express = require("express")
const cors = require("cors")
const UserRoutes = require("./modules/User/routes/userRoutes")
const BooksRoutes = require("./modules/Books/Routes/BooksRoutes")
const CartRoutes = require("../src/modules/Cart/Routes/cartRoutes")
const BookController = require("./modules/Books/Controllers/BookController")

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(cors({credentials: true, origin: "http://localhost:3000"}))

app.use("/user", UserRoutes)
app.use("/books", BooksRoutes),
app.use("/cart", CartRoutes)
app.use("/", BookController.showAllBooks)

module.exports = app