const express = require("express")
const router = express.Router()
const CartController = require("../Controllers/CartController")
const Helpers = require("../../../utils/helpers")

const helpers = new Helpers
router.get("/:BookId", helpers.verifytoken, CartController.AddCart)

module.exports = router