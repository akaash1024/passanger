require("dotenv").config()
const express = require("express");
const connectDB = require("./database/db");
const errorMiddleware = require("./middlewares/error.middlwar");
const path = require('path');
const authRouter = require("./routes/auth.route");
const passangerRouter = require("./routes/passanger.route");
const cors = require("cors")


const app = express()

// ! 
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, "public")))


app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))

// ! routes 

// ? app.use("/api/auth", authRouter)
// need to work on down the road

app.use("/api/auth", authRouter)
app.use("/api/passanger", passangerRouter)


app.use((req, res) => {
    res.render(path.join(__dirname, "views", "404.ejs"))
})
app.use(errorMiddleware)
// ! Server connection 
const PORT = process.env.PORT
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️ Server is listening at http://localhost:${PORT}/`);
    })
})