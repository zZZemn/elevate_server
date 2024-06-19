const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const addComment = asyncHandler(async (req, res) => {
  if (!req.body.userId) {
    res.status(400);
    throw new Error("Please add user id.");
  }

  if (!req.body.postId) {
    res.status(400);
    throw new Error("Please add post id.");
  }

  if (!req.body.comment) {
    res.status(400);
    throw new Error("Please add comment.");
  }

  if (!isValidObjectId(req.body.userId)) {
    res.status(400);
    throw new Error("Invalid user id format.");
  }

  if (!isValidObjectId(req.body.postId)) {
    res.status(400);
    throw new Error("Invalid post id format.");
  }

  const user = await User.findById(req.body.userId);
  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }

  const post = await Post.findById(req.body.postId);
  if (!post) {
    res.status(400);
    throw new Error("Post not found.");
  }

  const comment = await Comment.create({
    userId: req.body.userId,
    postId: req.body.postId,
    comment: req.body.comment,
  });

  res.status(200).json(comment);
});

module.exports = { addComment };
