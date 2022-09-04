import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { okResponse, errorResponse } from "../helper/response.js";

//getting a user using id
export const getSingleUser = async (req, res) => {
  try {
    const user = await User.find({ userId: req.params.id }).select(
      "-passwordHash"
    );
    if (!user) {
      errorResponse({
        status: 404,
        message: "not found",
        data: [],
        req,
        description: "User not found",
        res,
      });
    }
    okResponse({ status: 200, data: user, req, res });
  } catch (err) {
    errorResponse({
      status: 500,
      message: err,
      data: [],
      req,
      description: "Error in fetching",
      res,
    });
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().select("-passwordHash");
    if (!user) {
      errorResponse({
        status: 404,
        message: "not found",
        data: [],
        req,
        description: "User not found",
        res,
      });
    }
    okResponse({ status: 200, data: user, req, res });
  } catch (err) {
    errorResponse({
      status: 500,
      message: err,
      data: [],
      req,
      description: "Error in fetching",
      res,
    });
  }
};

//creating user
export const addUser = async (req, res) => {
  let userdata = new User({
    userId: req.body.userId,
    username: req.body.username,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
  });
  try {
    userdata = await userdata.save();
    if (!userdata) {
      errorResponse({
        status: 404,
        message: "cannot create",
        data: [],
        req,
        description: "User not created",
        res,
      });
    }

    okResponse({ status: 200, data: userdata, req, res });
  } catch (err) {
    errorResponse({
      status: 500,
      message: err,
      data: [],
      req,
      description: "Error in fetching",
      res,
    });
  }
};

export const login = async (req, res) => {
  const secret = process.env.secret;
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      errorResponse({
        status: 404,
        message: "not found",
        data: [],
        req,
        description: "User not found",
        res,
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
      errorResponse({
        status: 404,
        message: "not found",
        data: [],
        req,
        description: "Password is wrong",
        res,
      });
    }
  } catch (err) {
    errorResponse({
      status: 500,
      message: err,
      data: [],
      req,
      description: "Error in fetching",
      res,
    });
  }
};

//editing user
export const editUser = async (req, res) => {
  let userdata = {
    userId: req.body.userId,
    username: req.body.username,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
  };
  try {
    // const prevUser = User.find(req.body.username);
    // if (prevUser) {
    //   throw "User already registered";
    // }
    let user = await User.findOneAndUpdate(
      { userId: req.params.id },
      userdata,
      {
        new: true,
      }
    );
    if (!user) {
      //throw "User cannot be updated";
      errorResponse({
        status: 404,
        message: "not found",
        data: [],
        req,
        description: "User cannot be updated",
        res,
      });
    }

    okResponse({ status: 200, data: user, req, res });
  } catch (err) {
    errorResponse({
      status: 500,
      message: err,
      data: [],
      req,
      description: "Error in fetching",
      res,
    });
  }
};