import React from "react";

const BlogSidebar = () => {
  return (
    <div className="flex flex-col gap-3 p-7" style={{ maxWidth: "360px" }}>
      <p className="font-bold">Staff Picks</p>
      <div className="flex flex-col gap-1">
        <p>In Picture Palace by Loren Kantor</p>
        <p className="font-bold text-lg">Rest in Peace David Lynch</p>
        <p>2d ago</p>
      </div>
      <div className="flex flex-col gap-1">
        <p>In Picture Palace by Loren Kantor</p>
        <p className="font-bold text-lg">Rest in Peace David Lynch</p>
        <p>2d ago</p>
      </div>
      <div className="flex flex-col gap-1">
        <p>In Picture Palace by Loren Kantor</p>
        <p className="font-bold text-lg">Rest in Peace David Lynch</p>
        <p>2d ago</p>
      </div>
      <p>See the full list</p>

      {/* sticky div */}
      <div className="sticky top-0">
        {/* Recommended Topics */}
        <div className="mt-10">
          <p className="text-lg font-bold">Recommended Topics</p>
          <div className="flex flex-wrap gap-2 overflow-hidden py-5">
            <p className="bg-slate-100 px-4 py-1 rounded-3xl  my-1">
              Programming
            </p>
            <p className="bg-slate-100 px-4 py-1 rounded-3xl  my-1">
              Self Improvement
            </p>
            <p className="bg-slate-100 px-4 py-1 rounded-3xl  my-1">
              Data Science
            </p>
            <p className="bg-slate-100 px-4 py-1 rounded-3xl  my-1">Politics</p>
            <p className="bg-slate-100 px-4 py-1 rounded-3xl  my-1">Writing</p>
            <p className="bg-slate-100 px-4 py-1 rounded-3xl  my-1">
              Technology
            </p>
            <p className="bg-slate-100 px-4 py-1 rounded-3xl  my-1">
              Relationships
            </p>
          </div>
          <p className="">See more topics</p>
        </div>

        {/* Who to Follow Section */}
        <div className="mt-10">
          <p className="font-bold text-lg">Who to Follow</p>

          <div className="mt-5">
            {/* 1st */}
            <div className="flex mb-3 ">
              <div className="rounded-full bg-red-100 w-6 h-5 translate-y-1"></div>
              <div className="flex flex-col ml-3">
                <p className="font-bold " style={{ fontSize: "18px" }}>
                  Tanner the Humanist
                </p>
                <div className="w-3/4">
                  <p>Tanner Adion is a contemporary author...</p>
                </div>
              </div>
              <div>
                <div className=" border-2 py-1 px-3 rounded-3xl text-lg font-semibold">
                  Follow
                </div>
              </div>
            </div>
            {/* 2nd */}
            <div className="flex mb-3">
              <div className="rounded-full bg-red-100 w-6 h-5 translate-y-1"></div>
              <div className="flex flex-col ml-3">
                <p className="font-bold " style={{ fontSize: "18px" }}>
                  Tanner the Humanist
                </p>
                <div className="w-3/4">
                  <p>Tanner Adion is a contemporary author...</p>
                </div>
              </div>
              <div>
                <div className=" border-2 py-1 px-3 rounded-3xl text-lg font-semibold">
                  Follow
                </div>
              </div>
            </div>
            {/* 3rd */}
            <div className="flex ">
              <div className="rounded-full bg-red-100 w-6 h-5 translate-y-1"></div>
              <div className="flex flex-col ml-3">
                <p className="font-bold " style={{ fontSize: "18px" }}>
                  Tanner the Humanist
                </p>
                <div className="w-3/4">
                  <p>Tanner Adion is a contemporary author...</p>
                </div>
              </div>
              <div>
                <div className=" border-2 py-1 px-3 rounded-3xl text-lg font-semibold">
                  Follow
                </div>
              </div>
            </div>
            <p className="mt-3">See more suggestions</p>
          </div>
        </div>

        {/* Reading List */}
        <div className="mt-10">
          <p className="text-lg font-bold">Reading List</p>
          <div className="mt-5">
            <p>
              Click the on any story to easily add it to your reading list or a
              custom list that you can share.
            </p>
          </div>
          <div className="flex flex-wrap gap-1 overflow-hidden py-5 text-sm">
            <p>Help</p>
            <p>Status</p>
            <p>About</p>
            <p>Careers</p>
            <p>Press</p>
            <p>Blog</p>
            <p>Privacy</p>
            <p>Terms</p>
            <p>Teams</p>
          </div>
        </div>
        {/* sticky div end */}
      </div>
    </div>
  );
};

export default BlogSidebar;
