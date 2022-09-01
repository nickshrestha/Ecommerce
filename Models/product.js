const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
    product_id:{
        type: String,
        required: true,
     },
     product_name:{
        type: String,
        required: true,

     },

      price:{
        type: String,
        required: true,
      },
      description:{
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      
      stock:{
        type: String,
        required: true,
      },

      quantity:{
        type: String,
        required: true,
      }
      
    },
   
  )

const product = mongoose.model("product", productSchema);

module.exports = product;