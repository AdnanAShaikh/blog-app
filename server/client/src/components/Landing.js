import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

const Landing = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      const { data } = await axios.get(
        "https://blog-app-2-u2io.onrender.com/api/v1/blog/all-blogs"
      );
      if (data?.success) {
        console.log(data);
        setBlogs(data?.blogs.slice(-3));
      }
    }
    getBlogs();
  }, []);
  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1>Welcome to My Blog</h1>
            <p>
              Discover amazing content and join our community of writers and
              readers.
            </p>
            <Button variant="primary" as={Link} to="/register">
              Get Started
            </Button>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h2>Latest Posts</h2>
          </Col>
        </Row>

        <Row className="mt-3">
          {/* Example of a blog post card */}
          {blogs.map((blog) => (
            <BlogCard
              title={blog.title}
              username={blogs?.user?.username}
              //   description={blog.description}
              id={blog._id}
              image={blog.image}
              time={blog.createdAt}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
