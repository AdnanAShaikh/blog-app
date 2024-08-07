import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
  //global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState();

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

  return (
    <Navbar className="px-3 ">
      <Navbar.Brand href={isLogin ? "/blogs" : "/"}>Blog App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {isLogin && (
          <Nav className="mx-auto ">
            <LinkContainer to="/blogs">
              <Nav.Link>Blogs</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/my-blogs">
              <Nav.Link>My Blogs</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/create-blog">
              <Nav.Link>Create Blog</Nav.Link>
            </LinkContainer>
          </Nav>
        )}
        <Nav className="ml-auto">
          {!isLogin && (
            <>
              <LinkContainer to="/login">
                <Button variant="outline-primary" className="m-1">
                  Login
                </Button>
              </LinkContainer>

              <LinkContainer to="/register">
                <Button variant="outline-primary" className="m-1">
                  Register
                </Button>
              </LinkContainer>
            </>
          )}

          {isLogin && (
            <Button
              variant="outline-danger"
              className="m-1"
              onClick={handleLogout}
            >
              LogOut
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
