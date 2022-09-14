const express = require("express");
const mongoose = require('mongoose');
const  createOrder = require("../Controllers/orderController.js");
const { getAllProduct } = require("../Controllers/productController.js");
const orders = require("../Models/orderModel.js");
const Product = require("../Models/producModel.js");


// const  {createOrder} =  require("../Controllers/orderController.js")

const router = express.Router();

router.post("/", (req, res) => {
  Product.findById(req.body.productId)
  .then(getAllProduct => {
    const order  =  new orders({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save()
      .then(result => {
        console.log(result);
        res.status(201).json({msg: 'order added'})
      }).catch (err => {
        console.log(err);
        res.status(500).json({error: err
        });
      });
  });
});
    
// router.get("/", cartController.getAllOrders);
// router.get("/getOrderByUser/:username", cartController.getOrderByUser);
// router.patch("/:id", cartController.updateOrderStatus);
// router.get("/cartCount/:id", cartController.getCartCount);
// router.get("/totalSales", cartController.getTotalSales);

module.exports = router;