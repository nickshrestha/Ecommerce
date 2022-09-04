import { Router } from "express";

import {
  getSingleUser,
  getAllUsers,
  addUser,
  login,
  editUser,
} from "../controllers/userController.js";

const route = Router();

route.get("/:id", getSingleUser);
route.get("/", getAllUsers);
route.patch("/:id", editUser);
route.post("/register", addUser);
route.post("/login", login);

export default route;
