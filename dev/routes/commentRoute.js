const express = require("express");
const router = express.Router();
const {
  addComment,
  getCommentsByPostId,
} = require("../controller/commentController");

router.route("/").post(addComment);
router.route("/:id").get(getCommentsByPostId);

module.exports = router;
