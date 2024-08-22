import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Form,
  Col,
  Image,
  Row,
} from "react-bootstrap";

const ViewBlog = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const [comment, setComment] = useState("");
  let userId = localStorage.getItem("userId");

  const isUser = localStorage.getItem("userId") === blog?.user;
  console.log(isUser);

  // Get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(
        `https://blog-app-2-5s8y.onrender.com/api/v1/blog/get-blog/${id}`
      );
      if (data?.success) {
        console.log(data);
        setBlog(data.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `https://blog-app-2-5s8y.onrender.com/api/v1/blog/${id}/comment`,
      {
        postedBy: userId,
        text: comment,
      }
    );
    if (data.success) {
      toast.success("Comment added");
      console.log(data);
      setBlog((prevBlog) => ({
        ...prevBlog,
        comments: [...prevBlog.comments, data.newComment],
      }));
      setComment(""); // Clear the comment input after submitting
    }
  };
  const handleEdit = () => {
    Navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://blog-app-2-5s8y.onrender.com/api/v1/blog/delete-blog/${id}`
      );
      if (data?.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">
      <Card
        className="p-4 shadow-sm mb-4"
        key={blog._id}
        style={{ borderRadius: "10px" }}
      >
        <Card.Body>
          <Row>
            <Col xs={12} className="mb-3">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
                  {blog.title}
                </h2>
                <span>
                  {" "}
                  {isUser && (
                    <Col xs="auto" className="ml-auto">
                      <Button
                        variant="light"
                        className=" btn-sm"
                        onClick={handleEdit}
                      >
                        🖊
                      </Button>
                      <Button
                        variant="outline-danger"
                        className=" btn-sm"
                        onClick={handleDelete}
                      >
                        ❌
                      </Button>
                    </Col>
                  )}
                </span>
              </div>

              <p className="text-muted" style={{ fontSize: "1rem" }}>
                {blog.user?.username} •{" "}
                {new Date(blog.updatedAt).toLocaleDateString()}
              </p>
            </Col>
            <Col xs={12} className="mb-3">
              <Image
                src={blog.image}
                alt={blog.title}
                fluid
                rounded
                style={{
                  width: "10v0%",
                  height: "auto",
                  maxHeight: "400px",
                  objectFit: "contain", // Adjusted for full image visibility
                  marginBottom: "1rem",
                }}
              />
            </Col>
            <Col xs={12}>
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.7",
                  whiteSpace: "pre-line",
                }}
              >
                {blog.description}
              </p>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-white border-top-0">
          <Form onSubmit={addComment} className="d-flex">
            <Form.Control
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
              className="me-2"
              style={{ borderRadius: "20px" }}
            />
            <Button
              type="submit"
              variant="primary"
              style={{ borderRadius: "20px" }}
            >
              Add
            </Button>
          </Form>
          <div className="mt-4">
            {blog.comments && blog.comments.length > 0 ? (
              blog.comments.map((comment, index) => (
                <p
                  key={index}
                  style={{ fontSize: "0.9rem", lineHeight: "1.4" }}
                >
                  <Link
                    to={`/user/${comment.postedBy}`}
                    className="text-decoration-none"
                    style={{
                      color: "#333",
                    }}
                  >
                    <strong>{comment.postedBy}:</strong>{" "}
                  </Link>{" "}
                  {comment.text}
                </p>
              ))
            ) : (
              <p className="text-muted">No comments yet.</p>
            )}
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ViewBlog;
