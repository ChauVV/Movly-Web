import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvYKwcexPGReUNJBfxyzZvfUzd6hGoJcE",
  authDomain: "movly-c7f77.firebaseapp.com",
  projectId: "movly-c7f77",
  storageBucket: "movly-c7f77.firebasestorage.app",
  messagingSenderId: "467926959703",
  appId: "1:467926959703:web:099c4959980d2dcb890512"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
