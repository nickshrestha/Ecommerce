const express = require("express");
const app = express();
const cors = require("cors");


// routes from routers
const adminRoutes = require("./Routers/admin.js");
const discountRoutes = require("./Routers/discount.js");
const categoryRoutes = require("./Routers/categoryRoute.js");
const productRoutes = require("./Routers/productRoute.js");
const userRoutes = require("./Routers/userRoute.js");
// // dotenv file for config file
const dotenv = require("dotenv").config();
// import "dotenv/config";


//middleware for json format
app.use(express.json());

//database
require("./database/database.js");
app.use(cors());


//routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/discount", discountRoutes);
app.use("/api/v1/catagory", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/user", userRoutes);


app.listen(process.env.PORT, () => {
  console.log(`running in port number ${process.env.PORT}`);
});
