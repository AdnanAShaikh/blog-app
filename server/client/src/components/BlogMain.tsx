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
  const isLoggedIn = Boolean(localStorage.getItem("user"));

  return (
    <>
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
    </>
  );
};

export default BlogMain;
