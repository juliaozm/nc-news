// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const API_KEY = process.env.REACT_APP_API_KEY;
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "blog-48395.firebaseapp.com",
  projectId: "blog-48395",
  storageBucket: "blog-48395.appspot.com",
  messagingSenderId: "114581124770",
  appId: "1:114581124770:web:727f93864ad1466c4fc9fb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
