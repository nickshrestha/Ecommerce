const Router = require("express")
const {
  // getSingleUser,
  // getAllUsers,
  addUser,
  // login,
  // editUser,
}= require("../controllers/userController.js") ;

const router = Router();

// router.get("/:id", getSingleUser);
// router.get("/", getAllUsers);
// router.patch("/:id", editUser);
router.post("/register", addUser);
// router.post("/login", login);

module.exports = router;
