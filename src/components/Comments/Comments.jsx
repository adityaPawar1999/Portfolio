// src/components/Comments/Comments.jsx
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

export default function Comments({ postId , postTitle  }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

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
      setComments(data);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      await addDoc(collection(db, "comments"), {
        text: text,
        postId: postId, // ✅ store id
        postTitle: postTitle, //
        createdAt: serverTimestamp()
      });

      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 border-t">
      <h3 className="font-bold mb-2">Comments</h3>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Write comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button className="bg-black text-white px-4 rounded">
          Post
        </button>
      </form>

      <div className="mt-4 space-y-2">
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-100 p-2 rounded">
            {c.text}
          </div>
        ))}
      </div>
    </div>
  );
}