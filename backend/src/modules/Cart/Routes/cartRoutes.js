const express = require("express")
const router = express.Router()
const CartController = require("../Controllers/CartController")
const Helpers = require("../../../utils/helpers")

const helpers = new Helpers
router.post("/:bookid", helpers.verifytoken, CartController.AddCart)
router.get("/:bookid", helpers.verifytoken, CartController.ShowCart)
router.delete("/remove/:bookid", helpers.verifytoken, CartController.removeCartItem)

module.exports = router