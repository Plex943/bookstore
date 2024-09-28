const express = require("express")
const cors = require("cors")
const db = require("./config/conn")
const UserRoutes = require("./modules/User/routes/userRoutes")

const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(cors({credentials: true, origin: "http://localhost:3000"}))

app.use("/", UserRoutes)

module.exports = app