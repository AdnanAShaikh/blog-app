import { useState } from "react";
import { authActions } from "../redux/store";
import axios from "axios";
import toast from "react-hot-toast";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Landing = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  let isLogin = useSelector((state: any) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      if (window.confirm("Do you want to Log Out?")) {
        dispatch(authActions.logout());
        toast.success("Logout Successfully");

        navigate("/login");
        localStorage.clear();
        await axios.get(
          "https://blog-app-2-5s8y.onrender.com/api/v1/user/logout"
        );
      } else {
        alert("You chose to remained Logged in...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userId = localStorage.getItem("userId");

  function handleProfile() {
    let name = "";
    const getUserName = async () => {
      const { data } = await axios.get(
        `https://blog-app-2-5s8y.onrender.com/api/v1/user/id/${userId}`
      );
      if (data.success) {
        console.log("this user", data);
        name = data.user;
        navigate(`/user/${name}`);
      }
    };
    getUserName();
  }

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
        console.log("Success");
        console.log(data);
        navigate("/blogs");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }
  return (
    <>
      <div
        className={`bg-primary min-h-screen flex flex-col ${
          isSignUpModalOpen || isSignInModalOpen ? "opacity-5" : ""
        }`}
      >
        <div>
          <div className="w-full flex justify-between px-[5%] lg:px-[15%] py-3 pt-6 items-center">
            <h1 className="text-3xl hover:cursor-pointer max-lg:text-xl">
              Blog-App
            </h1>
            <div className="flex items-center gap-7">
              <p className="hover:cursor-pointer hover:underline max-md:hidden">
                Our Story
              </p>
              <p className="hover:cursor-pointer hover:underline max-md:hidden">
                Write
              </p>
              <p
                className="hover:cursor-pointer hover:underline max-sm:hidden"
                onClick={() => {
                  setIsSignInModalOpen(true);
                }}
              >
                Sign in
              </p>
              <button
                onClick={() => {
                  setIsSignUpModalOpen(true);
                }}
                className="bg-black p-2 px-4 hover:opacity-60 rounded-3xl text-white"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-px mt-2 bg-black"></div>
        {/* Main Content */}
        <main className="flex-grow flex justify-center items-center pt-1">
          <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-start pl-[5%] lg:pl-[15%] gap-10">
            {/* Text Section */}
            <div className="flex flex-col items-start max-w-3xl lg:text-left pt-10">
              <p
                className="mb-5 text-10xl max-lg:text-7xl"
                style={{ lineHeight: 1 }}
              >
                Human
                <br /> Stories & Ideas
              </p>
              <p className="text-lg mb-10">
                A place to read, write, and deepen your understanding
              </p>
              <button className="bg-black text-xl p-2 px-10 hover:opacity-60 rounded-3xl text-white">
                Start Reading
              </button>
            </div>
            {/* Image Section */}
            <div className="w-1/4  max-lg:hidden overflow-hidden ">
              <img
                alt="landing-image"
                src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
                className="object-cover"
              />
            </div>
          </div>
        </main>
        {/* Footer */}

        <div className="w-full h-px bg-black max-md:hidden"></div>

        <footer className="max-md:bg-black max-md:text-white py-6 ">
          <div className="flex justify-center px-3">
            <div className="flex gap-3">
              <p className="hover:cursor-pointer">Help</p>
              <p className="hover:cursor-pointer">About</p>
              <p className="hover:cursor-pointer">Blog</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Sign Up Modal */}
      {isSignUpModalOpen && (
        <div className="fixed inset-0 md:inset-x-[30%] md:inset-y-10 md:shadow-xl z-30 flex flex-col justify-center items-center bg-white   max-md:h-full ">
          <div
            className="absolute top-5 right-5 p-1 text-2xl cursor-pointer"
            onClick={() => {
              setIsSignUpModalOpen(false);
            }}
          >
            ✖
          </div>
          <div className=" flex flex-col justify-center h-full max-w-[400px] lg:max-w-[600px] max-md:px-[44px] max-md:py-[56px]">
            <div className=" flex flex-col smd:justify-evenly justify-center  h-full  text-center ">
              <div>
                <div>
                  <h1 className="text-3xl">Join Medium</h1>
                </div>
                <div className="md:mt-20 mt-10">
                  <div
                    onClick={googleLogin}
                    className="border border-black px-4 py-2 rounded-3xl my-5 cursor-pointer"
                  >
                    <h1 className="text-xl   ">Sign up with Google</h1>
                  </div>
                  <div className="border border-black px-4 py-2 rounded-3xl my-5 cursor-pointer">
                    <h1 className="text-xl ">Sign up with Email</h1>
                  </div>
                </div>
              </div>
              <div className=" font-medium md:text-2xl mt-5">
                <span>Already have an account? </span>
                <span
                  className="text-green-700 font-extrabold cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSignUpModalOpen(false);
                    setIsSignInModalOpen(true);
                  }}
                >
                  Sign in
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* sign in Modal */}
      {isSignInModalOpen && (
        <div className="fixed inset-0 md:inset-x-[30%] md:inset-y-10 md:shadow-xl max-md:h-full z-30 flex flex-col justify-center items-center bg-white   ">
          <div
            className="absolute top-5 right-5 p-1 text-2xl cursor-pointer"
            onClick={() => {
              setIsSignInModalOpen(false);
            }}
          >
            ✖
          </div>
          <div className=" flex flex-col justify-center h-full max-w-[400px] lg:min-w-[326px] max-md:px-[44px] max-md:py-[56px]">
            <div className=" flex flex-col smd:justify-evenly justify-center  h-full  text-center ">
              <div>
                <div>
                  <h1 className="text-3xl">Welcome back.</h1>
                </div>
                <div className="md:mt-20 mt-10">
                  <div
                    onClick={googleLogin}
                    className="border border-black px-4 py-2 rounded-3xl my-5 cursor-pointer"
                  >
                    <h1 className="text-xl ">Sign in with Google</h1>
                  </div>
                  <div className="border border-black px-4 py-2 rounded-3xl my-5 cursor-pointer">
                    <h1 className="text-xl ">Sign in with Email</h1>
                  </div>
                </div>
              </div>
              <div className=" font-medium md:text-2xl mt-5">
                <span>No account? </span>
                <span
                  className="text-green-700 font-extrabold cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSignInModalOpen(false);
                    setIsSignUpModalOpen(true);
                  }}
                >
                  Create one
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
