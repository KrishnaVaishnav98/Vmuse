const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    category: String,
    title: String,
    content: String,
    image: String

},
    { versionKey: false }
)

const BlogModel = mongoose.model("blog", blogSchema)

module.exports = { BlogModel }