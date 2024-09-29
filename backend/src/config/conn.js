const { Sequelize } = require("sequelize")


const sequelize = new Sequelize("bookstore", "root", "1234567890", {
    host: "localhost",
    dialect: "mysql"
})
sequelize.authenticate()
console.log("conectou ao banco!")

module.exports = sequelize