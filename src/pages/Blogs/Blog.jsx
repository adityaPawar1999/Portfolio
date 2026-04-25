// src/pages/Blog.jsx
import React from "react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import blogData from "./BlogData";
import { getCategoriesWithCount, getCategoryMeta } from "./Catorory/categoryUtils";

function initials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Blog() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const categories = getCategoriesWithCount();

  const filtered = useMemo(() => {
    let posts = [...blogData];

    if (activeCategory !== "All")
      posts = posts.filter((p) => p.category === activeCategory);

    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sort === "newest")
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sort === "oldest")
      posts.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (sort === "popular")
      posts.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));

    return posts;
  }, [activeCategory, search, sort]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* ── Hero ── */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <p className="text-xs tracking-widest uppercase text-gray-400 font-medium mb-2">
            The dev journal
          </p>
          <h1 className="font-serif text-4xl font-semibold text-gray-900 mb-2">
            Stories & insights
          </h1>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            Tutorials, opinions, and deep-dives from the engineering team.
          </p>
        </div>

        {/* ── Search + Sort ── */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
              viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
            >
              <circle cx="6.5" cy="6.5" r="4" />
              <path d="M11 11l3 3" />
            </svg>
            <input
              type="text"
              placeholder="Search posts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="py-2 px-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-500 cursor-pointer focus:outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="popular">Most liked</option>
          </select>
        </div>

        {/* ── Category tabs ── */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 pb-2.5 pt-2 text-sm whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5
              ${activeCategory === "All"
                ? "border-gray-900 text-gray-900 font-medium"
                : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
          >
            All
            <span className="text-[10px] text-gray-400">({blogData.length})</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-4 pb-2.5 pt-2 text-sm whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5
                ${activeCategory === cat.name
                  ? "border-gray-900 text-gray-900 font-medium"
                  : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: cat.dot }}
              />
              {cat.name}
            </button>
          ))}
        </div>

        {/* ── Result count ── */}
        {filtered.length > 0 && (
          <p className="text-xs text-gray-400 mb-4">
            {filtered.length} {filtered.length === 1 ? "post" : "posts"}
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>
        )}

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No posts match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((post) => {
              const meta = getCategoryMeta(post.category);

              return (
                <div
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all group"
                >
                  {/* Cover image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <span
                      className={`absolute top-3 left-3 text-[10px] font-medium uppercase tracking-wide px-2.5 py-0.5 rounded-full border
                        ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder}`}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <h2 className="font-serif text-[15px] font-medium text-gray-900 leading-snug mb-1.5 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-[12px] text-gray-400 font-light leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 px-4 pb-3">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-400 border border-gray-100"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100">
                    <span className="text-[11px] text-gray-400">{post.author}</span>
                    <div className="flex items-center gap-2">
                      {post.likes != null && (
                        <span className="flex items-center gap-1 text-[11px] text-gray-300">
                          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M8 13s-6-3.5-6-7.5A3.5 3.5 0 018 3a3.5 3.5 0 016 2.5C14 9.5 8 13 8 13z"/>
                          </svg>
                          {post.likes}
                        </span>
                      )}
                      <span className="text-[11px] text-gray-300">{formatDate(post.date)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}