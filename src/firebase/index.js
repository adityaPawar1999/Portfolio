// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ important

const firebaseConfig = {
  apiKey: "AIzaSyCiYutsnn95UIlOILOpc_xJ3lj-MaOyTbk",
  authDomain: "portfolio-6d30e.firebaseapp.com",
  projectId: "portfolio-6d30e",
  storageBucket: "portfolio-6d30e.firebasestorage.app",
  messagingSenderId: "442405757275",
  appId: "1:442405757275:web:415da39b67725dc2ed3a7e",
  measurementId: "G-3SWNF8D3XM"
};

const app = initializeApp(firebaseConfig);

// ✅ Firestore init
export const db = getFirestore(app);