const express = require("express")
const router = express.Router()
const Helpers = require("../../../utils/helpers")
const helpers = new Helpers
const BookController = require("../Controllers/BookController")

router.post("/add", helpers.verifyAdmToken, BookController.addBook)
router.patch("/edit/:id", helpers.verifyAdmToken, BookController.EditBook)
router.get("/:id", helpers.verifytoken, BookController.getBook)

module.exports = router