const Category = require("../Models/catagoryModel.js");
const product = require("../Models/producModel.js")
//create and save new product
const addProduct = async (req, res) => {
  try {
   
    const category = await Category.findOne({ _id:id });
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
   
    let product_data = new product({
      productId: req.body.productId,
      name: req.body.name,
      description: req.body.description,
      image: `${filePath}${fileName}`,
      stockQuantity: req.body.stockQuantity,
      price: req.body.price,
      category: category._id,

    });

    
    
    let data = await product_data.save();
    if (data) {
      const count = category.quantity + product_data.stockQuantity;
      const categoryCount = await Category.findByIdAndUpdate(
        { _id:id },
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
        }catch(error){
            res.status(400).send({success: false, msg:error.message});
        }
    
};


//get all products
const getAllProduct = async (req, res) => {
  try {
    const Product = await product.find({ isDeleted: false })
      .select("-isDeleted")
      .populate("category", "name");
    if (!Product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, count: Product.length, data: Product });
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
    const category = await Category.findOne({
      $and: [{ _id:id }, { isDeleted: false }],
    });
    if (!category) {
      res.status(404).json({ success: false, message: "category not found" });
      return;
    }
    const Product = await product.find({
      $and: [{ category: category._id }, { isDeleted: false }],
    })
      .select("-isDeleted")
      .populate("category", "name");
    if (!Product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, count: category.quantity, data: Product });
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
    const Product = await product.findOne({
      $and: [{ productId: req.params.id }, { isDeleted: false }],
    })
      .select("-isDeleted")
      .populate("category", "name");
    if (!Product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.status(200).json({ success: true, data: Product });
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

    const Product = {
      name: req.body.name,
      description: req.body.description,
      stockQuantity: req.body.stockQuantity,
      price: req.body.price,
    };
    if (req.file) {
      const fileName = req.file.filename;
      const filePath = `/./uploads/`;
      Product.image = `${filePath}${fileName}`;
    }

    let data = await product.findOneAndUpdate(
      { _id: id },
      Product,
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
    res.status(500).json({ success: false, Error: err, msg: "error" });
  }
};

// //delete product by ID
// const deleteProduct = async (req, res) => {
//   try {
  
//     const productfind = await product.findOne({
//       $and: [{ isDeleted: false }],
//     });
//     if (productfind) {
//       const product = await productfind.updateOne({ isDeleted: true });
//       if (!product) {
//         res
//           .status(401)
//           .json({ success: false, message: "Error in product deletion" });
//       } else {
//         const category = await Category.findOneAndUpdate(
//           { _id: productfind.category },
//           { quantity: quantity - 1 }
//         );
//         if (category) {
//           res.status(200).json({ success: true, message: "product deleted" });
//         }
//       }
//     } else if (!productfind || productfind.length === null) {
//       res.status(401).json({ success: false, message: "Invalid product Id" });
//     }
//   } catch (err) {
//     res.status(500).json({ success: false, message: err });
//   }
// };

// delete product
const deleteProduct = async (req, res, next) => {
  try {
    let {productId} =req.body;
    const deleteproduct = await product.findOneAndUpdate({productId}, {isDelete: true });
    return res.status(201).json("delete sucessfully");
  } catch (err) {
    next(err);
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
    const Product = await product.find({
      $and: [{ name: regex }, { isDeleted: false }],
    }).select("-isDeleted");
    if (!Product || Product.length === 0) {
      res.status(404).json({
        success: false,
        message: "No any product found. Try with other queries",
      });
      return;
    }
    res
      .status(200)
      .json({ success: true, count: Product.length, data: Product });
  } catch (err) {
    res.status(500).json({ success: false, Error: err });
  }
};

// //getting featured product
// const getFeaturedProduct = async (req, res) => {
//   try {
//     const Product = await product.find({
//       $and: [{ isFeatured: true }, { isDeleted: false }],
//     })
//       .select("-isDeleted")
//       .populate("category", "name");
//     if (!Product) {
//       res
//         .status(404)
//         .json({ success: false, message: "Featured Product not found" });
//       return;
//     }
//     res
//       .status(200)
//       .json({ success: true, count: Product.length, data: Product });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message || "error occured while retrieving information",
//     });
//   }
// };

module.exports = {
  addProduct,
  getAllProduct,
  getAllCategoryProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  countProduct,
  searchProducts,
  // getFeaturedProduct,
};