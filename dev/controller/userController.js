const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const User = require("../models/userModel");

const userLogin = asyncHandler(async (req, res) => {
  const user = await User.findByUsernameAndPassword;
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid user ID");
  } else {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400);
      throw new Error("User not found.");
    }

    res.status(200).json(user);
  }
});

const setUser = asyncHandler(async (req, res) => {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.profession
  ) {
    res.status(400);
    throw new Error("Some fields are required.");
  } else {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profession: req.body.profession,
    });

    res.status(200).json(user);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getUsers,
  getUser,
  setUser,
  updateUser,
  deleteUser,
};
