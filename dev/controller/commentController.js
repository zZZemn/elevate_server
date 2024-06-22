const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const ObjectId = mongoose.Types.ObjectId;

const addComment = asyncHandler(async (req, res) => {
  if (!req.body.userId) {
    res.status(400);
    throw new Error("Please add user id");
  } else if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
    res.status(400);
    throw new Error("Invalid user id");
  } else {
    const user = await User.findById(req.body.userId);
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
  }

  if (!req.body.postId) {
    res.status(400);
    throw new Error("Please add post id");
  } else if (!mongoose.Types.ObjectId.isValid(req.body.postId)) {
    res.status(400);
    throw new Error("Invalid post id");
  } else {
    const post = await Post.findById(req.body.postId);
    if (!post) {
      res.status(400);
      throw new Error("Post not found");
    }
  }

  if (!req.body.comment) {
    res.status(400);
    throw new Error("Please add comment.");
  }

  const comment = await Comment.create({
    userId: req.body.userId,
    postId: req.body.postId,
    comment: req.body.comment,
  });

  res.status(200).json(comment);
});

const getCommentsByPostId = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid post id");
  }

  const postId = new ObjectId(req.params.id);

  const comments = await Comment.aggregate([
    {
      $match: { postId: postId },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "commentedBy",
      },
    },
    {
      $unwind: "$commentedBy",
    },
    {
      $project: {
        comment: 1,
        "commentedBy._id": 1,
        "commentedBy.username": 1,
        "commentedBy.email": 1,
        "commentedBy.firstName": 1,
        "commentedBy.lastName": 1,
        "commentedBy.profession": 1,
        "commentedBy.picture": 1,
        "commentedBy.userType": 1,
      },
    },
  ]);

  console.log(req.params.id);
  res.status(200).json(comments);
});

module.exports = { addComment, getCommentsByPostId };
