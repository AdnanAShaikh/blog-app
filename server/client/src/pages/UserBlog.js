import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Container, Row, Col, Alert } from "react-bootstrap";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);

  // get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `https://blog-app-2-5s8y.onrender.com/api/v1/blog/user-blog/${id}`
      );
      if (data?.success) {
        setUser(data?.userBlog);
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <Container>
      <Row>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Col md={6} lg={4} key={blog._id} className="mb-4">
              <BlogCard
                id={blog._id}
                isUser={true}
                title={blog.title}
                userImage={user.image}
                // description={blog.description}
                image={blog.image}
                username={user.username}
                time={blog.createdAt}
              />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">
              <h4>You Haven't Created a Blog</h4>
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default UserBlogs;
