// src/pages/SingleBlog.jsx
import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import blogData from "../BlogData";

import Comments from '../../../components/Comments/Comments';
import LikeButton from '../../../components/LikeButton/LikeButton';

export default function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogData.find((b) => b.id === parseInt(id));

  if (!blog) return <h2 className="p-4">Blog not found</h2>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-black text-white rounded"
      >
        Back
      </button>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-4">
          <h1 className="text-2xl font-bold">{blog.title}</h1>

          <div className="mt-2">
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className="text-sm bg-gray-200 px-2 py-1 rounded-full mr-2"
              >
                #{tag}
              </span>
            ))}
          </div>

          <p className="mt-4 text-gray-700">{blog.description}</p>
        </div>
        <LikeButton postId={blog.id} />
        <Comments postId={blog.id} postTitle={blog.title} />
      </div>
    </div>
  );
}