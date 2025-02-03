import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header1 from "src/components/Header1";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/material";
import { baseAPIUrl } from "src/utils/baseAPIUrl";

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
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const { name } = useParams<{ name: string }>();
  const userId = localStorage.getItem("userId");
  const [value, setValue] = React.useState("1");

  // Used to get Image
  const getCurrentUser = async () => {
    try {
      const cachedUser = sessionStorage.getItem(`user_${userId}`);
      if (cachedUser) {
        return setCurrentUser(JSON.parse(cachedUser));
      } else {
        const { data } = await axios.get(`${baseAPIUrl}/user/${userId}`);
        if (data.success) {
          console.log("current User: ", data);
          setCurrentUser(data.user);
        }
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [userId]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleFollow = async () => {
    try {
      const { data } = await axios.post(
        `https://blog-app-2-5s8y.onrender.com/api/v1/user/follow/${name}`,
        { id: userId }
      );
      if (data.success) {
        setCurrentUser(data.myUser);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnFollow = async () => {
    try {
      const { data } = await axios.post(
        `https://blog-app-2-5s8y.onrender.com/api/v1/user/unfollow/${name}`,
        { id: userId }
      );
      if (data.success) {
        setCurrentUser(data.myUser);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  // const weFollowHim = currentUser?.following?.includes(userData?._id || "");

  return (
    <>
      <Header1 />
      <div className="min-h-screen flex justify-center">
        <div className="flex w-[63%] ">
          <div className="w-3/4 border-r-2 pr-32 ">
            <div className="flex justify-between items-center pt-14">
              <p className="text-6xl ">{currentUser?.username}</p>
              <p className="text-3xl">...</p>
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
                  src={currentUser?.image}
                  alt="user"
                />
              </div>
              <p className="font-medium">{currentUser?.username}</p>
              <p className="mt-5 text-green-700"> Edit Profile</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
