const Router = require("express")
const {
  getUserById,
  getAllUsers,
  addUser,
  // login,
  // editUser,
}= require("../controllers/userController.js") ;

const router = Router();

router.get("/:id", getUserById);
router.get("/getall", getAllUsers);
// router.patch("/:id", editUser);
router.post("/add", addUser);
// router.post("/login", login);

module.exports = router;
