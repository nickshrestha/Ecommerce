const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
    order_id:{
        type: String,
        required: true,
     },
      amount:{
        type: String,
        required: true,
      },
      order_email:{
        type: String,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
       ],
      },
      order_date:{
        type: Date,
        required: true,
      },
      order_status:{
        type: String,
        required: true,
      },
      
    },
   
  )

const order = mongoose.model("order", orderSchema);

module.exports = order;