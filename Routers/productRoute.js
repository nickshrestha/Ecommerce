const express = require("express");
const {
  // getAllProduct,
  // getAllCategoryProduct,
  // getSingleProduct,
  addProduct,
  // updateProduct,
  // deleteProduct,
  // countProduct,
  // searchProducts,
  // getFeaturedProduct,
} = require("../Controllers/productController.js");
const uploadOptions = require("../helpers/imageUpload.js")
const productRouter = express.Router();

// productRouter.get("/", getAllProduct);
// productRouter.get("/category/:id", getAllCategoryProduct);
// productRouter.get("/:id", getSingleProduct);
// productRouter.get("/get/featured", getFeaturedProduct);
productRouter.post("/", uploadOptions.single("image"), addProduct);
// productRouter.patch("/:id", uploadOptions.single("image"), updateProduct);
// productRouter.delete("/:id", deleteProduct);
// productRouter.get("/get/count", countProduct);
// productRouter.get("/search/:name", searchProducts);

module.exports =  productRouter;
