const express = require("express")
const router = express.Router()
const UserController = require("../Controllers/userController")

router.get("/", UserController.home)

module.exports = router