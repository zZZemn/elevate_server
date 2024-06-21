const express = require("express");
const router = express.Router();
const {
  insertReaction,
  getReactionsByPostId,
} = require("../controller/reactController");

router.route("/").post(insertReaction);
router.route("/:id").get(getReactionsByPostId);

module.exports = router;
