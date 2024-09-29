const express = require("express")
const cors = require("cors")
const db = require("./config/conn")
const UserRoutes = require("./modules/User/routes/userRoutes")
const UserController = require("./modules/User/Controllers/userController")

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(cors({credentials: true, origin: "http://localhost:3000"}))

app.use("/user", UserRoutes)
app.use("/", UserController.home)

module.exports = app