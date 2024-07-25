const express = require("express");
const router = express.Router();
const {
  userLogin,
  getUsers,
  getUser,
  setUser,
  updateUser,
  deleteUser,
  getUserByUsername,
} = require("../controller/userController");

router.route("/login").post(userLogin);
router.route("/").post(setUser).get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/username/:username").get(getUserByUsername);

module.exports = router;
