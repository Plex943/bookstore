const { DataTypes } = require("sequelize")
const Sequelize = require("../config/conn")

const Cartitem = Sequelize.define("Cartitem", {
    quantyidade: {
        type: DataTypes.INTEGER
    }
})

module.exports = Cartitem