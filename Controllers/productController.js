import { uniqueId } from "../helper/uniqueId.js";
import Category from "../Models/categoryModel.js";
import Product from "../Models/productModel.js";

//create and save new product
const addProduct = async (req, res) => {
  try {
    const category = await category.findOne({ id: req.body.category });

    if (!category) {
      res.status(404).json({ success: false, message: "invalid category id" });
      return;
    }
    const file = req.file;
    if (!file) {
      res.status(404).json({ success: false, message: "Image not found" });
      return;
    }

    const fileName = req.file.filename;
    const filePath = `/public/uploads/`;
    let product = new Product({
      productId: id,
      name: req.body.name,
      description: req.body.description,
      image: `${filePath}${fileName}`,
      stockQuantity: req.body.stock,
      price: req.body.price,
      category: category._id,
      isFeatured: req.body.isFeatured,
    });

    let data = await product.save();
    if (data) {
      const count = category.quantity + 1;
      const categoryCount = await CategoryDB.findByIdAndUpdate(
        { _id: category._id },
        {
          quantity: count,
        }
      );
      if (!categoryCount) {
        res.status(400).json({
          success: false,
          message: "count cannot be updated",
        });
      }
      res.status(200).json({ success: true, data: data });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      Error: err,
    });
  }
};

//get all products
const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find({ isDeleted: false })
      .select("-isDeleted")
      .populate("category", "name");
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, count: product.length, data: product });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "error occured while retrieving information",
    });
  }
};

//get all products via category id
const getAllCategoryProduct = async (req, res) => {
  try {
    const category = await CategoryDB.findOne({
      $and: [{ id: req.params.id }, { isDeleted: false }],
    });
    if (!category) {
      res.status(404).json({ success: false, message: "category not found" });
      return;
    }
    const product = await Product.find({
      $and: [{ category: category._id }, { isDeleted: false }],
    })
      .select("-isDeleted")
      .populate("category", "name");
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, count: category.quantity, data: product });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "error occured while retrieving information",
    });
  }
};

//get single products
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      $and: [{ productId: req.params.id }, { isDeleted: false }],
    })
      .select("-isDeleted")
      .populate("category", "name");
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "error occured while retrieving information",
    });
  }
};

//update product by id
const updateProduct = async (req, res) => {
  try {
    //validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "To update content can not be empty",
      });
      return;
    }

    const product = {
      name: req.body.name,
      description: req.body.description,
      stockQuantity: req.body.stock,
      price: req.body.price,
      isFeatured: req.body.isFeatured,
    };
    if (req.file) {
      const fileName = req.file.filename;
      const filePath = `/public/uploads/`;
      product.image = `${filePath}${fileName}`;
    }

    let data = await product.findOneAndUpdate(
      { productId: req.params.id },
      product,
      {
        new: true,
      }
    );
    if (!data) {
      res.status(404).json({
        success: false,
        message: `cannot update product. Product not found!`,
      });
    }
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({ success: false, Error: err });
  }
};

//delete product by ID
const deleteProduct = async (req, res) => {
  try {
    const productfind = await Product.findOne({
      $and: [{ isDeleted: false }, { productId: req.params.id }],
    });
    if (productfind) {
      const product = await productfind.updateOne({ isDeleted: true });
      if (!product) {
        res
          .status(401)
          .json({ success: false, message: "Error in product deletion" });
      } else {
        const category = await CategoryDB.findOneAndUpdate(
          { _id: productfind.category },
          { quantity: quantity - 1 }
        );
        if (category) {
          res.status(200).json({ success: true, message: "product deleted" });
        }
      }
    } else if (!productfind || productfind.length === null) {
      res.status(401).json({ success: false, message: "Invalid product Id" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

//getting product counts
const countProduct = async (req, res) => {
  try {
    const Count = await product.find({ isDeleted: false }).countDocuments();
    if (!Count) {
      res.status(500).json({ success: false, message: "Error in counting" });
    }
    res.status(200).json({ success: true, count: Count });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

//product search
const searchProducts = async (req, res) => {
  try {
    var query = req.params.name.replace(/momo/g, "");
    var regex = new RegExp(query, "i");
    const product = await product.find({
      $and: [{ name: regex }, { isDeleted: false }],
    }).select("-isDeleted");
    if (!product || product.length === 0) {
      res.status(404).json({
        success: false,
        message: "No any product found. Try with other queries",
      });
      return;
    }
    res
      .status(200)
      .json({ success: true, count: product.length, data: product });
  } catch (err) {
    res.status(500).json({ success: false, Error: err });
  }
};

//getting featured product
const getFeaturedProduct = async (req, res) => {
  try {
    const product = await product.find({
      $and: [{ isFeatured: true }, { isDeleted: false }],
    })
      .select("-isDeleted")
      .populate("category", "name");
    if (!product) {
      res
        .status(404)
        .json({ success: false, message: "Featured Product not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, count: product.length, data: product });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "error occured while retrieving information",
    });
  }
};

export {
  addProduct,
  getAllProduct,
  getAllCategoryProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  countProduct,
  searchProducts,
  getFeaturedProduct,
};