const express = require("express")
const exphbs = require("express-handlebars")
const app = express()
const session = require("express-session")
const FileStore = require("session-file-store")(session)
const flash = require("express-flash")
const User = require("./models/User")
const conn = require("./db/conn")
const BooksRoutes = require("./routes/booksRoutes")
const BooksController = require("./controllers/booksController")
const authRoutes = require("./routes/authRoutes")

app.use(express.urlencoded({
    extended: true
}))
app.set(express.json())

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(session(
    {
        name: "session",
        secret: "xxxxx",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require("path").join(require("os").tmpdir(), "sessions")
        }),
        cookie: {
            secure: false,
            maxAge: 1200000,
            expires: new Date(Date.now() + 1200000),
            httpOnly: true
        }
    }
))

app.use((req, res, next) => {
    if(req.session.userid) {
        req.locals.session = req.session
    }

    next()
})

app.use(flash())

app.use("/", authRoutes)
app.use("/books", BooksRoutes)
app.use("/", BooksController.showBooks)

conn
 .sync()
 .then(() => {
    app.listen(3000)
    console.log("server odando na port 3000")
 })