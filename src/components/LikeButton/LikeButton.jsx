// src/components/LikeButton.jsx

import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "firebase/firestore";

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const ref = doc(db, "likes", String(postId));
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setLikes(snap.data().count);
      }
    };

    // check localStorage
    const stored = localStorage.getItem(`liked_${postId}`);
    if (stored) setLiked(true);

    fetchLikes();
  }, [postId]);

  const handleLike = async () => {
    if (liked) return;

    const ref = doc(db, "likes", String(postId));

    try {
      const snap = await getDoc(ref);

      if (snap.exists()) {
        await updateDoc(ref, {
          count: increment(1)
        });
      } else {
        await setDoc(ref, {
          count: 1,
          postId: postId
        });
      }

      setLikes((prev) => prev + 1);
      setLiked(true);
      localStorage.setItem(`liked_${postId}`, "true");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleLike}
        className={`px-4 py-2 rounded ${
          liked ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
      >
        ❤️ {likes}
      </button>
    </div>
  );
}