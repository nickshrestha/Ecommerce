const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { okResponse, errorResponse } = require("../helpers/response.js");


//getting a user using id
 const getSingleUser = async (req, res) => {
  try {
    const user = await User.find({ userId: req.params.id }).select(
      "-passwordHash"
    );
    if (!user) {
    res.status(404).json({
       
        message: "not found",
        data: [],
       
      });
    }
    okResponse({ status: 200, data: user, req, res });
  } catch (err) {
    res.status(500).json({
      
      message: err,
      
    });
  }
};

// //get all users
//  const getAllUsers = async (req, res) => {
//   try {
//     const user = await User.find().select("-passwordHash");
//     if (!user) {
//       errorResponse({
//         status: 404,
//         message: "not found",
//         data: [],
//         req,
//         description: "User not found",
//         res,
//       });
//     }
//     res.status(200).json({  data: user, });
//   } catch (err) {
//     res.status(500).json({
//       message: err,
//       data: [],
      
//     });
//   }
// };

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

 const login = async (req, res) => {
  const secret = process.env.secret;
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).json({
        message: "not found",
        data: [],
    
      });
    }
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.userId,
          isAdmin: user.isAdmin,
        },
        secret,
        { expiresIn: "1d" }
      );
      okResponse({ status: 200, data: { token }, req, res });
    } else {
      res.status(404).json({
         message: "not found",
        data: [],
      });
    }
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
//     passwordHash: bcrypt.hashSync(req.body.password, 10),
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
  addUser
};