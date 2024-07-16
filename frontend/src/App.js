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
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
