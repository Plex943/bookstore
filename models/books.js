const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const User = require("../models/User")

const Books = sequelize.define('Books', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

Books.belongsTo(User)
User.hasMany(Books)

module.exports = Books