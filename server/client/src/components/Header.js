import React from "react";
import { Navbar, Nav, Button, Dropdown, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
  //global state
  let isLogin = useSelector((state) => state.isLogin);
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
        <Navbar.Brand href={isLogin ? "/blogs" : "/"} className="text-white">
          Blog App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto justify-content-end flex-grow-1">
            {isLogin ? (
              <>
                <Link
                  to="/create-blog"
                  className="text-white"
                  style={{ textDecoration: "none", marginTop: "6px" }}
                >
                  <Nav.Link as={Link} to="/create-blog">
                    {
                      <Image
                        src={require("../create-blog.png")}
                        style={{
                          width: "30px", // Adjust size as needed
                          height: "30px",
                          objectFit: "contain",
                        }}
                      />
                    }
                  </Nav.Link>
                </Link>

                <Nav.Link>
                  <Link to="/user/all">
                    <Button variant="tertiary" className="text-white">
                      All Users
                    </Button>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="outline-light"
                      id="dropdown-user-toggle"
                      className="d-flex align-items-center"
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderColor: "#6c757d",
                        padding: "8px 16px",
                        borderRadius: "50px",
                      }}
                    >
                      👤
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      style={{
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Dropdown.Item
                        onClick={handleProfile}
                        className="d-flex align-items-center"
                        style={{ padding: "10px 20px" }}
                      >
                        <i
                          className="bi bi-person-circle"
                          style={{ marginRight: "10px" }}
                        ></i>
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Divider />

                      <Dropdown.Item
                        onClick={() => navigate("/my-blogs")}
                        className="d-flex align-items-center"
                        style={{ padding: "10px 20px" }}
                      >
                        <i
                          className="bi bi-person-circle"
                          style={{ marginRight: "10px" }}
                        ></i>
                        My-Blogs
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={handleLogout}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "10px 20px",
                        }}
                      >
                        <Button
                          variant="danger"
                          style={{ borderRadius: "50px" }}
                        >
                          Log Out
                        </Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Link>
              </>
            ) : (
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/login" className="text-white">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-white">
                  Register
                </Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
