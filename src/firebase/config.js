// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAX38JodEJREqH99j4qSIztRppRE4XgNgs",
  authDomain: "jl-foundation.firebaseapp.com",
  projectId: "jl-foundation",
  storageBucket: "jl-foundation.firebasestorage.app",
  messagingSenderId: "383243671949",
  appId: "1:383243671949:web:9810f5e644ff99e281c5c4",
  measurementId: "G-X0MSCZKX3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const db = getFirestore(app);
const auth = getAuth(app); // 2. Initialize Auth instance

// 3. Export both named variables clearly so other pages can consume them
export { db, auth };