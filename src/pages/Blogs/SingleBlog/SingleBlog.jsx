// src/pages/SingleBlog.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogData from "../BlogData";
import Comments from "../../../components/Comments/Comments";
import LikeButton from "../../../components/LikeButton/LikeButton";
import { getCategoriesWithCount, getCategoryMeta } from "../Catorory/categoryUtils";
import { useTheme } from "../../../themes/ThemeContext";

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
  const { theme } = useTheme();

  const categories = getCategoriesWithCount();

  const currentIndex = blogData.findIndex((b) => b.id === parseInt(id));
  const blog = blogData[currentIndex];

  if (!blog) return <h2 className="p-6" style={{ color: theme.textMuted }}>Blog not found</h2>;

  const prevBlog = blogData[currentIndex - 1] || null;
  const nextBlog = blogData[currentIndex + 1] || null;

  const catMeta = getCategoryMeta(blog.category);

  // popular = top 3 by likes, excluding current post
  const popularPosts = [...blogData]
    .filter((b) => b.id !== blog.id)
    .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
    .slice(0, 3);

  return (
    
    <div style={{ minHeight: "100vh", backgroundColor: theme.bgPage, color: theme.textDark }} className="px-4 py-6 font-sans transition-colors duration-300">
      <br/><br/>
      {/* Topbar */}
      <div className="max-w-5xl mx-auto flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(-1)}
          style={{
            border: `1px solid ${theme.borderCard}`,
            backgroundColor: theme.bgCard,
            color: theme.textMuted,
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg hover:opacity-80 transition-colors"
        >
          ← Back
        </button>
        <nav className="flex items-center gap-1.5 text-xs" style={{ color: theme.textMuted }}>
          <span
            className="hover:opacity-80 cursor-pointer transition-opacity"
            style={{ color: theme.textMuted }}
            onClick={() => navigate("/blogs")}
          >
            Blog
          </span>
          <span className="opacity-40">/</span>
        </nav>
      </div>

      {/* Two-column layout */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_256px] gap-3 items-start">

        {/* ── LEFT ── */}
        <div className="flex flex-col gap-5">

          {/* Main article card */}
          <div style={{
            backgroundColor: theme.bgCard,
            border: `1px solid ${theme.borderCard}`,
            boxShadow: theme.glowGreen || theme.shadowLg,
          }} className="rounded-md overflow-hidden transition-colors duration-300">

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
                <span style={{ color: theme.textMuted }} className="text-[11px]">
                  {readTime(blog.description)} min read
                </span>
              </div>

              {/* Title */}
              <h1 style={{ color: theme.textDark }} className="font-serif text-[26px] font-semibold leading-[1.3] mb-5">
                {blog.title}
              </h1>

              {/* Meta strip */}
              <div style={{
                borderTopColor: theme.borderCard,
                borderBottomColor: theme.borderCard,
                color: theme.textMuted,
              }} className="flex flex-wrap items-center gap-4 py-3.5 border-t border-b mb-5 text-xs">
                <span className="flex items-center gap-2">
                  Posted by{" "}
                  <strong style={{ color: theme.textMid }} className="font-medium">{blog.author || "Unknown"}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="3" width="12" height="12" rx="1.5"/>
                    <path d="M5 1v4M11 1v4M2 7h12"/>
                  </svg>
                  <strong style={{ color: theme.textMid }} className="font-medium">{formatDate(blog.date)}</strong>
                </span>
              </div>

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: theme.bgHover,
                        borderColor: theme.borderCard,
                        color: theme.textMuted,
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-full border transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Body */}
              <p style={{ color: theme.textMid }} className="text-[14px] leading-[1.85] font-light"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
              />
            </div>

            {/* Like + Share */}
            <div style={{
              borderTopColor: theme.borderCard,
            }} className="flex items-center gap-2 px-6 lg:px-7 py-3.5 border-t transition-colors">
              <LikeButton postId={blog.id} />
              <button style={{
                border: `1px solid ${theme.borderCard}`,
                backgroundColor: theme.bgCard,
                color: theme.textMuted,
              }} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg hover:opacity-80 transition-colors">
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
            <div style={{
              borderTopColor: theme.borderCard,
            }} className="grid grid-cols-2 gap-2.5 px-6 lg:px-7 py-4 border-t transition-colors">
              <button
                onClick={() => prevBlog && navigate(`/blog/${prevBlog.id}`)}
                disabled={!prevBlog}
                style={{
                  border: `1px solid ${theme.borderCard}`,
                  backgroundColor: theme.bgCard,
                  color: theme.textMuted,
                }}
                className="flex flex-col gap-0.5 text-left px-3.5 py-2.5 rounded-sm hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <span style={{ color: theme.textDark }} className="text-[10px] uppercase tracking-wider font-extrabold">← Previous</span>
                <span className="hidden lg:inline text-xs font-medium truncate" style={{ color: theme.textMid }}>
                  {prevBlog?.title || "No previous post"}
                </span>
              </button>
              <button
                onClick={() => nextBlog && navigate(`/blog/${nextBlog.id}`)}
                disabled={!nextBlog}
                style={{
                  backgroundColor: theme.primary,
                  color: theme.textWhite,
                }}
                className="flex flex-col gap-0.5 text-right items-end px-3.5 py-2.5 rounded-sm hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <span style={{ color: theme.textWhite }} className="text-[10px] uppercase tracking-wider font-extrabold">Next →</span>
                <span className="hidden lg:inline text-xs truncate" style={{ color: theme.textWhite }}>
                  {nextBlog?.title || "No next post"}
                </span>
              </button>
            </div>
          </div>

          {/* Comments */}
          <div style={{
            backgroundColor: theme.bgCard,
            border: `1px solid ${theme.borderCard}`,
            boxShadow: theme.glowPink || theme.shadowLg,
          }} className="rounded-2xl p-6 lg:p-7 transition-colors">
            <Comments postId={blog.id} postTitle={blog.title} />
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="flex flex-col gap-4 sticky top-6">

          {/* Author card — from blog data, no static text */}
          <div style={{
            backgroundColor: theme.bgCard,
            border: `1px solid ${theme.borderCard}`,
            boxShadow: theme.glowOrange || theme.shadowSm,
          }} className="rounded-sm p-4 transition-colors">
            <p style={{ color: theme.textMuted }} className="text-[10px] uppercase tracking-widest font-medium mb-3">
              Author
            </p>
            <div className="flex gap-3 items-center">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ background: catMeta.badgeBg, color: catMeta.badgeText?.replace("text-", "") }}
              >
                {initials(blog.author)}
              </div>
              <p style={{ color: theme.textDark }} className="text-sm font-medium">{blog.author || "Unknown"}</p>
            </div>
          </div>

          {/* Categories — live from categoryUtils */}
          <div style={{
            backgroundColor: theme.bgCard,
            border: `1px solid ${theme.borderCard}`,
            boxShadow: theme.glowGreen || theme.shadowSm,
          }} className="rounded-sm p-4 transition-colors">
            <p style={{ color: theme.textMuted }} className="text-[10px] uppercase tracking-widest font-medium mb-3">
              Categories
            </p>
            <ul className="space-y-0.5">
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  style={{
                    color: blog.category === cat.name ? theme.textDark : theme.textMuted,
                    backgroundColor: blog.category === cat.name ? theme.bgHover : "transparent",
                  }}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer text-xs transition-colors hover:opacity-80"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: cat.dot }}
                    />
                    {cat.name}
                  </span>
                  <span style={{
                    backgroundColor: theme.bgHover,
                    color: theme.textMuted,
                  }} className="text-[10px] px-1.5 py-0.5 rounded-full min-w-[22px] text-center">
                    {cat.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular posts — sorted by likes, current post excluded */}
          <div style={{
            backgroundColor: theme.bgCard,
            border: `1px solid ${theme.borderCard}`,
            boxShadow: theme.glowPink || theme.shadowSm,
          }} className="rounded-sm p-4 transition-colors">
            <p style={{ color: theme.textMuted }} className="text-[10px] uppercase tracking-widest font-medium mb-3">
              Popular posts
            </p>
            <div style={{
              borderColor: theme.borderCard,
            }} className="divide-y">
              {popularPosts.map((b, i) => {
                const pMeta = getCategoryMeta(b.category);
                return (
                  <div
                    key={b.id}
                    onClick={() => navigate(`/blog/${b.id}`)}
                    className="flex gap-2.5 py-2.5 cursor-pointer group transition-opacity hover:opacity-80"
                  >
                    <span style={{ color: theme.textMuted }} className="font-serif text-xl font-light w-6 flex-shrink-0 leading-tight">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p style={{ color: theme.textMuted }} className="text-xs leading-snug group-hover:opacity-80 transition-opacity mb-0.5 truncate">
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