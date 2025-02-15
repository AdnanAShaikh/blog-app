import { useEffect, useState } from "react";
import { authActions } from "../redux/store";
import axios from "axios";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { SyncLoader } from "react-spinners";
import GoogleIcon from "@mui/icons-material/Google";

import { baseAPIUrl } from "src/utils/baseAPIUrl";

const Landing = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  async function googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Access user information
      console.log(user);
      console.log(user.displayName, user.email, user.photoURL, user.uid);

      setIsLoading(true);

      const { data } = await axios.post(`${baseAPIUrl}/user/google/login`, {
        email: user.email,
        username: user.displayName,
        image: user.photoURL,
        password: user.uid,
      });
      if (data.success) {
        setIsLoading(false);
        dispatch(authActions.login());
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("userImage", JSON.stringify(user.photoURL));

        window.location.reload();
      }
    } catch (error) {
      setIsLoading(false);

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
            <h1
              style={{ fontFamily: "Times New York" }}
              className="text-4xl font-bold tracking-tight font-serif hover:cursor-pointer max-lg:text-xl"
            >
              Medium
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
          <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-start pl-[5%] lg:pl-[15%] gap-10 py-5">
            {/* Text Section */}
            <div className="flex flex-col items-start max-w-3xl lg:text-left pt-10">
              <p
                className="mb-5 tracking-tighter text-10xl max-lg:text-7xl"
                style={{ lineHeight: 1 }}
              >
                Human
                <br /> <div>Stories & Ideas</div>
              </p>
              <p className="text-lg mb-10">
                A place to read, write, and deepen your understanding
              </p>
              <button className="bg-black text-xl p-2 px-10 hover:opacity-60 rounded-3xl text-white">
                Start Reading
              </button>
            </div>
            {/* Image Section */}
            <div className="w-1/2 xl:w-1/4  max-lg:hidden overflow-hidden ">
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
          <div className="bg-opacity-60 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <SyncLoader loading={isLoading} />
          </div>
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
                    className="border border-black px-4 py-2 rounded-3xl my-5 cursor-pointer flex justify-center gap-4 items-center"
                  >
                    <GoogleIcon className="-translate-x-2" />{" "}
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
                  className="text-green-700 font-thin cursor-pointer"
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
          <div className="bg-opacity-60 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <SyncLoader loading={isLoading} />
          </div>
          <button
            className="absolute top-5 right-5 p-1 text-2xl cursor-pointer"
            disabled={isLoading}
            onClick={() => {
              setIsSignInModalOpen(false);
            }}
          >
            ✖
          </button>
          <div className=" flex flex-col justify-center h-full max-w-[400px] lg:min-w-[326px] max-md:px-[44px] max-md:py-[56px]">
            <div className=" flex flex-col smd:justify-evenly justify-center  h-full  text-center ">
              <div>
                <div>
                  <h1 className="text-3xl">Welcome back.</h1>
                </div>
                <div className="md:mt-20 mt-10">
                  <div
                    onClick={googleLogin}
                    className="border border-black px-4 py-2 rounded-3xl my-5 cursor-pointer flex justify-center gap-4 items-center"
                  >
                    <GoogleIcon className="-translate-x-2" />{" "}
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
                  className="text-green-700 font-thin cursor-pointer"
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
