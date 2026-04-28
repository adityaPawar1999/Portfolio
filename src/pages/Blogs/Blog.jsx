// src/pages/Blog.jsx
import React from "react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import blogData from "./BlogData";
import { getCategoriesWithCount, getCategoryMeta } from "./Catorory/categoryUtils";
import { useTheme } from "../../themes/ThemeContext";

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
  const { theme } = useTheme();
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
    <>
    <br/>
    <div style={{ minHeight: "100vh", backgroundColor: theme.bgPage }} className="px-6 py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* ── Hero ── */}
        <div style={{ borderBottomColor: theme.borderCard }} className="mb-8 pb-8 border-b transition-colors">
          <p style={{ color: theme.textMuted }} className="text-xs tracking-widest uppercase font-medium mb-2">
            The dev journal
          </p>
          <h1 style={{ color: theme.textDark }} className="font-serif text-4xl font-semibold mb-2">
            Stories & insights
          </h1>
          <p style={{ color: theme.textMuted }} className="text-sm font-light leading-relaxed">
            Tutorials, opinions, and deep-dives from the engineering team.
          </p>
        </div>

        {/* ── Search + Sort ── */}
        <div className="flex items-center gap-3 mb-5 flex-wrap transition-colors">
          <div className="relative flex-1 min-w-[180px]">
            <svg
              style={{ color: theme.textMuted }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
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
              style={{
                backgroundColor: theme.bgCard,
                color: theme.textDark,
                borderColor: theme.borderCard,
              }}
              className="w-full pl-8 pr-3 py-2 text-sm border rounded-lg placeholder-gray-400 focus:outline-none transition-colors"
              onFocus={(e) => e.target.style.borderColor = theme.primary}
              onBlur={(e) => e.target.style.borderColor = theme.borderCard}
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              backgroundColor: theme.bgCard,
              color: theme.textMuted,
              borderColor: theme.borderCard,
            }}
            className="py-2 px-3 text-sm border rounded-lg cursor-pointer focus:outline-none transition-colors"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="popular">Most liked</option>
          </select>
        </div>

        {/* ── Category tabs ── */}
        <div style={{ borderBottomColor: theme.borderCard }} className="flex border-b mb-6 overflow-x-auto transition-colors">
          <button
            onClick={() => setActiveCategory("All")}
            style={{
              color: activeCategory === "All" ? theme.textDark : theme.textMuted,
              borderBottomColor: activeCategory === "All" ? theme.primary : "transparent",
            }}
            className="px-4 pb-2.5 pt-2 text-sm whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 font-medium"
          >
            All
            <span style={{ color: theme.textMuted }} className="text-[10px]">({blogData.length})</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              style={{
                color: activeCategory === cat.name ? theme.textDark : theme.textMuted,
                borderBottomColor: activeCategory === cat.name ? theme.primary : "transparent",
              }}
              className="px-4 pb-2.5 pt-2 text-sm whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 font-medium"
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
          <p style={{ color: theme.textMuted }} className="text-xs mb-4">
            {filtered.length} {filtered.length === 1 ? "post" : "posts"}
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>
        )}

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div style={{ color: theme.textMuted }} className="text-center py-16 text-sm">
            No posts match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-colors">
            {filtered.map((post) => {
              const meta = getCategoryMeta(post.category);

              return (
                <div
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.id}`)}
                  style={{
                    backgroundColor: theme.bgCard,
                    borderColor: theme.borderCard,
                    boxShadow: theme.glowMulti || theme.shadowLg,
                  }}
                  className="border rounded-xl overflow-hidden cursor-pointer hover:border-opacity-80 transition-all group"
                >
                  {/* Cover image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <h2 style={{ color: theme.textDark }} className="font-serif text-[15px] font-medium leading-snug mb-1.5 line-clamp-2">
                      {post.title} <span className={`text-[10px] font-bold uppercase tracking-wide px-3.5 py-1 rounded-full border
                        ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder}`}>   {post.category} </span>
                    </h2>
                    <p style={{ color: theme.textMuted }} className="text-[12px] font-light leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 px-4 pb-3">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            backgroundColor: theme.bgHover,
                            color: theme.textMuted,
                            borderColor: theme.borderCard,
                          }}
                          className="text-[10px] px-2 py-0.5 rounded-full border transition-colors"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{ borderTopColor: theme.borderCard }} className="flex items-center justify-between px-4 py-2.5 border-t transition-colors">
                    <span style={{ color: theme.textMuted }} className="text-[11px]">{post.author}</span>
                    <div className="flex items-center gap-2">
                      {post.likes != null && (
                        <span style={{ color: theme.textMuted }} className="flex items-center gap-1 text-[11px]">
                          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M8 13s-6-3.5-6-7.5A3.5 3.5 0 018 3a3.5 3.5 0 016 2.5C14 9.5 8 13 8 13z"/>
                          </svg>
                          {post.likes}
                        </span>
                      )}
                      <span style={{ color: theme.textMuted }} className="text-[11px]">{formatDate(post.date)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </>
  );
}