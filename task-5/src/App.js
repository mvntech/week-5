import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

// defining gql
const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
      email
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div className="user-list-container">
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            {user.name} &rarr; {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
