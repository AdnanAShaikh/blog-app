import React from "react";
import { Navbar, Nav, Button, Dropdown, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
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
      {" "}
      <style type="text/css">
        {`
      .dropdown-item:focus,
      .dropdown-item:active {
        background-color: transparent !important;
        color: inherit;
      }
    `}
      </style>
      <Navbar expand="lg" bg="dark" className=" px-3">
        <Navbar.Brand href={isLogin ? "/blogs" : "/"} className="">
          Blog App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto justify-content-end flex-grow-1">
            {isLogin ? <></> : <></>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
