const express = require("express");
const router = express.Router();
const { postContent } = require("../controller/postController");

router.route("/").post(postContent);

module.exports = router;
