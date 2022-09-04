const express = require("express");
const { createAdmin, loginAdmin, resetPassword} = require("../Controllers/adminController.js");


const router = express.Router();

//create Admin
router.post("/create", createAdmin);


//login Admin
router.post("/login", loginAdmin);


//reset paswooord
router.post("/reset", resetPassword);


module.exports = router;
