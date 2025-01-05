import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import BlogCard from "../components/BlogCard";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  user: {
    username: string;
    image: string;
  };
  createdAt: string;
}

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  username: string;
  time: string;
  id: string | number;
  userImage: string;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]); // State typed as an array of Blog objects
  const isLoggedIn = Boolean(localStorage.getItem("userId"));

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "https://blog-app-2-5s8y.onrender.com/api/v1/blog/all-blogs"
      );
      if (data?.success) {
        console.log(data);
        setBlogs(data?.blogs); // Ensure the response matches Blog[]
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
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
              <Col xs={12} key={blog._id} className="mb-3">
                <BlogCard
                  id={blog._id}
                  userImage={blog.user.image}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  username={blog.user.username}
                  time={blog.createdAt}
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
