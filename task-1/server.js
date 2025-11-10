const { ApolloServer, gql } = require("apollo-server");

// define graphql schema using SDL
const typeDefs = gql`
  type User {
    id: ID! // scalar type: the value is used to uniquely identify an object
    name: String!
    email: String!
  }

  type Query {
    users: [Users!]
    user(id: ID!): User
  }

  type Mutation {
    addUser(name: String!, email: String!): User
  }
`;

// sample data
const users = [
  { id: "1", name: "Muntaha", email: "muntaha@gmail.com" },
  { id: "2", name: "Minsa", email: "minsa@gmail.com" },
];

// define resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === id),
  },
  Mutation: {
    addUser: (_, { name, email }) => {
      const newUser = { id: String(users.length + 1), name, email };
      users.push(newUser);
      return newUser;
    },
  },
};

// create apollo server instance
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
