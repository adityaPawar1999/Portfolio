// src/pages/Signup.js
import React, { useState } from 'react';
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Signup() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "users"), {
        name: name,
        createdAt: new Date(),
      });
      alert("Name stored successfully!");
      setName("");
    } catch (err) {
        console.error("Error storing name:", err); // Debug log
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Add Name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}