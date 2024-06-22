const express = require("express");
const router = express.Router();
const {
  addComment,
  getCommentByPostId,
} = require("../controller/commentController");

router.route("/").post(addComment);
router.route("/:id").get(getCommentByPostId);

module.exports = router;
