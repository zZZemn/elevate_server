const express = require("express");
const router = express.Router();
const {
  insertReaction,
  getReactionsByPostId,
  checkPostReaction,
} = require("../controller/reactController");

router.route("/").post(insertReaction);
router.route("/:id").get(getReactionsByPostId);
router.route("/:postId/:userId").get(checkPostReaction);

module.exports = router;
