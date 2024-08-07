import React from "react";
import { Card, Button, Image, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
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

  const handleView = async () => {
    try {
      navigate(`/blog-details/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      className="mb-3 shadow-sm"
      style={{ maxWidth: "400px", margin: "auto" }}
    >
      <Card.Header>
        <Row className="align-items-center">
          <Col xs="auto">
            <Image
              src={require("../download.jpeg")}
              roundedCircle
              alt={username}
              style={{ width: "50px", height: "50px" }}
            />
          </Col>
          <Col>
            <strong>{username}</strong>
            <br />
            <small className="text-muted">
              {new Date(time).toLocaleString()}
            </small>
          </Col>
          {isUser && (
            <Col xs="auto" className="ml-auto">
              <Button variant="info" className="mr-2" onClick={handleEdit}>
                🖊
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                ❌
              </Button>
            </Col>
          )}
        </Row>
      </Card.Header>
      <Card.Img
        variant="top"
        style={{ height: "200px", objectFit: "cover" }}
        src={image}
        alt="Blog image"
      />
      <Card.Body>
        <Link to={`/get-blog/${id}`} className="text-blue-600 hover:underline">
          View Details
        </Link>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
