import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Face6 from "@mui/icons-material/Person";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { baseAPIUrl } from "../utils/baseAPIUrl";
import { User } from "../types/User";
import { getCurrentUserImage } from "src/utils/currentUserImage";

const Header1 = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createUrl = location.pathname === "/create";

  const [userData, setUserData] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      if (window.confirm("Do you want to Log Out? ")) {
        dispatch(authActions.logout());
        sessionStorage.removeItem("hasVisitedBefore");
        localStorage.removeItem("userId");
        window.location.reload();
        toast.success("Logged Out Successfully");
      } else {
        alert("You chose to remained Logged in...");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get User Data
  const user = JSON.parse(localStorage.getItem("user") || "");

  const fetchUser = async () => {
    const hasVisitedBefore = sessionStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      toast.success(`Welcome back ${user?.username}`);
      sessionStorage.setItem("hasVisitedBefore", "true");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2">
        {/* 1st section */}
        <div className="flex items-center gap-5">
          <h3
            className="font-extrabold hover:cursor-pointer tracking-tighter"
            onClick={() => {
              navigate("/");
            }}
            style={{ fontFamily: "Times New York", fontSize: "30px" }}
          >
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
        <div className="p-4 ">
          <div className="flex gap-3 items-center">
            {!createUrl && (
              <Link to="/create" className="mr-5">
                <p className="hover:cursor-pointer flex items-center gap-1">
                  <div className="flex items-center gap-1  ">
                    <p className="text-gray-600 hover:text-black">Write</p>
                  </div>
                </p>
              </Link>
            )}

            <p className="hover:cursor-pointer">
              <NotificationsNoneOutlinedIcon className="text-gray-600 hover:text-black" />
            </p>
            <div>
              <Button
                id="basic-button"
                disableRipple
                sx={{
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                }}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="w-8 h-8 rounded-full overflow-hidden"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden hover:opacity-80">
                  <img
                    src={getCurrentUserImage(user)}
                    alt="user"
                    className="w-full h-full"
                  />
                </div>
              </Button>
              <Menu
                sx={{
                  ".MuiMenuItem-root": {
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                  },
                  "& .MuiMenu-paper": {
                    width: "20rem",
                    paddingLeft: "1rem",
                    paddingRight: "2rem",
                    paddingTop: "1rem",
                    paddingBottom: "2rem",
                  },
                }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <div className="border-b-2">
                  <MenuItem
                    sx={{
                      color: "#6b6b6b",
                      "&:hover": {
                        backgroundColor: "transparent", // Remove hover background
                        color: "#000",
                      },
                    }}
                    onClick={() => {
                      navigate(`/user/${userData?.username}`);
                      handleClose();
                    }}
                    className="flex w-full"
                  >
                    <div className="flex items-center gap-2" onClick={() => {}}>
                      <Face6 /> <p>Profile</p>
                    </div>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      color: "#6b6b6b",
                      "&:hover": {
                        backgroundColor: "transparent", // Remove hover background
                        color: "#000",
                      },
                    }}
                    onClick={handleClose}
                  >
                    <div className="flex items-center gap-2 mt-3">
                      <BookmarksIcon /> <p>Library</p>
                    </div>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      color: "#6b6b6b",
                      "&:hover": {
                        backgroundColor: "transparent", // Remove hover background
                        color: "#000",
                      },
                    }}
                    onClick={handleClose}
                  >
                    <div className="flex items-center gap-2 mt-3 pb-4 ">
                      <AutoStoriesIcon /> <p>Stories</p>
                    </div>
                  </MenuItem>
                </div>
                <MenuItem
                  style={{
                    backgroundColor: "transparent", // Default background
                  }}
                  // sx={{
                  //   color: "#6b6b6b",
                  //   "&:hover": {
                  //     backgroundColor: "transparent", // Remove hover background
                  //     color: "#000",
                  //   },
                  // }}
                  onClick={() => {
                    handleLogout();
                    handleClose();
                  }}
                >
                  <div className="mt-5 focus:bg-transparent ">
                    <div className="flex items-center gap-2 ">
                      <LogoutIcon /> <p>Logout</p>
                    </div>
                  </div>
                </MenuItem>
              </Menu>
            </div>

            {/* <div onClick={handleProfile}>
              <p className="hover:cursor-pointer">profile</p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="w-full h-px -translate-y-2 bg-slate-200"></div>
    </>
  );
};

export default Header1;
