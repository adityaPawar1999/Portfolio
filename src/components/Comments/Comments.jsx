import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useTheme } from "../../themes/ThemeContext";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

export default function Comments({ postId, postTitle }) {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("postId", "==", postId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by createdAt descending in JavaScript
      data.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() || 0;
        const timeB = b.createdAt?.toMillis?.() || 0;
        return timeB - timeA;
      });
      setComments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);

    try {
      await addDoc(collection(db, "comments"), {
        text: text.trim(),
        username: username.trim() || "Anonymous",
        postId,
        postTitle,
        createdAt: serverTimestamp()
      });

      setText("");
      setUsername("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <div className="mt-6 transition-colors duration-300">
  {/* Header */}
  <div className="flex items-center justify-between mb-5">
    <h3 style={{ color: theme.textDark }} className="text-sm font-extrabold tracking-wide">
      Leave a Comment
    </h3>
    {!loading && (
      <span style={{
        color: theme.textMuted,
        backgroundColor: theme.bgHover,
        borderColor: theme.borderCard,
      }} className="text-[11px] px-2 py-0.5 rounded-full border">
        {comments.length} {comments.length === 1 ? "comment" : "comments"}
      </span>
    )}
  </div>

  {/* Form */}
  <form
    onSubmit={handleSubmit}
    style={{
      backgroundColor: theme.bgCard,
      borderColor: theme.borderCard,
      boxShadow: theme.glowGreen || theme.shadow,
    }}
    className="mb-6 p-4 border rounded-lg transition-colors"
  >
    <input
      type="text"
      placeholder="Your name (optional)"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      style={{
        color: theme.textDark,
        backgroundColor: theme.bgPage,
        borderColor: theme.borderCard,
      }}
      className="w-full mb-3 px-3 py-2 text-sm border rounded-lg focus:outline-none transition-colors"
      onFocus={(e) => e.target.style.borderColor = theme.primary}
      onBlur={(e) => e.target.style.borderColor = theme.borderCard}
    />

    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          color: theme.textDark,
          backgroundColor: theme.bgPage,
          borderColor: theme.borderCard,
        }}
        className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none transition-colors"
        onFocus={(e) => e.target.style.borderColor = theme.primary}
        onBlur={(e) => e.target.style.borderColor = theme.borderCard}
      />

      <button
        disabled={!text.trim() || submitting}
        style={{
          backgroundColor: theme.primary,
          color: theme.textWhite,
        }}
        className="px-4 py-2 text-xs font-medium rounded-lg hover:opacity-80 disabled:opacity-40 transition"
      >
        {submitting ? "..." : "Post"}
      </button>
    </div>
  </form>

  {/* List */}
  {loading ? (
    <p style={{ color: theme.textMuted }} className="text-sm">Loading...</p>
  ) : comments.length === 0 ? (
    <div className="text-center py-8">
      <p style={{ color: theme.textMuted }} className="text-sm">No comments yet</p>
      <p style={{ color: theme.textMuted }} className="text-xs opacity-70">Be the first to comment</p>
    </div>
  ) : (
    <div className="space-y-2">
      {comments.map((c) => {
        const name = c.username || "Anonymous";
        const initials = name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        const date = c.createdAt?.toDate();
        const formattedDate = date
          ? date.toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short"
        })
          : "Just now";

        return (
          <div key={c.id} className="flex gap-3">
            {/* Avatar */}
            <div style={{
              backgroundColor: theme.primary,
              color: theme.textWhite,
            }} className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
              {initials}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div style={{
                backgroundColor: theme.bgHover,
                borderColor: theme.borderCard,
                boxShadow: theme.glowMulti || theme.shadowSm,
              }} className="border rounded-sm px-3 py-2 transition-colors">
                <p style={{ color: theme.textDark }} className="text-xs font-bold mb-1">
                  {name} : <span style={{ color: theme.textMuted }} className="leading-relaxed font-medium"> {c.text}</span>
                </p>
                <p style={{ color: theme.textMuted }} className="text-[10px]">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>
    
    </>
  );
}