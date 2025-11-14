const mongoose = require("mongoose");

// post schema
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
