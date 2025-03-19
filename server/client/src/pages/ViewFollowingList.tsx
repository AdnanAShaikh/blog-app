import { Box, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header1 from "src/components/Header1";
import { User } from "src/types/User";
import { baseAPIUrl } from "src/utils/baseAPIUrl";
import { getCurrentUserImage } from "src/utils/currentUserImage";

const ViewFollowingList = () => {
  const { usernameAt } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User>();
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
  const [userId, setUserId] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);
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
        setUserId(data?.user?._id);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchUser = async () => {
    const { data } = await axios.get(`${baseAPIUrl}/user/name/${usernameAt}`);
    if (data?.success) {
      console.log(data);
      setUserData(data?.user);
      setIsUser(userId === data?.user?._id);
      setFormData({
        shortBio: data?.user?.shortBio,
        username: data?.user.username,
      });
      setOriginalFormData({
        username: data.user.username,
        shortBio: data.user.shortBio,
      });
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleFollow = async (id: any) => {
    try {
      const { data } = await axios.post(`${baseAPIUrl}/user/follow`, {
        toUserId: id,
        fromUserId: currentUserData?._id,
      });
      if (data?.success) {
        const audio = new Audio("/sounds/mixkit-message-pop-alert-2354.mp3"); // Path to your sound file
        audio.play();
        await fetchCurrentUser();
        await fetchUser();
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
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

  return (
    <>
      <Header1 />
      <div className="flex w-full min-h-screen  ">
        <div className="border-r-2 p-10 w-3/5">
          <div className="pl-40">
            <div className="flex flex-col">
              <p
                className="font-medium text-4xl"
                style={{ fontFamily: "Helvetica" }}
              >
                {userData?.following?.length ?? 0} Following
              </p>
              <div className="flex flex-col gap-5 mt-10">
                {userData?.following.map((user: any) => (
                  <div
                    className={`flex gap-4 ${
                      userData?.shortBio !== "" ? "items-center" : ""
                    } `}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        onClick={() => {
                          navigate(`/user/${user.usernameAt}`);
                        }}
                        className="w-full h-full object-cover hover:opacity-80 cursor-pointer"
                        src={getCurrentUserImage(user)}
                        alt="follow-image"
                      />
                    </div>
                    <div className="flex flex-1 ">
                      <span
                        className="font-medium cursor-pointer hover:underline"
                        onClick={() => {
                          navigate(`/user/${user.usernameAt}`);
                        }}
                      >
                        {user.username}
                      </span>
                    </div>{" "}
                    <div>
                      {!user?._id === currentUserData?._id ? (
                        !user?.following?.includes(currentUserData?._id) ? (
                          <button
                            onClick={() => {
                              handleFollow(user._id);
                            }}
                            className="px-5 py-2 bg-green-700 text-white rounded-3xl"
                          >
                            Follow
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleFollow(user._id);
                            }}
                            className="px-5 py-2 bg-white text-green-700 border border-green-700 rounded-3xl"
                          >
                            Following
                          </button>
                        )
                      ) : (
                        ""
                      )}
                    </div>{" "}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* 2nd screen */}
        <div className="pt-14">
          <div className="pl-10 flex flex-col gap-3 items-start ">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                onClick={() => {
                  navigate(`/user/${userData?.usernameAt}`);
                }}
                className="w-full h-full object-cover hover:opacity-80 cursor-pointer"
                src={getCurrentUserImage(userData)}
                alt="user"
              />
            </div>
            <p
              className="font-medium hover:underline cursor-pointer"
              onClick={() => {
                navigate(`/user/${userData?.usernameAt}`);
              }}
            >
              {userData?.username}
            </p>
            <p>{userData?.shortBio || ""}</p>
            {isUser ? (
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
                      handleFollow(userData?._id);
                    }}
                    className="px-5 py-2 bg-green-700 text-white rounded-3xl"
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleFollow(userData?._id);
                    }}
                    className="px-5 py-2 bg-white text-green-700 border border-green-700 rounded-3xl"
                  >
                    Following
                  </button>
                )}
              </div>
            )}
          </div>
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
                    userId: userId,
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

export default ViewFollowingList;
