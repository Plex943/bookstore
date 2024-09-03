const express = require("express")
const router = express.Router()
const BooksController = require("../controllers/booksController")

router.get("/", BooksController.showBooks)

module.exports = router