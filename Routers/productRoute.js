const express = require("express");
const {
  getAllProduct,
  getAllCategoryProduct,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  countProduct,
  searchProducts,
} = require("../Controllers/productController.js");
const uploadOptions = require("../helpers/imageUpload.js")
const productRouter = express.Router();

productRouter.get("/all", getAllProduct);
productRouter.get("/category/:id", getAllCategoryProduct);
productRouter.get("/:id", getSingleProduct);
productRouter.post("/", uploadOptions.single("image"), addProduct);
productRouter.patch("/:id", uploadOptions.single("image"), updateProduct);
productRouter.delete("/", deleteProduct);
productRouter.get("/count", countProduct);
productRouter.get("/search/:name", searchProducts);

module.exports =  productRouter;
