const express = require("express")
const router = express.Router()
const CartController = require("../Controllers/cartController")
const Helpers = require("../../../utils/helpers")

const helpers = new Helpers
router.get("/", helpers.verifytoken, CartController.ShowCart)
router.post("/:bookid", helpers.verifytoken, CartController.AddCart)
router.delete("/remove/:bookid", helpers.verifytoken, CartController.removeCartItem)

module.exports = router