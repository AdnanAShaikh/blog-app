import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const SignInGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Access user information
      console.log(user);
      console.log(user.displayName, user.email, user.photoURL, user.uid);

      const { data } = await axios.post(
        "https://blog-app-2-5s8y.onrender.com/api/v1/user/google/login",
        {
          email: user.email,
          username: user.displayName,
          image: user.photoURL,
          password: user.uid,
        }
      );
      if (data.success) {
        dispatch(authActions.login());
        localStorage.setItem("userId", data.user._id);
        toast.success("User login Successfully");
        console.log(data);
        navigate("/blogs");
      }
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
