const express = require("express");
const router = express.Router();
const { insertReaction } = require("../controller/reactController");

router.route("/").post(insertReaction);

module.exports = router;