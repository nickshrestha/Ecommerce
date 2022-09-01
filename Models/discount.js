const mongoose = require("mongoose");

const discountSchema = mongoose.Schema(
    {
    discount_code:{
        type: String,
        required: true,
     },
      discount_value:{
        type: String,
        required: true,
      },
      
     
    },
   
  )

const discount = mongoose.model("discount", discountSchema);

module.exports = discount;