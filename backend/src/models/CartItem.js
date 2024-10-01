const { DataTypes } = require("sequelize")
const Sequelize = require("../config/conn")

const CartItem = Sequelize.define("CartItem", {
    quantyidade: {
        type: DataTypes.INTEGER
    }
})

module.exports = CartItem