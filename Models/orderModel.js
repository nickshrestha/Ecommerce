import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  quantity: { type: Number, min: 0, default: 0 },
});

const Order = mongoose.model("order", orderSchema);

export default Order;