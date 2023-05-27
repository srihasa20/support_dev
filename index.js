require("dotenv").config()
const express = require('express')
const app = express()
const userRouter = require("./routes/support")
const port = 2100
app.use(express.json())
app.use("/", userRouter)
app.listen(port, () =>
{
    console.log("Server running on PORT: ", port)
})

