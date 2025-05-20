const express = require("express");
const authUserRouter = require("./userAuth");
const cropRouter = require("./cropAuth.js");

const V1ROUTER = express.Router();



V1ROUTER.use("/auth", authUserRouter);
V1ROUTER.use("/crop", cropRouter);

module.exports = V1ROUTER;
