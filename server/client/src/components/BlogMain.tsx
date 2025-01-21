import React, { useState } from "react";
import { SyncLoader } from "react-spinners";
import BlogCard from "../components/BlogCard";

type BlogMainProps = {
  blogs: any[]; // Replace `any` with the specific type of your blogs if you know it
  isLoading: boolean;
};

type BlogCardProps = {
  _id: string;
  title: string;
  description: string;
  image: string;
  user: {
    username: string;
    image: string;
  };
  createdAt: string;
};

const BlogMain: React.FC<BlogMainProps> = ({ blogs, isLoading }) => {
  const isLoggedIn = Boolean(localStorage.getItem("userId"));

  return (
    <>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <SyncLoader loading={isLoading} />
      </div>
      <div className="border-r-2 px-5">
        {isLoggedIn && (
          <>
            <div className="">
              {blogs.length > 0 ? (
                blogs.map((blog: BlogCardProps) => (
                  <div key={blog._id} className="mb-3">
                    <BlogCard
                      id={blog._id}
                      title={blog.title}
                      description={blog.description}
                      image={blog.image}
                      time={blog.createdAt}
                      username={blog.user.username}
                      userImage={blog.user.image}
                    />
                  </div>
                ))
              ) : (
                <>{!isLoading && <p>No blogs</p>}</>
              )}
            </div>
          </>
        )}
      </div>{" "}
    </>
  );
};

export default BlogMain;
