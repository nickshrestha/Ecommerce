const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    useremail: {
      type: String,
      required: true,
       match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
       
   ],
   unique: true,
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

  {
    timestamps: true,
  }
);

//making  model
const user = mongoose.model("user", userSchema);
module.exports =  user;