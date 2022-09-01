const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
    {
    admin_id:{
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
      
      
     
    },
   
  )

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;