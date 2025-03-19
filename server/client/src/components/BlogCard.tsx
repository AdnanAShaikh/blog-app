import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import { baseAPIUrl } from "src/utils/baseAPIUrl";
import { User } from "src/types/User";

type BlogCardProps = {
  title: string;
  description: string;
  image: string;
  username?: string;
  usernameAt?: string;
  time: string;
  id: string | number;
  userImage?: string;
  isUser?: boolean;
  likes?: any;
  comments?: any;
};

export default function BlogCard({
  title,
  description,
  image,
  username,
  usernameAt,
  time,
  id,
  userImage,
  likes,
  comments,
}: BlogCardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isUserProfilePage = location.pathname.startsWith("/user/");

  const formatCreatedAt = (createdAt: string | Date): string => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [currentUserData, setCurrentUserData] = useState<User>();
  // const [isUser,setIsUser] = useState(false)
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

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleClose = (e: any) => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div
      className="w-fit p-3 py-7 border-b-2 hover:cursor-pointer"
      onClick={() => {
        navigate(`/blog/${id}`);
      }}
    >
      {/* top level */}
      <div className="flex items-center gap-3 mb-3 ">
        {!isUserProfilePage && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/user/${usernameAt}`);
            }}
            className="w-6 h-6 rounded-full overflow-hidden hover:opacity-65"
          >
            <img
              className="h-full w-full object-cover "
              src={userImage}
              alt="user img"
            />
          </div>
        )}

        <span
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/${usernameAt}`);
          }}
          className="hover:underline"
        >
          {username}
        </span>
      </div>

      {/* title and image */}
      <div className="flex gap-10  ">
        <div className="flex flex-col gap-3  " style={{ width: "464px" }}>
          <h3
            className="text-2xl font-bold hover:underline"
            style={{ lineHeight: 1 }}
          >
            {title}
          </h3>

          <div dangerouslySetInnerHTML={{ __html: description.slice(0, 20) }} />

          <div className="flex mt-5 items-center justify-between">
            <div className="flex gap-5 items-center ">
              <span>{formatCreatedAt(time)} </span>
              <Tooltip title={`${likes?.length} likes`} arrow>
                <span className="flex items-center gap-2">
                  <ThumbUpOffAltIcon /> <p>{likes?.length}</p>{" "}
                </span>
              </Tooltip>
              <Tooltip title={`${comments?.length} responses`} arrow>
                <span className="flex items-center gap-2">
                  <ModeCommentOutlinedIcon /> <p>{comments?.length} </p>
                </span>
              </Tooltip>
            </div>
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
              onClick={(e) => {
                e.stopPropagation();
                handleClick(e);
              }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${id}`);
                  }}
                >
                  <p>Edit</p>
                </div>
              </MenuItem>
              {currentUserData?.blogs?.map((blogId: any) => blogId !== id) && (
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
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <p>Follow Author</p>
                  </div>
                </MenuItem>
              )}
              {currentUserData?.blogs?.map((blogId: any) => blogId !== id) && (
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
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <p>Block</p>
                  </div>
                </MenuItem>
              )}
            </Menu>
          </div>
        </div>

        {/* image */}
        <div className="w-40 h-28 ml-10 overflow-hidden">
          <img
            className=" w-full h-full object-cover"
            src={image}
            alt="blog img"
          />
        </div>
      </div>
    </div>
  );
}
