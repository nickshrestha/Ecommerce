const express = require("express");
const categoryController = require("../Controllers/catagoryController.js");
const categoryRoute = express.Router();

categoryRoute.post("/", categoryController.addCategory);
categoryRoute.get("/", categoryController.getAllCategory);
categoryRoute.get("/:id", categoryController.getSingleCategory);
categoryRoute.delete("/:id", categoryController.deleteCategory);
categoryRoute.patch("/:id", categoryController.updateCategory);

module.exports = categoryRoute;
