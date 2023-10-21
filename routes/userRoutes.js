const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");
const { UserModel } = require("../model/userModel");

const userRoute = express.Router();


// SignUp Route
userRoute.post("/signup", async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const alreadyExist = await UserModel.findOne({ email })
        if (alreadyExist) {
            res.json({ message: "Email Already Registered!" });
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.send({ msg: err })
                } else if (hash) {
                    const user = await new UserModel({ name, email, password: hash })
                    await user.save();
                    res.send({ msg: "New user registred successfully!", userData: user })
                } else {
                    res.send({ msg: "Something went wrong" })
                }
            })
        }

    } catch (err) {
        res.send({ msg: err })
    }
})


// Login Route
userRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare()
        }
    } catch (err) {
        res.send({ msg: err })
    }
})

module.exports = { userRoute }