const { Query } = require("mongoose");
const Post = require("../models/Post");

// resolvers (query & mutation)
const resolvers = {
  Query: {
    posts: async () => await Post.find(),
    post: async (_, { id }) => await Post.findById(id),
  },
  Mutation: {
    createPost: async (_, { title, content }) => {
      const post = new Post({ title, content });
      return await post.save();
    },
    updatePost: async (_, { id, title, content }) => {
      return await Post.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );
    },
    deletePost: async (_, { id }) => {
      return await Post.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
