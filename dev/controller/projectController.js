const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

const getProjects = asyncHandler(async (req, res) => {
  const project = await Project.find();

  res.status(200).json(project);
});

const setProject = asyncHandler(async (req, res) => {
  if (!req.body.caption) {
    res.status(400);
    throw new Error("Please add caption.");
  } else {
    const project = await Project.create({
      caption: req.body.caption,
    });

    res.status(200).json(project);
  }
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error("Project not found.");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedProject);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error("Project not found.");
  }

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProjects,
  setProject,
  updateProject,
  deleteProject,
};
