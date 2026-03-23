import React from "react";
import BlogSidebar from "src/components/BlogSidebar";
import Header1 from "src/components/Header1";

const NotificationPage = () => {
  return (
    <>
      <Header1 />
      <div className="flex">
        <div className="w-3/4">
          <div className="w-3/4 mx-auto">
            <div className="px-20 py-10">
              <p className="text-4xl font-semibold">Notifications</p>
            </div>
          </div>
        </div>
        <div>
          <BlogSidebar />
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
