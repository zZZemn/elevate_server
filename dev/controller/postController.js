const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const PostPic = require("../models/postPicModel");

const postContent = asyncHandler(async (req, res) => {
  if (!req.body.caption) {
    res.status(400);
    throw new Error("Please add caption.");
  }

  if (!req.files) {
    res.status(400);
    throw new Error("Please upload photo.");
  }

  const post = await Post.create({
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
    images: postPics,
  });
});

const getAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.aggregate([
    {
      $lookup: {
        from: "postpics",
        localField: "_id",
        foreignField: "postId",
        as: "images",
      },
    },
    {
      $project: {
        caption: 1,
        createdAt: 1,
        updatedAt: 1,
        images: 1,
      },
    },
  ]);

  res.status(200).json(posts);
});

module.exports = { postContent, getAllPost };

const sample = {
  _id: "6672a235e9fd4d904c5c99ff",
  caption: "My recent works 2024",
  createdAt: "2024-06-19T09:17:41.544+00:00",
  updatedAt: "2024-06-19T09:17:41.544+00:00",
  pictures: [
    {
      _id: "6672a236e9fd4d904c5c9a01",
      postId: "6672a235e9fd4d904c5c99ff",
      url: "/uploads/1718788661523.png",
    },
    {
      _id: "6672a236e9fd4d904c5c9a01",
      postId: "6672a235e9fd4d904c5c99ff",
      url: "/uploads/1718788661523.png",
    },
    {
      _id: "6672a236e9fd4d904c5c9a01",
      postId: "6672a235e9fd4d904c5c99ff",
      url: "/uploads/1718788661523.png",
    },
  ],
};
