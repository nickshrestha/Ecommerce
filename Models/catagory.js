const mongoose = require("mongoose");

const catagorySchema = mongoose.Schema(
    {
      catagory_id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description:{
        type: String,
        required: true,
      },
      thumbnail: {
        type: String,
        required: true,
      },
     
    },
    
  )

const catagoryt = mongoose.model("catagory", catagorySchema);

module.exports = catagoryt;