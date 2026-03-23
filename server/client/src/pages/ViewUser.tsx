import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header1 from "src/components/Header1";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Menu, MenuItem, Modal, TextField } from "@mui/material";
import { baseAPIUrl } from "src/utils/baseAPIUrl";
import { getCurrentUserImage } from "src/utils/currentUserImage";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import toast from "react-hot-toast";
import BlogCard from "src/components/BlogCard";
import { User } from "src/types/User";
axios.defaults.withCredentials = true;

const ViewUser: React.FC = () => {
  const navigate = useNavigate();
  const { usernameAt } = useParams();
  const localUser = JSON.parse(localStorage.getItem("user") || "");
  const localUsernameAt = localUser.usernameAt;
  const [isUser, setIsUser] = useState<Boolean | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
  const [getStarted, setGetStarted] = useState(true);
  const [isEditButtonVisible, setIsEditButtonVisible] = useState(true);
  const [bioText, setBioText] = useState<any>();
  const [originalBioText, setOriginalBioText] = useState("");
  const [value, setValue] = React.useState("1");
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [formData, setFormData] = useState({
    username: "",
    shortBio: "",
  });
  const [originalFormData, setOriginalFormData] = useState<any | null>(null);
  const maxWords = 160;
  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get(`${baseAPIUrl}/user/current`, {
        withCredentials: true,
      });
      if (data?.success) {
        console.log("User:", data);
        setCurrentUserData(data?.user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // get user from usernameAt
  const fetchUser = async () => {
    const { data } = await axios.get(`${baseAPIUrl}/user/name/${usernameAt}`);
    if (data?.success) {
      setIsUser(data?.user?.usernameAt === localUsernameAt);
      setUserData(data?.user);
      setFormData({
        shortBio: data?.user?.shortBio,
        username: data?.user.username,
      });
      setOriginalFormData({
        username: data.user.username,
        shortBio: data.user.shortBio,
      });
      if (data?.user?.bio && data?.user?.bio !== "") {
        setBioText(data?.user?.bio);
        setOriginalBioText(data?.user?.bio);
        setGetStarted(false);
      }
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCurrentUser();
  }, [usernameAt]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditProfileModal = () => {
    setIsEditProfileModalVisible(false);
  };

  const handleShortBio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const wordCount = inputText.length;

    if (wordCount > maxWords) return;

    setFormData((prev) => ({
      ...prev,
      shortBio: inputText,
    }));
  };

  const handleFollow = async () => {
    try {
      const { data } = await axios.post(`${baseAPIUrl}/user/follow`, {
        toUserId: userData?._id,
        fromUserId: currentUserData?._id,
      });
      if (data?.success) {
        const audio = new Audio("/sounds/mixkit-message-pop-alert-2354.mp3"); // Path to your sound file
        audio.play();
        setCurrentUserData(data?.myUser);
        fetchCurrentUser();
        fetchUser();
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const getStartedJSX = (
    <div className="bg-gray-100 mx-auto py-20 px-10 ">
      <div className=" text-center flex-col gap-5">
        <p className=" mb-5 text-lg">Tell the world about yourself</p>
        <p>
          Here’s where you can share more about yourself: your history, work
          experience, accomplishments, interests, dreams, and more. You can even
          add images and use rich text to personalize your bio.
        </p>
        <button
          onClick={() => {
            setGetStarted(false);
            setIsEditButtonVisible(false);
          }}
          className="mt-7 border border-black rounded-full p-3 px-8 "
        >
          Get Started
        </button>
      </div>
    </div>
  );

  const TextFieldJSX = (
    <div className="mx-auto min-h-44 ">
      <TextField
        value={bioText}
        onChange={(e) => setBioText(e.target.value)}
        multiline
        autoFocus
        slotProps={{
          input: {
            readOnly: isUser ? (isEditButtonVisible ? true : false) : true,
          },
        }}
        sx={{
          "& .MuiInput-underline:before": {
            borderBottom: "none",
          },
          "& .MuiInput-underline:after": {
            borderBottom: "none",
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "none",
          },
        }}
        variant="standard"
        className="text-black w-full "
      />

      {isUser &&
        (isEditButtonVisible ? (
          <div className="flex justify-end mt-5">
            <button
              onClick={() => {
                setIsEditButtonVisible(false);
              }}
              className="rounded-3xl border border-black hover:bg-slate-50 px-6 py-2"
            >
              Edit
            </button>
          </div>
        ) : (
          <div className=" flex justify-end items-center gap-3 mt-5">
            <button
              onClick={async (e) => {
                e.stopPropagation();
                setBioText(originalBioText);
                setGetStarted(originalBioText === "");
                setIsEditButtonVisible(true);
              }}
              className="rounded-3xl border border-black hover:bg-slate-50 px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                await axios.patch(`${baseAPIUrl}/user/patch`, {
                  bio: bioText,
                  userId: userData?._id,
                });
                setOriginalBioText(bioText);
                toast.success("Saved");
                if (bioText === "") {
                  setTimeout(() => setGetStarted(true), 50);
                } else {
                  setIsEditButtonVisible(true);
                  setGetStarted(false);
                }
              }}
              className="rounded-3xl border border-black bg-black text-white hover:bg-white hover:text-black px-4 py-2"
            >
              Save
            </button>
          </div>
        ))}
    </div>
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -70%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const leftContent = (
    <div>
      <div className="">
        <div className="flex justify-between mb-10 ">
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
        </div>
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
      <div className="">
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
          <TabPanel value="1">
            <div>
              {userData?.blogs?.map((item: any) => (
                <div>
                  <BlogCard
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    time={item.createdAt}
                  />
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div>
              {isUser
                ? getStarted
                  ? getStartedJSX
                  : TextFieldJSX
                : TextFieldJSX}
            </div>
            <div className="bg-gray-100 mt-10 h-px"></div>
            <div className="flex items-center gap-3">
              <p
                onClick={() => {
                  navigate(`/${userData?.usernameAt}/following`);
                }}
                className="text-green-700 cursor-pointer mt-10"
              >
                {userData?.following.length} Following
              </p>
              <p
                onClick={() => {
                  navigate(`/${userData?.usernameAt}/followers`);
                }}
                className="text-green-700 cursor-pointer mt-10"
              >
                {userData?.followers.length} Followers
              </p>
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );

  const rightContent = (
    <>
      <div className="pl-10 flex flex-col gap-3 items-start ">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            className="object-cover"
            src={getCurrentUserImage(userData)}
            alt="user"
          />
        </div>
        <p className="font-medium">{userData?.username}</p>
        <p
          className="cursor-pointer"
          onClick={() => {
            navigate(`/${userData?.usernameAt}/followers`);
          }}
        >
          {userData?.followers?.length} Followers
        </p>
        <p>{userData?.shortBio || ""}</p>
        {currentUserData ? (
          isUser ? (
            <button
              onClick={() => {
                setIsEditProfileModalVisible(true);
              }}
              className="mt-5 text-green-700 hover:text-green-800 "
            >
              {" "}
              Edit Profile
            </button>
          ) : (
            <div>
              {!currentUserData?.following?.includes(userData?._id) ? (
                <button
                  onClick={() => {
                    handleFollow();
                  }}
                  className="px-5 py-2 bg-green-700 text-white rounded-3xl"
                >
                  Follow
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleFollow();
                  }}
                  className="px-5 py-2 bg-white text-green-700 border border-green-700 rounded-3xl"
                >
                  Following
                </button>
              )}
            </div>
          )
        ) : null}
      </div>
    </>
  );

  return (
    <>
      <Header1 />
      <div className="min-h-screen">
        <div className="flex">
          {/* 1st Screen */}
          <div className="w-3/4 border-r-2  ">
            <div className="w-3/4 mx-auto pt-10 ">{leftContent}</div>
          </div>
          {/* 2nd screen */}
          <div className="w-1/4 pt-10">{rightContent}</div>
        </div>
      </div>

      <Modal
        open={isEditProfileModalVisible}
        onClose={handleEditProfileModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center w-full mb-10">
            <div className="flex-1 text-center font-semibold text-2xl  text-green-700">
              Profile Information
            </div>
            <div
              className="cursor-pointer text-xl"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditProfileModalVisible(false);
              }}
            >
              ✖
            </div>
          </div>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <TextField
                id="username"
                variant="outlined"
                value={formData?.username || ""}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="shortBio">Short Bio</label>
              <TextField
                multiline
                sx={{}}
                id="shortBio"
                variant="outlined"
                value={formData.shortBio}
                onChange={handleShortBio}
                helperText={
                  maxWords < formData?.shortBio?.length
                    ? `You have exceeded the minimum characters!`
                    : ""
                }
              />
              <p className="text-xs text-right">
                {formData?.shortBio?.length || 0} / {maxWords} characters
              </p>
            </div>

            <div className="flex gap-2 justify-end mt-10 ">
              <button
                className="border border-green-700 px-4 py-2 rounded-3xl text-green-700 hover:border-green-600 hover:text-green-600"
                onClick={(e) => {
                  e.stopPropagation();
                  if (originalFormData) {
                    setFormData(originalFormData);
                  }
                  setIsEditProfileModalVisible(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await axios.patch(`${baseAPIUrl}/user/patch`, {
                    username: formData?.username,
                    shortBio: formData?.shortBio,
                    userId: userData?._id,
                  });
                  setIsEditProfileModalVisible(false);
                }}
                className="bg-green-700 px-4 py-2 rounded-3xl text-white hover:text-slate-50 hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ViewUser;
