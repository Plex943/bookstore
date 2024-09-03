const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

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

module.exports = Books