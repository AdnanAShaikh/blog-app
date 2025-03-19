import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { baseAPIUrl } from "src/utils/baseAPIUrl";
import Header1 from "src/components/Header1";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ResponseCard from "src/components/ResponseCard";
import { Blog, Comment } from "src/types/Blog";
import { getCurrentUserImage } from "src/utils/currentUserImage";
import { Button, Menu, MenuItem } from "@mui/material";
import { User } from "src/types/User";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const ViewBlog = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog>();
  const [comment, setComment] = useState<string>("");
  const [isAuthor, setIsAuthor] = useState(false);
  const navigate = useNavigate();

  const [currentUserData, setCurrentUserData] = useState<User>();
  const [isUser, setIsUser] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);

  // Get blog details
  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`${baseAPIUrl}/blog/${blogId}`);
      if (data?.success) {
        console.log(data);
        setBlog(data.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    fetchBlog();
  }, []);

  useEffect(() => {
    if (blog) {
      if (blog.user._id === currentUserData?._id) {
        setIsAuthor(true);
      } else {
        setIsAuthor(false);
      }
    }
  }, [blog, currentUserData]);

  const handleFollow = async () => {
    try {
      const { data } = await axios.post(`${baseAPIUrl}/user/follow`, {
        toUserId: blog?.user?._id,
        fromUserId: currentUserData?._id,
      });
      if (data?.success) {
        const audio = new Audio("/sounds/mixkit-message-pop-alert-2354.mp3"); // Path to your sound file
        audio.play();
        setCurrentUserData(data?.myUser);
        fetchBlog();
        fetchCurrentUser();
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (comment !== "") {
        const { data } = await axios.post(
          `${baseAPIUrl}/blog/${blogId}/comment`,
          {
            postedById: currentUserData?._id,
            text: comment,
          }
        );
        if (data?.success) {
          setComment(""); // Clear the comment input after submitting

          toast.success("Comment added");
          console.log(data);
          setBlog((prevBlog) => {
            if (prevBlog) {
              return {
                ...prevBlog,
                comments: [...prevBlog.comments, data.newComment],
              };
            }
            return prevBlog;
          });
        }
      }
    } catch (error) {
      console.log("Error ", error);
    }
    setComment(""); // Clear the comment input after submitting
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://blog-app-2-5s8y.onrender.com/api/v1/blog/delete-blog/${blogId}`
      );
      if (data?.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const blogDate = formatDate(blog?.createdAt);

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  return (
    <>
      <Header1 />
      <div className="w-full">
        <div className="w-2/3  mx-auto text-4xl font-semibold mt-10">
          {blog?.title}
        </div>
        <div className="w-2/3 mx-auto flex gap-3 mt-7">
          <div className="w-11 h-11 rounded-full overflow-hidden">
            <img
              onClick={() => {
                navigate(`/user/${blog?.user?.usernameAt}`);
              }}
              className="w-full h-full object-cover cursor-pointer hover:opacity-80"
              src={getCurrentUserImage(blog?.user)}
              alt="user"
            />
          </div>
          <div className="flex flex-col">
            <p
              className=" cursor-pointer"
              onClick={() => {
                navigate(`/user/${blog?.user?.usernameAt}`);
              }}
            >
              {blog?.user?.username}
            </p>
            <p>{blogDate}</p>
          </div>
        </div>

        {/* applause section */}
        <div className="w-2/3 mx-auto mt-7">
          <div className="bg-gray-100 h-px"></div>
          <div className="flex justify-between px-4 py-5">
            <div className="flex items-center gap-3">
              <div>
                <span className="flex items-center gap-1">
                  <p
                    className="cursor-pointer"
                    onClick={async () => {
                      const { data } = await axios.post(
                        `${baseAPIUrl}/user/like/blog`,
                        {
                          blogId: blogId,
                          userId: currentUserData?._id,
                        }
                      );
                      if (data?.success) {
                        fetchCurrentUser();
                        fetchBlog();
                      }
                    }}
                  >
                    {" "}
                    {!currentUserData?.blogsLiked?.includes(blogId) ? (
                      <ThumbUpOffAltIcon />
                    ) : (
                      <ThumbUpIcon className="text-green-700" />
                    )}
                  </p>{" "}
                  <p>{blog?.likes.length}</p>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <ModeCommentOutlinedIcon /> {blog?.comments?.length}
              </div>
            </div>
            <div>
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
                onClick={handleClick1}
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
                anchorEl={anchorEl1}
                open={open1}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {blog?.user._id === currentUserData?._id && (
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
                        navigate(`/edit/${blog?._id}`);
                      }}
                    >
                      <p>Edit</p>
                    </div>
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
                  className="flex w-full"
                >
                  <div
                    className="flex items-center gap-2"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      handleClose();
                    }}
                  >
                    <p>Copy Blog Link</p>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className="bg-gray-100 h-px"></div>
        </div>
        <div className="w-2/3 mx-auto mt-10 text-xl">
          <div dangerouslySetInnerHTML={{ __html: blog?.description }} />
        </div>

        {/* tag section TO BE SOON */}
        <div></div>

        {/* applause section again */}
        <div className="w-2/3 mx-auto mt-20">
          <div className="flex justify-between px-4 py-5">
            <div className="flex items-center gap-3">
              <div>
                <span className="flex items-center gap-1">
                  <p
                    className="cursor-pointer"
                    onClick={async () => {
                      const { data } = await axios.post(
                        `${baseAPIUrl}/user/like/blog`,
                        {
                          blogId: blogId,
                          userId: currentUserData?._id,
                        }
                      );
                      if (data?.success) {
                        fetchCurrentUser();
                        fetchBlog();
                      }
                    }}
                  >
                    {" "}
                    {!currentUserData?.blogsLiked?.includes(blogId) ? (
                      <ThumbUpOffAltIcon />
                    ) : (
                      <ThumbUpIcon className="text-green-700" />
                    )}
                  </p>{" "}
                  <p>{blog?.likes.length}</p>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <ModeCommentOutlinedIcon /> {blog?.comments?.length}
              </div>
            </div>
            <div className="">
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
                {blog?.user._id === currentUserData?._id && (
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
                        navigate(`/edit/${blog?._id}`);
                      }}
                    >
                      <p>Edit</p>
                    </div>
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
                    <p>Copy Blog Link</p>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>

        {/* Written By Section */}
        <div className="w-2/3 mx-auto flex justify-between items-center gap-3 my-10">
          <div className="flex gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <img
                onClick={() => {
                  navigate(`/user/${blog?.user?.usernameAt}`);
                }}
                className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                src={getCurrentUserImage(blog?.user)}
                alt="user"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-xl text-bold">
                Written by{" "}
                <span
                  className="hover:underline cursor-pointer"
                  onClick={() => {
                    navigate(`/user/${blog?.user?.usernameAt}`);
                  }}
                >
                  {blog?.user?.username}
                </span>
              </p>
              <div className="flex gap-3 items-center">
                <p
                  className="hover:text-slate-700 cursor-pointer"
                  onClick={() => {
                    navigate(`/${blog?.user?.usernameAt}/followers`);
                  }}
                >
                  {blog?.user.followers.length} Followers
                </p>
                <p
                  className="hover:text-slate-700 cursor-pointer"
                  onClick={() => {
                    navigate(`/${blog?.user?.usernameAt}/following`);
                  }}
                >
                  {blog?.user.following.length} Following
                </p>
              </div>
            </div>
          </div>

          <div>
            {!currentUserData?.following?.includes(blog?.user?._id) ? (
              <button
                onClick={() => {
                  handleFollow();
                }}
                className="px-5 py-2 bg-green-700 text-white rounded-3xl hover:opacity-80"
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
        </div>

        <div className="bg-gray-100 h-px"></div>

        {/* Responses Section */}
        <div className="w-2/3 mx-auto mt-10">
          <p className="text-3xl font-bold">Responses</p>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              addComment(e);
            }}
          >
            <div className="">
              <div>
                <input
                  type="text"
                  placeholder="What are your thoughts?"
                  className=" pt-3 pb-10 w-full my-10 focus:outline-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault(); // Prevent line break & default submission
                      addComment(e);
                    }
                  }}
                />
              </div>
              {comment !== "" && (
                <div className="text-right mb-5">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-3xl"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </form>

          {/* Responses Array Section  */}
          <div>
            {blog?.comments.map((comment: Comment) => {
              return (
                <>
                  <ResponseCard
                    username={comment.username}
                    image={comment.image}
                    text={comment.text}
                    date={comment.date}
                    isAuthor={isAuthor}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
