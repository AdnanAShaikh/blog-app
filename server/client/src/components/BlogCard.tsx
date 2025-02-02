import React from "react";
import { Card, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

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
  const formatCreatedAt = (createdAt: string | Date): string => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="w-fit p-3 py-7 border-b-2">
      {/* top level */}
      <div className="flex items-center gap-3 mb-3 ">
        <div className="w-5 h-5 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover "
            src={userImage}
            alt="user img"
          />
        </div>

        <span>{username}</span>
      </div>

      {/* title and image */}
      <div className="flex gap-10  ">
        <div className="flex flex-col gap-3  " style={{ minWidth: "464px" }}>
          <h3 className="text-2xl font-bold " style={{ lineHeight: 1 }}>
            {title}
          </h3>
          <p>{description.slice(0, 10)}</p>
          <div className="flex gap-5 items-center ">
            <span>{formatCreatedAt(time)} </span>
            <span>👏11.2k </span>
            <span>☁235 </span>
          </div>
        </div>

        {/* image */}
        <div className="w-32 ml-10">
          <img
            className=""
            height={107}
            width={170}
            src={image}
            alt="blog img"
          />
        </div>
      </div>
    </div>
  );
}
