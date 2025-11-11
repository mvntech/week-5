require("dotenv").config();
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server");
const User = require("./model/User");

// mongodb connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDD connected!"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// typeDefs
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]
    user(id: ID!): User
  }
`;

// resolvers
const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid user ID format");
      }
      return await User.findById(id);
    },
  },
};

// apollo server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
