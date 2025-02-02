import React, { useEffect, useState } from "react";
import axios from "axios";
import Header1 from "../components/Header1";
import BlogMain from "src/components/BlogMain";
import BlogSidebar from "src/components/BlogSidebar";

type Blog = {
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

type BlogCardProps = {
  title: string;
  description: string;
  image: string;
  username: string;
  time: string;
  id: string | number;
  userImage: string;
};

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const isLoggedIn = Boolean(localStorage.getItem("userId"));
  const [isLoading, setIsLoading] = useState(true);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "https://blog-app-2-5s8y.onrender.com/api/v1/blog/all-blogs"
      );
      if (data?.success) {
        setIsLoading(false);
        console.log(data);
        setBlogs(data?.blogs);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      <Header1 />
      <div className="flex justify-center">
        <BlogMain blogs={blogs} isLoading={isLoading} />
        {!isLoading && <BlogSidebar />}
      </div>
    </>
  );
};

export default Blogs;
