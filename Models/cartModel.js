

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
    ],

    orderStatus: {
      type: String,
      enum: ["Pending", "Shipping", "Success", "Cancelled"],
      default: "Pending",
    },

    username: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
     
    },

    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      unique:true
    },
  },
  {
    timestamps: true,
  }
  );

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;