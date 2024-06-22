const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const PostPic = require("../models/postPicModel");
const User = require("../models/userModel");

const postContent = asyncHandler(async (req, res) => {
  if (!req.body.userId) {
    res.status(400);
    throw new Error("Please add user id");
  }

  if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
    res.status(400);
    throw new Error("Invalid user id");
  }

  const user = await User.findById(req.body.userId).select("-password");
  if (!user) {
    res.status(400);
    throw new Error("Invalid user id");
  }

  if (!req.body.caption) {
    res.status(400);
    throw new Error("Please add caption");
  }

  if (!req.files) {
    res.status(400);
    throw new Error("Please upload photo");
  }

  const post = await Post.create({
    userId: req.body.userId,
    caption: req.body.caption,
  });

  const postPicPromises = req.files.map((file) => {
    return PostPic.create({
      postId: post._id,
      url: `/uploads/${file.filename}`,
    });
  });
  await Promise.all(postPicPromises);

  const postPics = await PostPic.find({ postId: post._id });

  res.status(200).json({
    post: post,
    postedBy: user,
    images: postPics,
  });
});

const getAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "postedBy",
      },
    },
    {
      $lookup: {
        from: "postpics",
        localField: "_id",
        foreignField: "postId",
        as: "images",
      },
    },
    {
      $unwind: "$postedBy",
    },
    {
      $project: {
        caption: 1,
        createdAt: 1,
        updatedAt: 1,
        images: 1,
        "postedBy._id": 1,
        "postedBy.username": 1,
        "postedBy.email": 1,
        "postedBy.firstName": 1,
        "postedBy.lastName": 1,
        "postedBy.profession": 1,
        "postedBy.picture": 1,
        "postedBy.userType": 1,
      },
    },
  ]);

  res.status(200).json(posts);
});

module.exports = { postContent, getAllPost };
