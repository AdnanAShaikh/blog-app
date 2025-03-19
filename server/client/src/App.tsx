import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import AuthRoute from "./pages/AuthRoute";
import Landing from "./pages/Landing";
import ViewBlog from "./pages/ViewBlog";
import ViewUser from "./pages/ViewUser";
import AllUsers from "./pages/AllUsers";
import EditBlogScreen from "./pages/EditBlogScreen";
import ViewFollowersList from "./pages/ViewFollowersList";
import ViewFollowingList from "./pages/ViewFollowingList";

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
          path="/blog/:blogId"
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
          path="/user/:usernameAt"
          element={
            <AuthRoute>
              <ViewUser />
            </AuthRoute>
          }
        />

        <Route path="/:usernameAt/followers" element={<ViewFollowersList />} />
        <Route path="/:usernameAt/following" element={<ViewFollowingList />} />

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
