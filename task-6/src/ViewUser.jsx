import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_USERS = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

const ViewUser = () => {
  const [id, setId] = useState("");
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { id },
    skip: !id, // only run query if id is provided
  });
  return (
    <div className="card">
      <h2>Search User by ID</h2>
      <input
        type="text"
        placeholder="Enter User ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">Error: {error.message}</p>}
      {data && data.user && (
        <div className="user-details">
          <p><strong>Name:</strong> {data.user.name}</p>
          <p><strong>Email:</strong> {data.user.email}</p>
        </div>
      )}
    </div>
  );
};

export default ViewUser;
