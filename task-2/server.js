const { ApolloServer, gql } = require("apollo-server");

// typeDefs
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
`;

const users = [
  { id: "1", name: "muntaha", email: "muntaha@example.com" },
  { id: "2", name: "ali", email: "ali@example.com" },
];

// resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === id),
  },
};

// apollo server setup
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
