import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlog";
import CreateBlog from "./pages/CreateBlog";
import { Toaster } from "react-hot-toast";
import BlogDetails from "./pages/BlogDetails";
import AuthRoute from "./pages/AuthRoute";
import UnAuthRoute from "./pages/UnAuthRoute";
import Landing from "./components/Landing";
import ViewBlog from "./pages/ViewBlog";
import ViewUser from "./pages/ViewUser";
import AllUsers from "./pages/AllUsers";
import FollowerList from "./pages/FollowerList";
import FollowingList from "./pages/FollowingList";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <UnAuthRoute>
              <Landing />
            </UnAuthRoute>
          }
        />

        <Route
          path="/blogs"
          element={
            <AuthRoute>
              <Blogs />
            </AuthRoute>
          }
        />
        <Route
          path="/my-blogs"
          element={
            <AuthRoute>
              <UserBlogs />
            </AuthRoute>
          }
        />
        <Route
          path="/create-blog"
          element={
            <AuthRoute>
              <CreateBlog />
            </AuthRoute>
          }
        />
        <Route
          path="/blog-details/:id"
          element={
            <AuthRoute>
              <BlogDetails />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <UnAuthRoute>
              <Login />
            </UnAuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UnAuthRoute>
              <Register />
            </UnAuthRoute>
          }
        />
        <Route
          path="/get-blog/:id"
          element={
            <AuthRoute>
              <ViewBlog />
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
