const { DataTypes } = require("sequelize")
const db = require("../db/conn")

const Cartitem = db.define("Cartitem", {
    quantyidade: {
        type: DataTypes.INTEGER
    }
})


module.exports = Cartitem