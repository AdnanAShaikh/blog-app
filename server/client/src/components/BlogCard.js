import React from "react";
import { Card, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  userImage,
}) {
  return (
    <Card
      className="mb-3 shadow-sm"
      style={{ maxWidth: "400px", margin: "auto" }}
    >
      <Card.Header>
        <Row className="align-items-center">
          <Col xs="auto">
            <Link to={`/user/${username}`}>
              <Image
                src={userImage ? userImage : require("../download.jpeg")}
                roundedCircle
                alt={username}
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
          </Col>
          <Col>
            <Link
              to={`/user/${username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {" "}
              <strong>{username}</strong>
            </Link>
            <br />
            <small className="text-muted">
              {time ? new Date(time).toLocaleString() : ""}
            </small>
          </Col>
        </Row>
      </Card.Header>
      <Link to={`/get-blog/${id}`}>
        <Card.Img
          variant="top"
          style={{ height: "200px", objectFit: "cover" }}
          src={image}
          alt="Blog image"
        />
      </Link>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
