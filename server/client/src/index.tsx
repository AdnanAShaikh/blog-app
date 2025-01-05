import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import firebase from "firebase/compat/app";

// Firebase configuration
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // If already initialized, use that one
}

// Get the root element
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  );

  // Report web vitals (optional)
} else {
  console.error("Root element not found!");
}
