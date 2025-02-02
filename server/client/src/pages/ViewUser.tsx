import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import BlogCard from "../components/BlogCard";

interface Blog {
  _id: string;
  title: string;
  image: string;
  createdAt: string;
  user: string;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  image: string;
  blogs: Blog[];
  followers: string[];
  following: string[];
}

interface CurrentUser {
  _id: string;
  following: string[];
}

const ViewUser: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [ourData, setOurData] = useState<CurrentUser | null>(null);
  const { name } = useParams<{ name: string }>();
  const userId = localStorage.getItem("userId");

  const isUser = userId === userData?._id;

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://blog-app-2-5s8y.onrender.com/api/v1/user/${name}`
      );
      if (data.success) {
        setUserData(data.user);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(
        `https://blog-app-2-5s8y.onrender.com/api/v1/user/current/${userId}`
      );
      if (data.success) {
        setOurData(data.currentUser);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [name]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleFollow = async () => {
    try {
      const { data } = await axios.post(
        `https://blog-app-2-5s8y.onrender.com/api/v1/user/follow/${name}`,
        { id: userId }
      );
      if (data.success) {
        setOurData(data.myUser);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnFollow = async () => {
    try {
      const { data } = await axios.post(
        `https://blog-app-2-5s8y.onrender.com/api/v1/user/unfollow/${name}`,
        { id: userId }
      );
      if (data.success) {
        setOurData(data.myUser);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const weFollowHim = ourData?.following?.includes(userData?._id || "");

  return (
    <Container className="mt-5">
      {/* User Profile Section */}
      <Card className="p-4 shadow-sm mb-4">
        <Row className="align-items-center">
          <Col md={3} className="text-center">
            <Image
              src={userData?.image || require("../download.jpeg")}
              roundedCircle
              className="mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </Col>
          <Col md={6}>
            <h3>{userData?.username}</h3>
            <p>{userData?.email}</p>
            {!isUser ? (
              !weFollowHim ? (
                <Button onClick={handleFollow}>Follow</Button>
              ) : (
                <Button className="btn-sm" onClick={handleUnFollow}>
                  UnFollow
                </Button>
              )
            ) : null}
          </Col>
          <Col md={3} className="text-center">
            <p>
              <strong>{userData?.blogs?.length || 0}</strong> Posts
            </p>
            <Link
              to={`/${userData?.username}/followers`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <p>
                <strong>{userData?.followers?.length || 0}</strong> Followers↗
              </p>
            </Link>
            <Link
              to={`/${userData?.username}/following`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <p>
                <strong>{userData?.following?.length || 0}</strong> Following↗
              </p>
            </Link>
          </Col>
        </Row>
      </Card>

      {/* Blog Grid Section */}
      <h4 className="mb-4">Blogs</h4>
      <Row>
        {userData?.blogs && userData.blogs.length > 0 ? (
          userData.blogs.map((blog) => (
            <Col key={blog._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <BlogCard
                title={blog.title}
                description=""
                image={blog.image}
                username={userData.username}
                time={blog.createdAt}
                id={blog._id}
                userImage={userData.image}
              />
            </Col>
          ))
        ) : (
          <p>No Blogs Yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default ViewUser;
