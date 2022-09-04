const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
    {
    
    email: {
        type: String,
        required: true,
        unique: true,
         match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
     ],
     },
     password:{
        type: String,
        required: true,
     },
        
      full_name: {
        type: String,
        required: true,
      },
      contact:{
        type: String,
        required: true,
        unique: true,
      },
      address:{
        type: String,
        required: true,
      },
      isadmin: {
        type: Boolean,
        default: false,
      }
     
    },
   
  )

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;