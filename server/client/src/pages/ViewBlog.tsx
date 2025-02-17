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

const ViewBlog = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState<string>("");
  const [isAuthor, setIsAuthor] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  // Get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`${baseAPIUrl}/blog/${id}`);
      if (data?.success) {
        console.log(data);
        setBlog(data.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, []);

  useEffect(() => {
    if (blog) {
      if (blog.user._id === userId) {
        setIsAuthor(true);
      } else {
        setIsAuthor(false);
      }
    }
  }, [blog, userId]);

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (comment !== "") {
        const { data } = await axios.post(`${baseAPIUrl}/blog/${id}/comment`, {
          postedById: userId,
          text: comment,
        });
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
        `https://blog-app-2-5s8y.onrender.com/api/v1/blog/delete-blog/${id}`
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
        <div className="w-1/2  mx-auto text-3xl font-bold mt-10">
          {blog?.title}
        </div>
        <div className="w-1/2 mx-auto flex gap-3 mt-7">
          <div className="w-11 h-11 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={getCurrentUserImage(blog?.user)}
              alt="user"
            />
          </div>
          <div className="flex flex-col">
            <p>{blog?.user?.username}</p>
            <p>{blogDate}</p>
          </div>
        </div>

        {/* applause section */}
        <div className="w-1/2 mx-auto mt-7">
          <div className="bg-gray-100 h-px"></div>
          <div className="flex justify-between px-4 py-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <ThumbUpOffAltIcon /> 12.9k
              </div>
              <div className="flex items-center gap-1">
                <ModeCommentOutlinedIcon /> 27
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
                {blog?.user._id === userId && (
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
                        navigate(`/edit/${blog._id}`);
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
        <div className="w-1/2 mx-auto mt-10 text-xl">
          <div dangerouslySetInnerHTML={{ __html: blog?.description }} />
        </div>

        {/* tag section TO BE SOON */}
        <div></div>

        {/* applause section again */}
        <div className="w-1/2 mx-auto mt-20">
          <div className="flex justify-between px-4 py-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <ThumbUpOffAltIcon /> 12.9k
              </div>
              <div className="flex items-center gap-1">
                <ModeCommentOutlinedIcon /> 27
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
                {blog?.user._id === userId && (
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
                        navigate(`/edit/${blog._id}`);
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
        <div className="w-1/2 mx-auto flex justify-between items-center gap-3 my-10">
          <div className="flex gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={getCurrentUserImage(blog?.user)}
                alt="user"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-xl text-bold">
                Written by {blog?.user?.username}
              </p>
              <div className="flex gap-3 items-center">
                <p>{blog?.user.followers.length} Followers</p>
                <p>{blog?.user.following.length} Following</p>
              </div>
            </div>
          </div>

          <div>
            <button className="px-5 py-2 bg-black text-white rounded-3xl">
              Follow
            </button>
          </div>
        </div>

        <div className="bg-gray-100 h-px"></div>

        {/* Responses Section */}
        <div className="w-1/2 mx-auto mt-10">
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
