const express = require("express")
const router = express.Router()
const BooksController = require("../controllers/booksController")
const CheckAuth = require("../helpers/checkAuth").CheckAuth

router.get("/",  BooksController.showBooks)
router.get("/userbooks", CheckAuth, BooksController.userBooks)
router.get("/add", CheckAuth, BooksController.addbook)
router.post("/add", CheckAuth, BooksController.addbookPost)
router.get("/edit/:id", CheckAuth, BooksController.editbooks)
router.post("/edit", CheckAuth, BooksController.editbooksPost)
router.post("/remove", CheckAuth, BooksController.remove)

module.exports = router