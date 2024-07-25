const express = require("express");
const router = express.Router();
const {
  postContent,
  getAllPost,
  getPostByUserId,
} = require("../controller/postController");
const { upload } = require("../middleware/upload");

router.route("/").post(upload.array("works[]"), postContent).get(getAllPost);
router.route("/:userId").get(getPostByUserId);

module.exports = router;
