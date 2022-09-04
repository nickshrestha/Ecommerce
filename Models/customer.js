const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
    {
   
    email: {
        type: String,
        required: true,
         match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
     ],
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