const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");
const User = require('../models/User.model')
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//Create a Post and put the ID in the User Database

router.post("/post", isAuthenticated, async (req, res, next) => {
  const { title, img, description, tags } = req.body;
  try {
    const post = await Post.create({ title, img, description, tags });
    await User.findByIdAndUpdate(req.payload._id , { $push: { post: post._id } })
    console.log(post);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// Upload file to cloudinary and get the URL of that file

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

//Get all existing posts in the database

router.get("/post", async (req, res, next) => {
  try {
    const Posts = await Posts.find();
    res.json(Posts);
  } catch (error) {
    res.json(error);
  }
});

// Get one specific post

router.get("/post/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("comments");
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// Edit one specific post

router.put("/editPost/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json("The provided id is not valid");
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    ).populate("comments");

    res.json(updatedPost);
  } catch (error) {
    res.json(error);
  }
});

// Delete a specific post

router.delete("/post/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    await Comment.deleteMany({ _id: post.tasks });

    await Post.findByIdAndDelete(id);
    res.json({ message: `Project with the id ${id} was successfully deleted` });
  } catch (error) {
    res.json(error);
  }
});

// Add a post as favourite in the favourite section of the user

router.put('/favourites/:id', isAuthenticated, async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json("The provided id is not valid");
    }
    try {
      const post = await Post.findById(id);
      const updatedUser = await User.findByIdAndUpdate(req.payload._id, {$push: { favourites: post._id } })
  
      res.json(updatedUser);
    } catch (error) {
      res.json(error);
    }
  })

module.exports = router;