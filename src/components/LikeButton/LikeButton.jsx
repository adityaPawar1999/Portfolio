import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "firebase/firestore";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const ref = doc(db, "likes", String(postId));
      const snap = await getDoc(ref);
      if (snap.exists()) setLikes(snap.data().count);
    };

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
        await updateDoc(ref, { count: increment(1) });
      } else {
        await setDoc(ref, { count: 1, postId });
      }

      setLikes((prev) => prev + 1);
      setLiked(true);
      localStorage.setItem(`liked_${postId}`, "true");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-4 flex items-center gap-2">
      <button
        onClick={handleLike}
        className="flex items-center gap-2 px-3 py-1  hover:bg-gray-100 transition"
      >
        {/* Icon Switch */}
        {liked ? (
          <FavoriteIcon className="text-red-500" />
        ) : (
          <FavoriteBorderIcon className="text-black" />
        )}

        {/* Count */}
        <span className="font-medium">{likes} Likes</span>
      </button>
    </div>
  );
}