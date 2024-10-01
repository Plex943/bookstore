const { DataTypes } = require("sequelize")
const Sequelize = require("../config/conn")


const Books = Sequelize.define("Books", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descripition: {
        type: DataTypes.STRING,
        allowNull:false
    },
    admin: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Books