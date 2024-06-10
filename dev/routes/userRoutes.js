const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  setUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

router.route("/").post(setUser).get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
