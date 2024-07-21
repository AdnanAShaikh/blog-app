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

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="https://blog-app-62et.onrender.com/" element={<Blogs />} />
        <Route
          path="https://blog-app-62et.onrender.com/blogs"
          element={<Blogs />}
        />
        <Route
          path="https://blog-app-62et.onrender.com/my-blogs"
          element={
            <AuthRoute>
              <UserBlogs />
            </AuthRoute>
          }
        />
        <Route
          path="https://blog-app-62et.onrender.com/create-blog"
          element={
            <AuthRoute>
              <CreateBlog />
            </AuthRoute>
          }
        />
        <Route
          path="https://blog-app-62et.onrender.com/blog-details/:id"
          element={
            <AuthRoute>
              <BlogDetails />
            </AuthRoute>
          }
        />
        <Route
          path="https://blog-app-62et.onrender.com/login"
          element={<Login />}
        />
        <Route
          path="https://blog-app-62et.onrender.com/register"
          element={<Register />}
        />
      </Routes>
    </>
  );
}

export default App;
