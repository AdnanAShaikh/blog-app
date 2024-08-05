import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS globally
import { Provider } from "react-redux";
import { store } from "./redux/store";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyB6M9LDvHoMKmEISv9ldzRDQO0VgRlxE98",
  authDomain: "blog-app-image-b8fdb.firebaseapp.com",
  projectId: "blog-app-image-b8fdb",
  storageBucket: "blog-app-image-b8fdb.appspot.com",
  messagingSenderId: "1009451851824",
  appId: "1:1009451851824:web:5e4a1c341a73fdcca64df5",
  measurementId: "G-B3DNMBB7YY",
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
