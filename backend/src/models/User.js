const { DataTypes } = require("sequelize")
const Sequelize = require("../config/conn")

const User = Sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
})

module.exports = User