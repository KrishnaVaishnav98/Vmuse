const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");
const { BlogModel } = require("../model/bolgModel");

const blogRoute = express.Router();


blogRoute.post('/post', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded.' });
    }

    // You can save the file information to MongoDB here
    const uploadedImage = {
        filename: req.file.originalname,
        path: req.file.path,
    };

    // Create a new blog post with image information
    const newBlogPost = new BlogModel({
        category: req.body.category,
        title: req.body.title,
        content: req.body.content,
        image: uploadedImage, // Attach the uploaded image to the blog post
    });

    newBlogPost.save((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving blog post.' });
        }
        res.status(200).json({ message: 'Blog post with image uploaded successfully.' });
    });
});

module.exports = { blogRoute }