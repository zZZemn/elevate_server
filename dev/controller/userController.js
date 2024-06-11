const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const userLogin = asyncHandler(async (req, res) => {
  const inputUsername = req.body.username;
  const inputPassword = req.body.password;

  const user = await User.findOne({ username: inputUsername });

  if (!user) {
    res.status(400);
    throw new Error("Invalid username");
  }

  const isPwMatch = await bcrypt.compare(inputPassword, user.password);
  if (!isPwMatch) {
    res.status(400);
    throw new Error("Wrong password");
  }

  res.status(200).json(user);
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
    !req.body.email ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.profession
  ) {
    res.status(400);
    throw new Error("Some fields are required.");
  }

  const inputUsername = await User.findOne({ username: req.body.username });
  if (inputUsername) {
    res.status(400);
    throw new Error("Username already exists.");
  }

  const inputEmail = await User.findOne({ email: req.body.email });
  if (inputEmail) {
    res.status(400);
    throw new Error("Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    username: inputUsername,
    password: hashedPassword,
    email: inputEmail,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profession: req.body.profession,
    picture: process.env.DEF_PROFILE,
  });

  res.status(200).json(user);
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
  userLogin,
  getUsers,
  getUser,
  setUser,
  updateUser,
  deleteUser,
};
