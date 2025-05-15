const express = require("express")
const authUserRouter = require("./userAuth")

const V1ROUTER = express.Router() ;

V1ROUTER.use("/auth" ,authUserRouter )

module.exports =  V1ROUTER ;