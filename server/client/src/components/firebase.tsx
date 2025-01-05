// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6M9LDvHoMKmEISv9ldzRDQO0VgRlxE98",
  authDomain: "blog-app-image-b8fdb.firebaseapp.com",
  projectId: "blog-app-image-b8fdb",
  storageBucket: "blog-app-image-b8fdb.appspot.com",
  messagingSenderId: "1009451851824",
  appId: "1:1009451851824:web:5e4a1c341a73fdcca64df5",
  measurementId: "G-B3DNMBB7YY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export default app;
