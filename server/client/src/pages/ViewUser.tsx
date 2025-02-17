import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header1 from "src/components/Header1";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { baseAPIUrl } from "src/utils/baseAPIUrl";
import { getCurrentUserImage } from "src/utils/currentUserImage";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import toast from "react-hot-toast";

interface Blog {
  _id: string;
  title: string;
  image: string;
  createdAt: string;
  user: string;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  image: any;
  blogs: Blog[];
  followers: string[];
  following: string[];
}

const ViewUser: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [value, setValue] = React.useState("1");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Used to get Image
  const userId = localStorage.getItem("userId");
  const fetchUser = async () => {
    const { data } = await axios.get(`${baseAPIUrl}/user/${userId}`);
    if (data?.success) {
      setUserData(data.user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // const handleFollow = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       `https://blog-app-2-5s8y.onrender.com/api/v1/user/follow/${name}`,
  //       { id: userId }
  //     );
  //     if (data.success) {
  //       setCurrentUser(data.myUser);
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.error("Error following user:", error);
  //   }
  // };

  // const handleUnFollow = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       `https://blog-app-2-5s8y.onrender.com/api/v1/user/unfollow/${name}`,
  //       { id: userId }
  //     );
  //     if (data.success) {
  //       setCurrentUser(data.myUser);
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.error("Error unfollowing user:", error);
  //   }
  // };

  // const weFollowHim = currentUser?.following?.includes(userData?._id || "");

  return (
    <>
      <Header1 />
      <div className="min-h-screen flex justify-center">
        <div className="flex w-[63%] ">
          <div className="w-3/4 border-r-2 pr-32 ">
            <div className="flex justify-between items-center pt-14">
              <p className="text-6xl ">{userData?.username}</p>
              <Button
                disableRipple
                sx={{
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                  "&:focus": {
                    color: "black",
                    boxShadow: "none",
                  },
                }}
                onClick={handleClick}
              >
                <MoreHorizIcon
                  className="hover:cursor-pointer text-gray-500 hover:text-black"
                  fontSize="large"
                />
              </Button>
              <Menu
                sx={{
                  ".MuiMenuItem-root": {
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                  },
                  "& .MuiMenu-paper": {
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
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
                <MenuItem
                  sx={{
                    color: "#6b6b6b",
                    "&:hover": {
                      backgroundColor: "transparent", // Remove hover background
                      color: "#000",
                    },
                  }}
                  className="flex w-full"
                >
                  <div
                    className="flex items-center gap-2"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      handleClose();
                      toast.success("Link Copied");
                    }}
                  >
                    <p>Copy Profile Link</p>
                  </div>
                </MenuItem>
              </Menu>
            </div>
            <div className="mt-10">
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChangeTab}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Home" value="1" />
                    <Tab label="About" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">Home</TabPanel>
                <TabPanel value="2">
                  <div className="bg-gray-100 mx-auto py-20 px-10 ">
                    <div className=" text-center flex-col gap-5">
                      <p className=" mb-5 text-lg">
                        Tell the world about yourself
                      </p>
                      <p>
                        Here’s where you can share more about yourself: your
                        history, work experience, accomplishments, interests,
                        dreams, and more. You can even add images and use rich
                        text to personalize your bio.
                      </p>
                      <button className="mt-7 border border-black rounded-full p-3 px-8 ">
                        Get Started
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-100 mt-10 h-px"></div>
                  <p className="text-green-700 mt-10">1 Following</p>
                </TabPanel>
              </TabContext>
            </div>
          </div>

          {/* 2nd screen */}
          <div className="pt-14">
            <div className="pl-10 flex flex-col gap-3 ">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img
                  className="object-cover"
                  src={getCurrentUserImage(userData)}
                  alt="user"
                />
              </div>
              <p className="font-medium">{userData?.username}</p>
              <p className="mt-5 text-green-700"> Edit Profile</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
