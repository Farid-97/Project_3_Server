const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// Get the information of the logged user

router.get("/getUser", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id).populate("post").populate("favourites").populate("following");
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

router.get("/getUser/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const specificUser = await User.findById(id)
      .populate("post")
      .populate("favourites")
      .populate({
        path: "favourites",
        populate: { path: "comments", model: "Comment" },
      });
      
    res.json(specificUser);
  } catch (error) {
    res.json(error);
  }
});

router.put("/editUser", isAuthenticated, async (req, res, next) => {
  const { username, imgUrl } = req.body;
  try {
   const updatedUser = await User.findByIdAndUpdate(req.payload._id, {username, imgUrl}, {new: true}); 
   res.json(updatedUser);
  } catch (error) {
    res.json(error);
  }
});

router.put("/follow/:id", isAuthenticated, async(req, res, next) => {
  const {id} = req.params;
  try {
    const response = await User.findByIdAndUpdate(req.payload._id, {$push: {following: id}}, {new: true})
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})

router.delete('/removeFollow/:id', isAuthenticated, async(req, res, next) => {
  const { id } = req.params;
  try {
    const response = await User.findByIdAndUpdate(req.payload._id, {$pull: {following: id}}, {new: true})
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})
module.exports = router;