import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addUser, { loading, error }] = useMutation(ADD_USER);

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({
      variables: { name, email }
    })
      .then(() => {
        alert("User added!");
        setName("");
        setEmail("");
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };
  return (
    <div className="card">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
      {error && <p className="error-message">Error: {error.message}</p>}
    </div>
  );
};

export default AddUser;
