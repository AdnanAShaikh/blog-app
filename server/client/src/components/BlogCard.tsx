import { Tooltip } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

type BlogCardProps = {
  title: string;
  description: string;
  image: string;
  username: string;
  time: string;
  id: string | number;
  userImage: string;
  isUser?: boolean;
};

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  userImage,
}: BlogCardProps) {
  const navigate = useNavigate();
  const formatCreatedAt = (createdAt: string | Date): string => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/${username}`);
          }}
          className="w-6 h-6 rounded-full overflow-hidden hover:opacity-65"
        >
          <img
            className="h-full w-full object-cover "
            src={userImage}
            alt="user img"
          />
        </div>

        <span
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/${username}`);
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

          <div className="flex gap-5 items-center mt-5 ">
            <span>{formatCreatedAt(time)} </span>
            <Tooltip title="11.2k likes" arrow>
              <span className="flex items-center gap-2">
                <ThumbUpOffAltIcon /> <p>11.2k</p>{" "}
              </span>
            </Tooltip>
            <Tooltip title="235 responses" arrow>
              <span className="flex items-center gap-2">
                <ModeCommentOutlinedIcon /> <p>235 </p>
              </span>
            </Tooltip>
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
