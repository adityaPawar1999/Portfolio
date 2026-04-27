import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
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
        username: username.trim() || "Anonymous", // ✅ new field
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
    <div className="mt-6">
  {/* Header */}
  <div className="flex items-center justify-between mb-5">
    <h3 className="text-sm font-extrabold text-gray-800 tracking-wide">
      Leave a Comment
    </h3>
    {!loading && (
      <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
        {comments.length} {comments.length === 1 ? "comment" : "comments"}
      </span>
    )}
  </div>

  {/* Form */}
  <form
    onSubmit={handleSubmit}
    className="mb-6 bg-white p-4 "
  >
    <input
      type="text"
      placeholder="Your name (optional)"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full mb-3 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
    />

    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
      />

      <button
        disabled={!text.trim() || submitting}
        className="px-4 py-2 text-xs font-medium rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-40 transition"
      >
        {submitting ? "..." : "Post"}
      </button>
    </div>
  </form>

  {/* List */}
  {loading ? (
    <p className="text-sm text-gray-400">Loading...</p>
  ) : comments.length === 0 ? (
    <div className="text-center py-8">
      <p className="text-sm text-gray-400">No comments yet</p>
      <p className="text-xs text-gray-300">Be the first to comment</p>
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
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
              {initials}
            </div>

            {/* Content */}
            <div className="flex-1 ">
              <div className="bg-gray-50 border border-gray-100 rounded-sm px-3 py-2">
                <p className="text-xs font-bold text-gray-800 mb-1">
                  {name} : <span className="text-gray-500 leading-relaxed font-medium"> {c.text}</span>
                </p>
                <p className="text-[10px] text-gray-400">
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