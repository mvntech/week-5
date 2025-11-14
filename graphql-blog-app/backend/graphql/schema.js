const { gql } = require("apollo-server-express");

// type definition with gql
const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    posts: [Post!]
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
    updatePost(id: ID!, title: String!, content: String!): Post
    deletePost(id: ID!): Post
  }
`;

module.exports = typeDefs;
