const { ApolloServer, gql } = require("apollo-server");

// typedefs and input types
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  type Mutation {
    addUser(input: CreateUserInput!): User
  }

  type Query {
    users: [User!]
    user(id: ID!): User
  }
`;

// sample data
const users = [
  { id: "1", name: "Muntaha", email: "muntaha@gmail.com" },
  { id: "2", name: "Minsa", email: "minsa@gmail.com" },
];

// resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === id),
  },
  Mutation: {
    addUser: (_, { input }) => {
      const newUser = { id: String(users.length + 1), ...input };
      users.push(newUser);
      return newUser;
    },
  },
};

// apollo server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
