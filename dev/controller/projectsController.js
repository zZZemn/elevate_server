const asyncHandler = require("express-async-handler");

// @desc Get Projects
// @route GET /api/project
// @access Private
const getProjects = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get Project",
  });
});

// @desc Set Projects
// @route POST /api/project
// @access Private
const setProject = asyncHandler(async (req, res) => {
  if (!req.body.caption) {
    res.status(400);
    throw new Error("Please add caption.");
  } else {
    res.status(200).json({
      message: "Set Project",
    });
  }
});

// @desc Update Projects
// @route POST /api/project
// @access Private
const updateProject = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Update Project: ${req.params.id}`,
  });
});

// @desc Delete Projects
// @route POST /api/project
// @access Private
const deleteProject = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Delete Project: ${req.params.id}`,
  });
});

module.exports = {
  getProjects,
  setProject,
  updateProject,
  deleteProject,
};
