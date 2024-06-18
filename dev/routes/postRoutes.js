const express = require("express");
const router = express.Router();
const { postContent } = require("../controller/postController");
const { upload } = require("../middleware/upload");

router.post("/", upload.array("works[]"), postContent);

module.exports = router;
