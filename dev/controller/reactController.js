const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const React = require("../models/reactModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const ObjectId = mongoose.Types.ObjectId;

const insertReaction = asyncHandler(async (req, res) => {
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

  if (!req.body.reaction) {
    res.status(400);
    throw new Error("Please add reaction");
  }

  if (
    !Number(req.body.reaction || req.body.reaction > 4 || req.body.reaction < 1)
  ) {
    res.status(400);
    throw new Error("Invalid reaction");
  }

  const existingReaction = await React.findOne({
    userId: req.body.userId,
    postId: req.body.postId,
  });

  if (existingReaction) {
    const reactionId = existingReaction._id;

    if (req.body.reaction == existingReaction.reaction) {
      const deleteReaction = await React.findByIdAndDelete(reactionId);
      if (!deleteReaction) {
        res.status(400);
        throw new Error("Something went wrong");
      }

      res.status(200).json({ message: "reaction removed" });
    } else {
      const updateReaction = await React.findByIdAndUpdate(
        reactionId,
        { reaction: req.body.reaction },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "reaction updated", data: updateReaction });
    }
  } else {
    const react = await React.create({
      userId: req.body.userId,
      postId: req.body.postId,
      reaction: req.body.reaction,
    });

    res.status(200).json({ message: "reaction added", data: react });
  }
});

const getReactionsByPostId = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid post id");
  }

  const postId = new ObjectId(req.params.id);

  const reactions = await React.aggregate([
    {
      $match: { postId: postId },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "reactBy",
      },
    },
    {
      $unwind: "$reactBy",
    },
    {
      $project: {
        reaction: 1,
        createdAt: 1,
        updatedAt: 1,
        "reactBy._id": 1,
        "reactBy.username": 1,
        "reactBy.email": 1,
        "reactBy.firstName": 1,
        "reactBy.lastName": 1,
        "reactBy.profession": 1,
        "reactBy.picture": 1,
        "reactBy.userType": 1,
      },
    },
  ]);

  res.status(200).json(reactions);
});

const checkPostReaction = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
    res.status(400);
    throw new Error("Invalid post id");
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    res.status(400);
    throw new Error("Invalid user id");
  }

  const postId = new ObjectId(req.params.postId);
  const userId = new ObjectId(req.params.userId);

  const existingReaction = await React.findOne({
    userId: userId,
    postId: postId,
  });

  const response = {
    reacted: "",
  };

  if (existingReaction) {
    response.reacted = true;
  } else {
    response.reacted = false;
  }

  res.status(200).json(response);
});

module.exports = {
  insertReaction,
  getReactionsByPostId,
  checkPostReaction,
};

//   1  - Like
//   2  - Love
//   3  - Wow
//   4  - Support
