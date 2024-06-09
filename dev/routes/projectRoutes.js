const express = require("express");
const router = express.Router();
const {
  getProjects,
  setProject,
  updateProject,
  deleteProject,
} = require("../controller/projectController");

router.route("/").get(getProjects).post(setProject);
router.route("/:id").put(updateProject).delete(deleteProject);

module.exports = router;
