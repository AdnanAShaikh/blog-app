import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  async function googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Access user information
      console.log(user.displayName, user.email, user.photoURL);

      await axios.post(
        "https://blog-app-2-u2io.onrender.com/api/v1/user/login",
        {
          email: user.email,
        }
      );

      // Handle user data and redirect or dispatch actions as needed
      // For example:
      // dispatch(setUserData(user)); // Assuming a setUserData action in Redux
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }
  return (
    <div>
      <p></p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={require("../google-signin-button.png")} width={"40%"} />
      </div>
    </div>
  );
};

export default SignInGoogle;
