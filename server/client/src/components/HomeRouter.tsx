import { useSelector } from "react-redux";
import Blogs from "../pages/Blogs";
import Landing from "../pages/Landing";
import { RootState } from "src/redux/store";

export default function HomeRouter() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  return isLogin ? <Blogs /> : <Landing />;
}
