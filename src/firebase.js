// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABBy9rBzFxMI4mIiF1AtkVWADn0Fnv63Y",
  authDomain: "lingomoose-8968d.firebaseapp.com",
  projectId: "lingomoose-8968d",
  storageBucket: "lingomoose-8968d.appspot.com",
  messagingSenderId: "688036960184",
  appId: "1:688036960184:web:075ce9282901be54d9214d",
  measurementId: "G-E6J7GBVYHF"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();