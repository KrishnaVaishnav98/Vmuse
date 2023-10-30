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
                    res.send({ msg: "error" })
                }
                if (hash) {
                    const user = await new UserModel({ name, email, password: hash })
                    await user.save();
                    res.send({ msg: "New user registred successfully!", userData: user })
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
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.send({ msg: err })
                }
                else if (result) {
                    jwt.sign({ id: user._id }, "vmuse", function (err, token) {
                        if (err) {
                            res.send({ msg: err })
                        } else if (result) {
                            res.send({ msg: "Login Successfull!", token })
                        } else {
                            res.send({ msg: "Something went wrong" })
                        }
                    })
                } else {
                    res.send({ msg: "Incorrect password" })
                }
            })
        }
    } catch (err) {
        res.send({ msg: err })
    }
})


// Get all users 
userRoute.get("/all", auth, async (req, res) => {

    try {
        const users = await UserModel.find({})
        if (users) {
            res.send({ users: users });
        } else {
            res.send({ msg: "No users!" })
        }

    } catch (err) {
        res.send({ msg: err })
    }
})

// update user route
userRoute.patch("/update/:id", auth, async (req, res) => {

    try {
        const { id } = req.params
        const user = await UserModel.findByIdAndUpdate(id, req.body)
        if (user) {
            res.send({ msg: `user with id: ${id} updated successfully` });
        } else {
            res.send({ msg: "No users with given id !" })
        }
    } catch (err) {
        res.send({ msg: err })
    }
})

// delete user route
userRoute.delete("/delete/:id", auth, async (req, res) => {

    try {
        const { id } = req.params
        const user = await UserModel.findByIdAndDelete(id)
        if (user) {
            res.send({ msg: `user with id: ${id} deleted successfully`, user: user });
        } else {
            res.send({ msg: "No users with given id !" })
        }
    } catch (err) {
        res.send({ msg: err })
    }
})

module.exports = { userRoute }