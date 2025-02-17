import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import UserBlogs from "./pages/UserBlog";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import AuthRoute from "./pages/AuthRoute";
import Landing from "./components/Landing";
import ViewBlog from "./pages/ViewBlog";
import ViewUser from "./pages/ViewUser";
import AllUsers from "./pages/AllUsers";
import FollowerList from "./pages/FollowerList";
import FollowingList from "./pages/FollowingList";
import EditBlogScreen from "./pages/EditBlogScreen";

function App() {
  const isLogin = localStorage.getItem("userId");
  return (
    <>
      <Routes>
        <Route path="/" element={isLogin ? <Blogs /> : <Landing />} />

        <Route
          path="/create"
          element={
            <AuthRoute>
              <CreateBlog />
            </AuthRoute>
          }
        />

        <Route
          path="/edit/:blogId"
          element={
            <AuthRoute>
              <EditBlogScreen />
            </AuthRoute>
          }
        />

        {/* this is update blog */}
        {/* <Route
          path="/:id"
          element={
            <AuthRoute>
              <BlogDetails />
            </AuthRoute>
          }
        /> */}

        {/* this is view blog */}
        <Route
          path="/blog/:id"
          element={
            <AuthRoute>
              <ViewBlog />
            </AuthRoute>
          }
        />

        {/*  */}
        {/* 

          USER ROUTES BELOW
        
        */}
        <Route
          path="/user/:name"
          element={
            <AuthRoute>
              <ViewUser />
            </AuthRoute>
          }
        />

        {/* follower/ following */}
        <Route path="/:name/followers" element={<FollowerList />} />
        <Route
          path="/:name/following"
          element={
            <AuthRoute>
              <FollowingList />
            </AuthRoute>
          }
        />

        <Route
          path="/user/all"
          element={
            <AuthRoute>
              <AllUsers />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
