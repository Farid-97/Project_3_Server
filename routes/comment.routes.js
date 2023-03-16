const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");

// Create a comment on a Post

router.post("/createComment/:id", isAuthenticated, async (req, res, next) => {
  
  const { id } = req.params;

  const { comment } = req.body;
  console.log(comment);

  const idUser = req.payload._id;

  try {
    const newComment = await Comment.create({comment});
    await Post.findByIdAndUpdate(id, {$push: { comments: newComment._id }})
    await Comment.findByIdAndUpdate(newComment._id, {$push: { userId: idUser}})
    await Comment.findByIdAndUpdate(newComment._id, {$push: { postId: id }})
    res.json(newComment)
  } catch (error) {
    res.json(error);
  }
});

// Delete a comment that the user created

router.delete("/deleteComment/:postId/:commentId", async (req, res, next) => {
  const { postId } = req.params;
  const { commentId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.json("The provided id is not valid");
  }
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    res.json("The provided id is not valid");
  }
  try {
    await Post.findByIdAndUpdate(postId, {
      $pull: { comments: commentId },
    });
    await Comment.findByIdAndRemove(commentId)
    const post = await Post.findById(postId);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// edit a comment

router.put("/editComment/:id", async (req, res, next) => {
  const { id } = req.params;
  const {comment} = req.body;
  try {
    await Post.findByIdAndUpdate(id, {comment: comment});
    const post = await Post.findById(id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
