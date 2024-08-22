import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import BlogCard from "../components/BlogCard";

const ViewUser = () => {
  const [userData, setUserData] = useState({});
  const [ourData, setOurData] = useState({});

  const { name } = useParams();

  const userId = localStorage.getItem("userId");

  let isUser = localStorage.getItem("userId") === userData._id;

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://blog-app-2-5s8y.onrender.com/api/v1/user/${name}`
      );
      if (data.success) {
        console.log(data);
        setUserData(data.user);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(
        `https://blog-app-2-5s8y.onrender.com/api/v1/user/current/${userId}`
      );
      if (data?.success) {
        console.log("currentUser", data);
        setOurData(data.currentUser);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [name]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  //our data -> this user
  //userData -> that user

  const handleFollow = async () => {
    try {
      const { data } = await axios.post(
        `https://blog-app-2-5s8y.onrender.com/api/v1/user/follow/${name}`,
        {
          id: localStorage.getItem("userId"),
        }
      );

      if (data.success) {
        // console.log(data);
        window.location.reload();
        setOurData(data.myUser);
      }
    } catch (error) {
      return console.log(error);
    }
  };
  const handleUnFollow = async () => {
    try {
      const { data } = await axios.post(
        `https://blog-app-2-5s8y.onrender.com/api/v1/user/unfollow/${name}`,
        {
          id: localStorage.getItem("userId"),
        }
      );

      if (data.success) {
        // console.log(data);
        window.location.reload();
        setOurData(data.myUser);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const weFollowHim = ourData?.following?.includes(userData._id);

  //   console.log(weFollowHim);

  return (
    <Container className="mt-5">
      {/* User Profile Section */}
      <Card className="p-4 shadow-sm mb-4">
        <Row className="align-items-center">
          <Col md={3} className="text-center">
            <Image
              src={
                userData.image ? userData.image : require("../download.jpeg")
              }
              roundedCircle
              className="mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </Col>
          <Col md={6}>
            <h3>{userData.username}</h3>
            <p>{userData.email}</p>
            {!isUser ? (
              !weFollowHim ? (
                <Button onClick={handleFollow}>Follow</Button>
              ) : (
                <Button className="btn-sm" onClick={handleUnFollow}>
                  UnFollow
                </Button>
              )
            ) : (
              ""
            )}
          </Col>
          <Col md={3} className="text-center">
            <p>
              <strong>{userData?.blogs?.length || 0}</strong> Posts
            </p>
            <Link
              to={`/${userData.username}/followers`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <p>
                <strong>{userData?.followers?.length}</strong> Followers↗
                {/* Placeholder for followers */}
              </p>
            </Link>{" "}
            <Link
              to={`/${userData.username}/following`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {" "}
              <p>
                <strong>{userData?.following?.length}</strong> Following↗{" "}
                {/* Placeholder for following */}
              </p>
            </Link>
          </Col>
        </Row>
      </Card>

      {/* Blog Grid Section */}
      <h4 className="mb-4">Blogs</h4>
      <Row>
        {userData.blogs && userData.blogs.length > 0 ? (
          userData.blogs.map((blog, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <BlogCard
                title={blog.title}
                image={blog.image}
                username={userData.username}
                time={blog.createdAt}
                id={blog._id}
                isUser={localStorage.getItem("userId") === blog.user}
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
