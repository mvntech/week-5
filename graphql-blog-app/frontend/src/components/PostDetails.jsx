import React from 'react'
import { useParams } from 'react-router-dom'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

// graphql get single post query
const GET_POST = gql`
query GetPost($id: ID!){
  post(id: $id){
    id
    title
    content
  }
}
`;

const PostDetails = () => {
  // get post id from url params
  const { id } = useParams();
  // fetch single post using useQuery hook
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id }
  });

  if(loading) return <p className="text-center py-8">Loading...</p>;
  if(error) return <p className="text-center py-8">Error: {error.message}</p>;
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <article className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-900">{data.post.title}</h2>
        <div className="mt-4 text-gray-700 whitespace-pre-wrap">{data.post.content}</div>
      </article>
    </div>
  )
}

export default PostDetails
