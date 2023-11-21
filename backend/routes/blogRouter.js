const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");
const { BlogModel } = require("../model/bolgModel");
const upload = require("../middlewares/upload");

const blogRoute = express.Router();
const multer = require('multer');


blogRoute.post('/post', upload.single('image'), async (req, res) => {

    try {
        const { title, content } = req.body;
        const image = req.file.path.replace(/\\/g, '/');
        const newBlog = new BlogModel({ title, content, image });
        await newBlog.save();

        res.json({ message: 'Blog post created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating a blog post' });
    }
});


// blogRoute.post('/upload-image', upload.single('image'), async (req, res) => {

//     const imageName = req.file.filename;
//     try {
//         await Images.create({ image: imageName })
//         res.json({ status: "ok" })

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error creating a blog post' });
//     }
// });


blogRoute.get('/view', async (req, res) => {
    try {
        const blogs = await BlogModel.find({});
        res.json({ blogs: blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating a blog post' });
    }
});

module.exports = { blogRoute }