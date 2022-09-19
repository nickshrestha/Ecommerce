const mongoose = require("mongoose");

const productSchema =  mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
      type: String,
    },
  description: {
    type: String,
  },
  stockQuantity: {
    type: Number,
    min: 0,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
 
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const product = mongoose.model("product", productSchema);

module.exports = product;