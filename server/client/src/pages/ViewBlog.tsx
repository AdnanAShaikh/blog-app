import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { baseAPIUrl } from "src/utils/baseAPIUrl";
import Header1 from "src/components/Header1";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
interface Comment {
  postedBy: string;
  text: string;
}

interface Blog {
  _id: string;
  title: string;
  description: any;
  image: string;
  updatedAt: string;
  createdAt: string;
  user: {
    username: string;
    image: string;
    followers: string[];
    following: string[];
  };
  comments: Comment[];
}

const ViewBlog = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState<string>("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const isUser = userId === blog?.user?.username;
  console.log(isUser);

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
  }, [id]);

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post(
      `https://blog-app-2-5s8y.onrender.com/api/v1/blog/${id}/comment`,
      {
        postedBy: userId,
        text: comment,
      }
    );
    if (data.success) {
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
      setComment(""); // Clear the comment input after submitting
    }
  };

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
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
              src={blog?.user.image}
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
            <div className="">
              <MoreHorizIcon fontSize="medium" />
            </div>
          </div>
          <div className="bg-gray-100 h-px"></div>
        </div>
        <div className="w-1/2 mx-auto mt-10">
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
              <MoreHorizIcon fontSize="medium" />
            </div>
          </div>
        </div>

        {/* Written By Section */}
        <div className="w-1/2 mx-auto flex justify-between items-center gap-3 my-10">
          <div className="flex gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={blog?.user.image}
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
          <input
            type="text"
            placeholder="What are your thoughts?"
            className=" pt-3 pb-10 w-full my-10 focus:outline-none"
          />
          <div className="bg-gray-100 h-px mb-10"></div>

          {/* Responses Array Section  */}
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
