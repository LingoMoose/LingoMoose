// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBheAcCHbs_sy5drBdRnq0f2A1IXJqX6gg",
  authDomain: "mimoville-56186.firebaseapp.com",
  projectId: "mimoville-56186",
  storageBucket: "mimoville-56186.appspot.com",
  messagingSenderId: "825137462592",
  appId: "1:825137462592:web:1eb8f9c1f752219c074ea5"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();