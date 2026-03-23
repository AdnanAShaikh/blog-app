import React, { useEffect, useState } from "react";
import axios from "axios";
import Header1 from "../components/Header1";
import BlogMain from "src/components/BlogMain";
import BlogSidebar from "src/components/BlogSidebar";
import { baseAPIUrl } from "../utils/baseAPIUrl";
import { SyncLoader } from "react-spinners";

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<any>();
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
  }, []);

  return (
    <>
      <Header1 />
      {isLoading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <SyncLoader loading={isLoading} />
        </div>
      ) : (
        <div className="flex w-full">
          <div className=" max-lg:w-full w-3/4 lg:border-r-[1px]">
            <div className="lg:w-4/6 lg:mx-auto">
              <BlogMain blogs={blogs} isLoading={isLoading} />
            </div>
          </div>
          <div className="max-lg:hidden lg:w-1/4 ">
            <BlogSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Blogs;
