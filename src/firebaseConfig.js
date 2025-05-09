// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import getAuth

const firebaseConfig = {
  apiKey: "AIzaSyAJLOS71GunCkz46gnja9D8qlucCnynFTo",
  authDomain: "pulse-8e03a.firebaseapp.com",
  projectId: "pulse-8e03a",
  storageBucket: "pulse-8e03a.firebasestorage.app",
  messagingSenderId: "1086916968251",
  appId: "1:1086916968251:web:6fc49bac26af5b8faf011e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { db, auth };