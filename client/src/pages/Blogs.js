import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import BlogCard from "../components/BlogCard";
import { LinkContainer } from "react-router-bootstrap";
import Header from "../components/Header";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const isLoggedIn = localStorage.getItem("userId");

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "https://blog-app-l1n9.onrender.com/api/v1/blog/all-blogs"
      );
      if (data?.success) {
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
    <Container className="mt-4">
      {isLoggedIn ? (
        <Row>
          {blogs &&
            blogs.map((blog) => (
              <BlogCard
                id={blog?._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={blog?.createdAt}
              />
            ))}
        </Row>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      )}
    </Container>
  );
};

export default Blogs;
