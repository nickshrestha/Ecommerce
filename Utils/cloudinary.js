const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config();
cloudinary.config({
  cloud_name: 'shresthaventures', 
  api_key: '935829613217174', 
  api_secret: '3i7cYX2bTwy21H9FDTHwx1JyeQk' 
});

module.exports = cloudinary;

