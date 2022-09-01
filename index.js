const express = require("express");
const app = express();
const cors = require("cors");
// NODE_TLS-REJECT-UNAUTHORIZED='0' node app.js
// importing routes
// const bodeParser = require('body-parser');
// const multer = require('multer');

// routes from routers
const userRoutes = require("./routers/user.js");


// // dotenv file for config file
const dotenv = require("dotenv").config();
// import "dotenv/config";


//middleware for json format
app.use(express.json());

//database
require("./database/database.js");
app.use(cors());


//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/myfarm", myfarmRoutes);
app.use("/api/v1/catagory", catagoryRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/review", reviewRoutes);



app.use('/uploads', express.static('uploads'))

// app.use("*", (req, res) => {
//   noRouteValidator(res);
// });


app.listen(process.env.PORT, () => {
  console.log(`running in port number ${process.env.PORT}`);
});
