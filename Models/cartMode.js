import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderDB",
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
    },
  },
  {
    timestamps: true,
  }
  );

const CartDB = mongoose.model("CartDB", cartSchema);

export default CartDB;