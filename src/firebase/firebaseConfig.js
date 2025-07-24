// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfdk1RMYqO-ybjx5qFnxn8RHVAm0TruT4",
  authDomain: "to-do-list-c909f.firebaseapp.com",
  projectId: "to-do-list-c909f",
  storageBucket: "to-do-list-c909f.firebasestorage.app",
  messagingSenderId: "596386384442",
  appId: "1:596386384442:web:5ef2662f93f326dfea4303",
  measurementId: "G-CR50ND8JFM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);