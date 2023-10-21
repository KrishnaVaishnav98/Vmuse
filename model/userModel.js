const mongoose = require("mongoose");

// UserModel
const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { versionKey: false }
)

const UserModel = mongoose.model("user", userSchema);

// Token BlackListing Model
const BlacklistSchema = mongoose.Schema(
    {
        token: { type: String, required: true },
    },
    { versionKey: false }
);
const BlackListModel = mongoose.model("Blacklist", BlacklistSchema);

module.exports = {
    UserModel, BlackListModel
}