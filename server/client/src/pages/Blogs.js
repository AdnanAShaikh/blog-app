import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import BlogCard from "../components/BlogCard";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const isLoggedIn = localStorage.getItem("userId");

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "https://blog-app-2-5s8y.onrender.com/api/v1/blog/all-blogs"
      );
      if (data?.success) {
        console.log(data);
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Container className="bg-body-tertiary mt-4">
      {isLoggedIn ? (
        <Row>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Col xs={12} key={blog?._id} className="mb-3">
                <BlogCard
                  id={blog?._id}
                  userImage={blog?.user.image}
                  title={blog?.title}
                  image={blog?.image}
                  username={blog?.user?.username}
                  time={blog?.createdAt}
                />
              </Col>
            ))
          ) : (
            <p>No blogs</p>
          )}
        </Row>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </Container>
  );
};

export default Blogs;
