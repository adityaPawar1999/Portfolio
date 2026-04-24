// src/pages/Blog.jsx
import React from 'react';
import blogData from "./BlogData";
import { useNavigate } from "react-router-dom";


export default function Blog() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 py-[100px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 auto-rows-[200px]">
        {blogData.map((blog, index) => (
          <div
            key={blog.id}
            onClick={() => navigate(`/blog/${blog.id}`)}
            className={`cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300
              ${index % 3 === 0 ? "row-span-2" : "row-span-1"}`}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-3">
              <h2 className="text-lg font-semibold">{blog.title}</h2>

              <div className="mt-1">
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-200 px-2 py-1 rounded-full mr-1"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {blog.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}