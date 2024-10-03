const express = require("express")
const router = express.Router()
const Helpers = require("../../../utils/helpers")
const BookController = require("../Controllers/BookController")

const helpers = new Helpers
router.get("/", BookController.showAllBooks)
router.post("/add", helpers.verifyAdmToken, BookController.addBook)
router.patch("/edit/:id", helpers.verifyAdmToken, BookController.EditBook)
router.get("/adminBooks", helpers.verifyAdmToken, BookController.adminBooks)
router.delete("/remove/:id", helpers.verifyAdmToken, BookController.removeBook)
router.get("/:id", BookController.getBook)

module.exports = router