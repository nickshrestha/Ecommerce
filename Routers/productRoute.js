import { Router } from "express";
import {
  getAllProduct,
  getAllCategoryProduct,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  countProduct,
  searchProducts,
  getFeaturedProduct,
} from "../controllers/productController.js";
import { uploadOptions } from "../helper/imageUpload.js";

const productRouter = Router();

productRouter.get("/", getAllProduct);
productRouter.get("/category/:id", getAllCategoryProduct);
productRouter.get("/:id", getSingleProduct);
productRouter.get("/get/featured", getFeaturedProduct);
productRouter.post("/", uploadOptions.single("image"), addProduct);
productRouter.patch("/:id", uploadOptions.single("image"), updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/get/count", countProduct);
productRouter.get("/search/:name", searchProducts);

export default productRouter;
