import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./redux/store";
import firebase from "@firebase/app-compat";
import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DoneIcon from "@mui/icons-material/Done";
// fonts
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { PersistGate } from "redux-persist/integration/react";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID, // Fix this line
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
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              icon: <DoneIcon className="text-green-600" />,
              style: {
                color: "#007200",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                border: "2px solid #007200",
              },
            },
            error: {
              icon: <ErrorOutlineIcon className="text-red-500" />,
              style: {
                color: "#c1121f",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                border: "2px solid #c1121f",
              },
            },
          }}
        />
        <ThemeProvider theme={customTheme}>
          <BrowserRouter>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );

  // Report web vitals (optional)
} else {
  console.error("Root element not found!");
}
