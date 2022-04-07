const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const passport = require("passport")
const authRoutes = require("./routes/auth")
const articleRoutes = require("./routes/article")
const profileRoutes = require("./routes/profile")
const keys = require("./config/keys")
const app = express()

const port = process.env.PORT || 5000

mongoose.connect(keys.mongoURI)
    .then(() => console.log("MongoDB connected!"))
    .catch(error => console.log(error))

app.use(passport.initialize())
require("./middleware/passport")(passport)

app.use(require("morgan")("dev"))
app.use(require("cors")())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.listen(port, () => console.log(`Port ${port} active!`))

app.get("/", (req, res) => {
    res.status(200).json({message: "hello world!"})
})

app.use("/api/auth", authRoutes)
app.use("/api", articleRoutes)
app.use("/api", profileRoutes)
