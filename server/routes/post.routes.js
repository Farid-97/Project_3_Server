const router = require('express').Router();
const mongoose = require('mongoose');
const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');

//Create a Post

router.post('/post', async (req,res,next) => {
    const {title, img, description, tags} = req.body;
    try {
        const post = await Post.create({title, img, description, tags})
        console.log(post)
        res.json(post)
    } catch (error) {
        res.json(error)
    }
})

//Get all existing posts in the database

router.get("/posts", async (req, res, next) => {
    try {
        const Posts = await Posts.find().populate('comments');
        res.json(Posts);
    } catch (error) {
        res.json(error)
    }
})


