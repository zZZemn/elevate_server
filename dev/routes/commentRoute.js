const express = require("express");
const router = express.Router();
const { addComment } = require("../controller/commentController");

router.route("/").post(addComment);

module.exports = router;
