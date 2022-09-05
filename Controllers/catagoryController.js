const categoryModel = require( "../Models/catagoryModel.js");
const { uniqueId } = require("../helpers/uniqueId.js");
const Product = require("../Models/producModel.js");
const Category = require("../Models/catagoryModel.js");

const categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const allCategory = await categoryModel
        .find({ isDeleted: false })
        .select("-isDeleted");
      if (!allCategory || allCategory.length === null) {
        return res
          .status(404)
          .json({ message: "category not found" });
      }
      return res.status(200).json({ success: true, data: allCategory });
    } catch (err) {
      return res.status(500).json({ success: false, error: err });
    }
  },

  getSingleCategory: async (req, res) => {
    try {
      const singleCategory = await categoryModel
        .findOne({
          $and: [{ id: req.body.id }, { isDeleted: false }],
        })
        .select("-isDeleted");
      if (!singleCategory || singleCategory.length === null) {
        return res
          .status(404)
          .json({ success: false, message: "category not found" });
      }
      return res.status(200).json({ success: true, data: singleCategory });
    } catch (err) {
      return res.status(500).json({ success: false, Error: err });
    }
  },

  // addCategory: async (req, res) => {
    
  //   try {
  //     const newCategory = new categoryModel({
  //       id: req.body.id,
  //       name: req.body.name,
  //       quantity: req.body.quantity
  //     });
  //     const addedCategory = await newCategory.save();
  //     return res.status(200).json({ success: true, data: addedCategory });
  //   } catch (err) {
  //     return res.status(500).json({ success: false, Error: err });
  //   }
  // },
  // add catagory
addCategory : async (req, res) => {
  try {
    
        let {
          id,
        name,
        quantity
        } = req.body;
        
        let fields = [ id,
          name,
          quantity
        ]
          
         
                  const value = await categoryModel.findOne({
                    id
                  });
                
                  if (value) {
                    return res.status(422).json ({ message: " ID already taken"});

                
    }
    
    
   
        
        
        
        let data = await new categoryModel({
          id,
          name,
          quantity
                     
        })
        .save();
        
        
        
        if (!data) {
     return res.status(500).json({message: "cannot Add Catagory!" });

    }
    return res.status(200).json({
      data: {
        id: req.body.id,
        name: req.body.name,
        quantity: req.body.quantity,
       
        message: "Creating Catagory  sucessfully.",
      }
    })
} catch (err) {
 return res.status(500).json({ message: err.message });
}
},

  updateCategory: async (req, res) => {
    try {
      if (!req.body) {
        res.status(400).json({ Message: "No contents found to be updated" });
      }
      let category = {
        name: req.body.name,
      };
      const updatedCategory = await categoryModel.findOneAndUpdate(
        { id: req.params.id },
        category,
        { new: true }
      );
      return res.status(200).json({ success: true, data: updatedCategory });
    } catch (err) {
      return res.status(500).json({ success: false, Error: err });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const categoryfind = await categoryModel.findOne({
        $and: [{ isDeleted: false }, { id: req.params.id }],
      });
      if (categoryfind) {
        const category = await categoryfind.updateOne({ isDeleted: true });
        if (!category) {
          res
            .status(401)
            .json({ success: false, message: "Error in category deletion" });
        } else {
          const product = await Product.updateMany(
            { category: categoryfind._id },
            { isDeleted: true }
          );
          if (product) {
            res
              .status(200)
              .json({ success: true, message: "category deleted" });
          }
        }
      } else if (!categoryfind || categoryfind.length === null) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid category Id" });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: err });
    }
  },
};

module.exports = categoryController;