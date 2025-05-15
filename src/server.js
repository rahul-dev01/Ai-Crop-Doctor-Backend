const express = require('express')
require("./db/connect")
require("dotenv").config();
const cors = require("cors")
const V1ROUTER = require("./router/v1Router")

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env[`${NODE_ENV}_PORT`]


const app = express()
app.use(cors())
app.use(express.json());  

app.use("/api/v1" , V1ROUTER)


app.listen(PORT, () => {
  console.log(`Ai crop doctor app listening on port ${PORT}`)
})
