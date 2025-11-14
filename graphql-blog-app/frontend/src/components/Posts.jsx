import React from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { Link } from "react-router-dom";

// graphql get posts query
const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
    }
  }
`;

// graphql delete post mutation
const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

const Posts = () => {
  // fetch posts using useQuery hook
  const { loading, error, data, refetch } = useQuery(GET_POSTS);
  // setup delete post mutation
  const [deletePost] = useMutation(DELETE_POST);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8">Error: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Blog Posts</h1>
        <Link to="/create" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">New Blog</Link>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2">
        {data.posts.map((post) => (
          <li key={post.id} className="bg-white rounded-xl shadow p-5">
            <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.content}</p>
            <div className="mt-4 flex items-center gap-3">
              <Link to={`/post/${post.id}`} className="text-indigo-600 hover:underline text-sm">Read More</Link>
              <Link to={`/modify/${post.id}`} className="text-gray-500 hover:text-gray-700 text-sm">Modify</Link>
              <div className="ml-auto">
                <button
                  onClick={async () => {
                    if (!window.confirm("Delete this post?")) return;
                    try {
                      await deletePost({ variables: { id: post.id } });
                      refetch();
                    } catch (error) {
                      console.error("Delete failed:", error);
                      alert("Error deleting post: " + error.message);
                    }
                  }}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
