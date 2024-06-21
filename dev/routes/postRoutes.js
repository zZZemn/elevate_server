const express = require("express");
const router = express.Router();
const { postContent, getAllPost } = require("../controller/postController");
const { upload } = require("../middleware/upload");

router.route("/").post(upload.array("works[]"), postContent).get(getAllPost);

module.exports = router;
