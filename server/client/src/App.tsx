// import { io } from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import CreateBlog from "./pages/CreateBlog";
import AuthRoute from "./pages/AuthRoute";
import ViewBlog from "./pages/ViewBlog";
import ViewUser from "./pages/ViewUser";
import AllUsers from "./pages/AllUsers";
import EditBlogScreen from "./pages/EditBlogScreen";
import ViewFollowersList from "./pages/ViewFollowersList";
import ViewFollowingList from "./pages/ViewFollowingList";
import NotificationPage from "./pages/NotificationPage";
import HomeRouter from "./components/HomeRouter";

function App() {
  // const socket = io("http://localhost:3000", {
  //   withCredentials: true,
  // });

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId"); // or from auth context
  //   if (userId) {
  //     socket.emit("register", userId);
  //   }

  //   socket.on("notification", (notif) => {
  //     alert(notif.message); // or use toast/snackbar
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeRouter />} />

        <Route
          path="/create"
          element={
            <AuthRoute>
              <CreateBlog />
            </AuthRoute>
          }
        />
        <Route
          path="/notification"
          element={
            <AuthRoute>
              <NotificationPage />
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
