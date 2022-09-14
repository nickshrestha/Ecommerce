const express = require("express");
const {createOrder,getAllOrders, getOrderByUser, updateOrderStatus, getCartCount, getTotalSales} = require("../Controllers/orderController.js")
const router = express.Router();

router.post("/", createOrder );
router.get("/alluser", getAllOrders );
router.get("/getaOrders/:username", getOrderByUser);
router.patch("/:id", updateOrderStatus);
router.get("/cartCount",  getCartCount);
router.get("/totalSales", getTotalSales);




module.exports = router;