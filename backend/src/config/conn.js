const { Sequelize } = require("sequelize")


const sequelize = new Sequelize("", "", "", {
    host: "localhost",
    dialect: "mysql"
})
sequelize.authenticate()
console.log("conectou ao banco!")

module.exports = sequelize