const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("", "", "", {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate()
console.log("criou o banco")

module.exports = sequelize