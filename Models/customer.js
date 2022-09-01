const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
    {
    Customer_id:{
        type: String,
        required: true,
     },
    email: {
        type: String,
        required: true,
         match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
     ],
     },
     pasword:{
        type: String,
        required: true,
     },
        
      full_name: {
        type: String,
        required: true,
      },
      billing_address: {
        type: String,
        required: true,
      },
      contact:{
        type: String,
        required: true,
      },
      
     
    },
   
  )

const customer = mongoose.model("customer", customerSchema);

module.exports = customer;