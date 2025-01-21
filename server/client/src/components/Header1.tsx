import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Header1 = () => {
  let isLogin = useSelector((state: any) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2">
        {/* 1st section */}
        <div className="flex items-center gap-5">
          <h3 className="font-bold" style={{ fontSize: "30px" }}>
            Medium
          </h3>
          <div className="flex items-center bg-slate-100 px-3 gap-5 py-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <input
              placeholder="Search"
              className="bg-slate-100 focus:outline-none"
            />
          </div>
        </div>

        {/* 2nd section */}
        <div className="p-4">
          <div className="flex gap-5">
            <Link to="/create-blog">
              <p className="hover:cursor-pointer">Write</p>
            </Link>
            <p className="hover:cursor-pointer">bell</p>
            <div onClick={handleProfile}>
              <p className="hover:cursor-pointer">profile</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px -translate-y-2 bg-slate-200"></div>
    </>
  );
};

export default Header1;
