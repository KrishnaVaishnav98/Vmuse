const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/userModel");

const auth = async (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ msg: "Token Missing!" });
    }

    const CheckBlackList = await BlackListModel.findOne({ token });
    if (CheckBlackList) {
        return res.status(401).json({ msg: "Invalid Token, LogIn Again" });
    }

    jwt.verify(token, "vmuse", async (err, result) => {
        if (err) {
            return res.status(401).json({ msg: "Invalid Token Provided" });
        }
        req.body.userId = result.id;
        next();
    })

}

module.exports = { auth };