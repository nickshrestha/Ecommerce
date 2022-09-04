const mongoose = require( "mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
    unique: true,
  },

  quantity: {
    type: String,
    default: 0,
    min: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;