import React, { useState } from "react";
import { SyncLoader } from "react-spinners";
import BlogCard from "./BlogCard";
import { getCurrentUserImage } from "src/utils/currentUserImage";
import { Blog } from "src/types/Blog";

const BlogMain = ({
  blogs,
  isLoading,
}: {
  blogs: Blog[];
  isLoading: boolean;
}) => {
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
              {blogs?.length > 0 ? (
                blogs?.map((blog: Blog) => (
                  <div key={blog._id} className="mb-3">
                    <BlogCard
                      id={blog._id}
                      title={blog.title}
                      description={blog.description}
                      image={blog.image}
                      time={blog.createdAt}
                      username={blog?.user?.username}
                      userImage={getCurrentUserImage(blog?.user)}
                      usernameAt={blog?.user?.usernameAt}
                      likes={blog?.likes}
                      comments={blog?.comments}
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
