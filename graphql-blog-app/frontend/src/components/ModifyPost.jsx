import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useParams, useNavigate, Link } from "react-router-dom";

// graphql update post mutation
const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String!, $content: String!) {
    updatePost(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

// graphql get post mutation
const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
    }
  }
`;

const ModifyPost = ({ post, refetchPosts }) => {
  // get post id from url params
  const params = useParams();
  const navigate = useNavigate();
  // form state
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  // setup update post mutations
  const [updatePost] = useMutation(UPDATE_POST);

  // fetch single post if not provided via props
  const { id } = params || {};
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id },
    skip: !!post || !id,
  });

  // populate form when data is fetched
  useEffect(() => {
    if (!post && data && data.post) {
      setTitle(data.post.title || "");
      setContent(data.post.content || "");
    }
  }, [post, data]);

  // handle update post
  const handleUpdate = async () => {
    try {
      const currentId = post?.id || id;
      await updatePost({ variables: { id: currentId, title, content } });
      if (refetchPosts) {
        refetchPosts();
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Error updating post: " + error.message);
    }
  };

  if (!post && id && loading) return <p>Loading...</p>;
  if (!post && error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold">Modify "{title}"</h2>
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
          <div className="flex justify-end gap-2">
            <button onClick={handleUpdate} className="px-4 py-2 rounded-md bg-indigo-600 text-white">Save</button>
            <Link to={"/"} className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700">Cancel</Link>
          </div>
        </div>
    </div>
  );
};
export default ModifyPost;
