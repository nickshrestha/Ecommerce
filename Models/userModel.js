import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

//making  model
const customer = mongoose.model("customer", customerSchema);
export default customer;