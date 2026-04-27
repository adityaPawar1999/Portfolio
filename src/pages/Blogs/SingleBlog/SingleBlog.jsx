// src/pages/SingleBlog.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogData from "../BlogData";
import Comments from "../../../components/Comments/Comments";
import LikeButton from "../../../components/LikeButton/LikeButton";
import { getCategoriesWithCount, getCategoryMeta } from "../Catorory/categoryUtils";

function readTime(text = "") {
  return Math.max(1, Math.round(text.split(" ").length / 200));
}

function initials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export default function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const categories = getCategoriesWithCount();

  const currentIndex = blogData.findIndex((b) => b.id === parseInt(id));
  const blog = blogData[currentIndex];

  if (!blog) return <h2 className="p-6 text-gray-500">Blog not found</h2>;

  const prevBlog = blogData[currentIndex - 1] || null;
  const nextBlog = blogData[currentIndex + 1] || null;

  const catMeta = getCategoryMeta(blog.category);

  // popular = top 3 by likes, excluding current post
  const popularPosts = [...blogData]
    .filter((b) => b.id !== blog.id)
    .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
    .slice(0, 3);

  return (
    
    <div className="min-h-screen bg-gray-50 px-4 py-6 font-sans ">
      <br/><br/>
      {/* Topbar */}
      <div className="max-w-5xl mx-auto flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-500 transition-colors"
        >
          ← Back
        </button>
        <nav className="flex items-center gap-1.5 text-xs text-gray-400">
          <span
            className="hover:text-gray-600 cursor-pointer"
            onClick={() => navigate("/blogs")}
          >
            Blog
          </span>
          <span className="opacity-40">/</span>
          <span className="text-gray-600 truncate max-w-sm">{blog.title}</span>
        </nav>
      </div>

      {/* Two-column layout */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_256px] gap-3 items-start">

        {/* ── LEFT ── */}
        <div className="flex flex-col gap-5">

          {/* Main article card */}
          <div className="bg-white border border-gray-100 rounded-md overflow-hidden">

            {/* Cover image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-6 lg:p-7">

              {/* Category + read time */}
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className={`text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border
                    ${catMeta.badgeBg} ${catMeta.badgeText} ${catMeta.badgeBorder}`}
                >
                  {blog.category || "General"}
                </span>
                <span className="text-[11px] text-gray-400">
                  {readTime(blog.description)} min read
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-[26px] font-semibold text-gray-900 leading-[1.3] mb-5">
                {blog.title}
              </h1>

              {/* Meta strip */}
              <div className="flex flex-wrap items-center gap-4 py-3.5 border-t border-b border-gray-100 mb-5 text-xs text-gray-400">
                <span className="flex items-center gap-2">
                  Posted by{" "}
                  <strong className="text-gray-700 font-medium">{blog.author || "Unknown"}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="3" width="12" height="12" rx="1.5"/>
                    <path d="M5 1v4M11 1v4M2 7h12"/>
                  </svg>
                  <strong className="text-gray-700 font-medium">{formatDate(blog.date)}</strong>
                </span>
              </div>

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Body */}
              <p className="text-[14px] text-gray-500 leading-[1.85] font-light">
                {blog.description}
              </p>
            </div>

            {/* Like + Share */}
            <div className="flex items-center gap-2 px-6 lg:px-7 py-3.5 border-t border-gray-100">
              <LikeButton postId={blog.id} />
              <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-500 transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="3" r="1.5"/>
                  <circle cx="4" cy="8" r="1.5"/>
                  <circle cx="12" cy="13" r="1.5"/>
                  <path d="M5.5 7l5-3M5.5 9l5 3"/>
                </svg>
                Share
              </button>
            </div>

            {/* Prev / Next */}
            <div className="grid grid-cols-2 gap-2.5 px-6 lg:px-7 py-4 border-t border-gray-100">
              <button
                onClick={() => prevBlog && navigate(`/blog/${prevBlog.id}`)}
                disabled={!prevBlog}
                className="flex flex-col gap-0.5 text-left px-3.5 py-2.5 border border-gray-200 rounded-sm bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <span className="text-[10px] uppercase tracking-wider  font-extrabold">← Previous</span>
                <span className="text-xs text-gray-600 font-medium truncate">
                  {prevBlog?.title || "No previous post"}
                </span>
              </button>
              <button
                onClick={() => nextBlog && navigate(`/blog/${nextBlog.id}`)}
                disabled={!nextBlog}
                className="flex flex-col gap-0.5 text-right items-end px-3.5 py-2.5 rounded-sm bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold text-center ">Next →</span>
                <span className="text-xs text-gray-200  truncate">
                  {nextBlog?.title || "No next post"}
                </span>
              </button>
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-7">
            <Comments postId={blog.id} postTitle={blog.title} />
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="flex flex-col gap-4 sticky top-6">

          {/* Author card — from blog data, no static text */}
          <div className="bg-white border border-gray-100 rounded-sm p-4">
            <p className="text-[10px] uppercase tracking-widest font-medium text-gray-400 mb-3">
              Author
            </p>
            <div className="flex gap-3 items-center">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ background: catMeta.badgeBg, color: catMeta.badgeText?.replace("text-", "") }}
              >
                {initials(blog.author)}
              </div>
              <p className="text-sm font-medium text-gray-800">{blog.author || "Unknown"}</p>
            </div>
          </div>

          {/* Categories — live from categoryUtils */}
          <div className="bg-white border border-gray-100 rounded-sm p-4">
            <p className="text-[10px] uppercase tracking-widest font-medium text-gray-400 mb-3">
              Categories
            </p>
            <ul className="space-y-0.5">
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  // onClick={() => navigate(`/blog?category=${cat.name}`)}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer text-xs transition-colors
                    ${blog.category === cat.name
                      ? " text-gray-900 font-medium"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: cat.dot }}
                    />
                    {cat.name}
                  </span>
                  <span className="text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full min-w-[22px] text-center">
                    {cat.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular posts — sorted by likes, current post excluded */}
          <div className="bg-white border border-gray-100 rounded-sm p-4">
            <p className="text-[10px] uppercase tracking-widest font-medium text-gray-400 mb-3">
              Popular posts
            </p>
            <div className="divide-y divide-gray-100">
              {popularPosts.map((b, i) => {
                const pMeta = getCategoryMeta(b.category);
                return (
                  <div
                    key={b.id}
                    onClick={() => navigate(`/blog/${b.id}`)}
                    className="flex gap-2.5 py-2.5 cursor-pointer group"
                  >
                    <span className="font-serif text-xl font-light text-gray-200 w-6 flex-shrink-0 leading-tight">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 group-hover:text-gray-900 leading-snug transition-colors mb-0.5 truncate">
                        {b.title}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[10px] font-medium"
                          style={{ color: pMeta.dot }}
                        >
                          {b.category}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}