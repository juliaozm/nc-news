// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const API_KEY = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "nc-news-juliaozm.firebaseapp.com",
  projectId: "nc-news-juliaozm",
  storageBucket: "nc-news-juliaozm.appspot.com",
  messagingSenderId: "925768717564",
  appId: "1:925768717564:web:e90785f1da34b7ff827379",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
