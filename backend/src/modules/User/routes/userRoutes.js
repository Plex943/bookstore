const express = require("express")
const router = express.Router()
const UserController = require("../Controllers/userController")
const Helpers = require("../../../utils/helpers")

const helpers = new Helpers
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/", UserController.GetUser)

module.exports = router