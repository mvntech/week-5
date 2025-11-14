require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();

// connect to mongodb
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB!");
});

// apollo + express server
const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(
      `Server listening on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startApolloServer();
