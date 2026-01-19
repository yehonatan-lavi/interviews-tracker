// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX1scZu21UcP1yg53NNLORLR0lzyJgpWs",
  authDomain: "interviews-tracker-f3a1a.firebaseapp.com",
  projectId: "interviews-tracker-f3a1a",
  storageBucket: "interviews-tracker-f3a1a.firebasestorage.app",
  messagingSenderId: "569218529538",
  appId: "1:569218529538:web:f01df53317638924236a1b",
  measurementId: "G-2V0EYPQWMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);