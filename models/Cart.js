const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const Cart = db.define("Cart", {
    data_criacao:{
        type: DataTypes.DATE
    }
})

module.exports = Cart