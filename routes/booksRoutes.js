const express = require("express")
const router = express.Router()
const BooksController = require("../controllers/booksController")
const CheckAuth = require("../helpers/checkAuth").CheckAuth
const CheckAuthAdmin = require("../helpers/CheckAuthAdmin").CheckAuthAdmin

router.get("/",  BooksController.showBooks)
router.get("/userbooks", CheckAuthAdmin, BooksController.userBooks)
router.get("/add", CheckAuthAdmin, BooksController.addbook)
router.post("/add", CheckAuthAdmin, BooksController.addbookPost)
router.get("/edit/:id", CheckAuthAdmin, BooksController.editbooks)
router.post("/edit", CheckAuthAdmin, BooksController.editbooksPost)
router.post("/remove", CheckAuth, BooksController.remove)
router.get("/details/:id", BooksController.bookDetails)
router.post("/cart/:id", CheckAuth, BooksController.addtocart)
router.get("/cart", CheckAuth, BooksController.showCart)
router.post("/cart/remove/:id", BooksController.removeBookCart)
//router.get("/cart/remove/:id", BooksController.removeBookCart)

module.exports = router