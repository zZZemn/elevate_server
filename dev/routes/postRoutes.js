const express = require("express");
const router = express.Router();
const {
  postContent,
  getAllPost,
  getPostByUserId,
  getPostByPostId,
} = require("../controller/postController");
const { upload } = require("../middleware/upload");

router.route("/").post(upload.array("works[]"), postContent).get(getAllPost);
router.route("/:userId").get(getPostByUserId);
router.route("/getpost/:postId").get(getPostByPostId);

module.exports = router;
