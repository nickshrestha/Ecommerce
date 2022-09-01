const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
    {
    payment_id:{
        type: String,
        required: true,
     },
      payment_date:{
        type: Date,
        required: true,
      },
      type:{
        type: String,
        required: true,
      },
     
    },
   
  )

const payment = mongoose.model("payment", paymentSchema);

module.exports = payment;