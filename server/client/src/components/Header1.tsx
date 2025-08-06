import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Face6 from "@mui/icons-material/Person";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { getCurrentUserImage } from "src/utils/currentUserImage";
import { Modal, Typography, useMediaQuery } from "@mui/material";

const Header1 = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLaptopScreen = useMediaQuery("(min-width:1024px)");
  const isTabletScreen = useMediaQuery("(min-width:720px)");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const createUrl = location.pathname === "/create";

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
      setIsLogoutModalOpen(false);
      dispatch(logout());
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
      {/* Logout Modal */}

      <Modal
        open={isLogoutModalOpen}
        onClose={() => {
          setIsLogoutModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="w-5/12 absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow">
          <div className="p-5">
            <Typography className="mt-" variant="h5" component="h2">
              Are you sure you want to logout?
            </Typography>
            <div className="flex items-center justify-end gap-5">
              <Button
                sx={{ backgroundColor: "black", color: "white" }}
                variant="text"
                onClick={() => {
                  setIsLogoutModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                sx={{ backgroundColor: "black", color: "white" }}
                variant="contained"
                onClick={handleLogout}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="flex justify-between px-10 items-center">
        {/* 1st section */}
        <div className="flex items-center justify-end gap-5">
          <h3
            className="font-extrabold hover:cursor-pointer tracking-tighter "
            onClick={() => {
              navigate("/");
            }}
            style={{ fontFamily: "Times New York", fontSize: "35px" }}
          >
            Medium
          </h3>
          {/* <div className="flex items-center bg-slate-100 px-3 gap-5 py-2 rounded-full">
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
          </div> */}
        </div>

        {/* 2nd section */}
        <div className="">
          <div className="flex gap-3 items-center">
            {!createUrl && isTabletScreen && (
              <Link to="/create" className="mr-4">
                <p className="hover:cursor-pointer flex items-center gap-1">
                  <div className="flex items-center gap-1  ">
                    <p className="text-gray-600 hover:text-black">Write</p>
                  </div>
                </p>
              </Link>
            )}
            <Link to="/notification">
              <p className="hover:cursor-pointer">
                {location.pathname === "/notification" ? (
                  <NotificationsRoundedIcon />
                ) : (
                  <NotificationsNoneRoundedIcon />
                )}
              </p>
            </Link>
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
                    width: isTabletScreen ? "20rem" : "14rem",
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
                <div className="border-b-1">
                  <MenuItem
                    sx={{
                      color: "#6b6b6b",
                      "&:hover": {
                        backgroundColor: "transparent", // Remove hover background
                        color: "#000",
                      },
                    }}
                    onClick={() => {
                      navigate(`/user/${user?.usernameAt}`);
                    }}
                    className="flex w-full"
                  >
                    <div className="flex items-center gap-2">
                      <Face6 /> <p>Profile</p>
                    </div>
                  </MenuItem>
                  {!isLaptopScreen && !isTabletScreen && (
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
                      <Link to="/create" className="mr-4">
                        <p className="hover:cursor-pointer flex items-center gap-1">
                          <div className="flex items-center gap-1  ">
                            <p className="text-gray-600 hover:text-black">
                              Write
                            </p>
                          </div>
                        </p>
                      </Link>
                    </MenuItem>
                  )}

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
                    backgroundColor: "transparent",
                  }}
                  onClick={() => {
                    setIsLogoutModalOpen(true);
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
      <div className="w-full h-px bg-slate-200"></div>
    </>
  );
};

export default Header1;
