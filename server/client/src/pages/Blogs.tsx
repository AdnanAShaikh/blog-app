import React, { useEffect, useState } from "react";
import axios from "axios";
import Header1 from "../components/Header1";
import BlogMain from "src/components/all-Blogs-Page-Components/BlogMain";
import BlogSidebar from "src/components/all-Blogs-Page-Components/BlogSidebar";
import { baseAPIUrl } from "../utils/baseAPIUrl";

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  user: {
    username: string;
    image: string;
  };
  createdAt: string;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${baseAPIUrl}/blog/all`);
      if (data?.success) {
        setIsLoading(false);
        setBlogs(data?.blogs);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, [blogs]);

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
