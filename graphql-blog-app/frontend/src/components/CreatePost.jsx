import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

// graphql create post mutation
const CREATE_POST = gql`
  mutation AddPost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

const CreatePost = () => {
  // form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // setup create post mutation
  const [addPost] = useMutation(CREATE_POST);

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title || !content) return alert("Title and Content are required.");
    addPost({
      variables: { title, content },
    });
    setTitle("");
    setContent("");
    alert("Post created successfully!");
    window.location.href = "/";
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold">Create New Post</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 ring-0 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 ring-0 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white">Add Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
