
const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  quantity: { type: Number, min: 0, default: 1 },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;