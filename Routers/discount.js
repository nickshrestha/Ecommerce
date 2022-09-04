const express = require("express");
const discountPrice = require("../Controllers/discount.js");
const router = express.Router();

//create Admin
router.post("/", discountPrice.discountPrice);




module.exports = router;
