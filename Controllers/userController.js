const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { okResponse, errorResponse } = require("../helpers/response.js");


//getting a user using id
const getUserById = async (req, res, next) => {
  try { console.log(req.params)
   let {userId} =req.params;
    const result = await User.findOne(
      userId
    );
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
  };

const getAllUsers = async (req, res) => {
  try {
   let {userId} =req.body;
    // const myfarm = await product.find();
    // return res.status(201).json(myfarm);
    const result = await  User.find(userId);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
    
  }
};
//creating user
 const addUser = async (req, res) => {
  let userdata = new User({
    userId: req.body.userId,
    username: req.body.username,
    useremail:  req.body.useremail,
    billing_address: req.body.billing_address,
    contact: req.body.contact,
  });
  try {
    userdata = await userdata.save();
    if (!userdata) {
      res.status(404).json({
       
        message: "cannot create",
        data: [],
      
      });
    }

    res.status(200).json({  data: userdata });
  } catch (err) {
    res.status(500).json({
      message: err,
      data: [],
    });
  }
};



// //editing user
//  const editUser = async (req, res) => {
//   let userdata = {
//     userId: req.body.userId,
//     username: req.body.username,
    
//     isAdmin: req.body.isAdmin,
//   };
//   try {
//     // const prevUser = User.find(req.body.username);
//     // if (prevUser) {
//     //   throw "User already registered";
//     // }
//     let user = await User.findOneAndUpdate(
//       { userId: req.params.id },
//       userdata,
//       {
//         new: true,
//       }
//     );
//     if (!user) {
//       //throw "User cannot be updated";
//       errorResponse({
//         status: 404,
//         message: "not found",
//         data: [],
//         req,
//         description: "User cannot be updated",
//         res,
//       });
//     }

//     okResponse({ status: 200, data: user, req, res });
//   } catch (err) {
//     errorResponse({
//       status: 500,
//       message: err,
//       data: [],
//       req,
//       description: "Error in fetching",
//       res,
//     });
//   }
// };

module.exports = {
  addUser,
  getAllUsers,
  getUserById
};