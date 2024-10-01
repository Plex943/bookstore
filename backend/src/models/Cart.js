const { DataTypes } = require("sequelize")
const Sequelize = require("../config/conn")

const Cart = Sequelize.define("Cart", {
    data_criacao:{
        type: DataTypes.DATE
    }
})

module.exports = Cart
