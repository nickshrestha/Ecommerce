const express = require("express");
const CreateOrder = require("../Controllers/orderController.js");
const orderRoute = express.Router();

orderRoute.post("/", CreateOrder );


module.exports = orderRoute;
