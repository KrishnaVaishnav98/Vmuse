const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connection } = require("./db");
const { userRoute } = require("./routes/userRoutes");
const { blogRoute } = require("./routes/blogRouter");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.get("/", async (req, res) => {
    try {
        res.status(201).json({ msg: "Welcome To Vmuse" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Something went Wrong!" });
    }
});

app.listen(8080, async () => {
    try {
        await connection
        console.log("Connected and Listening to Port : 8080");
    } catch (error) {
        console.log("Connection Error : ", error);
    }
});