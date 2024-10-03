const express = require("express")
const cors = require("cors")
const BookController = require("./modules/Books/Controllers/BookController")
const initModules = require("./modules")

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(cors({credentials: true, origin: "http://localhost:3000"}))

initModules(app)
app.use("/", BookController.showAllBooks)

module.exports = app