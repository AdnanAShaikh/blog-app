import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        backgroundImage: `url(${require("../pexels-john-diez-7578199.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add text shadow for better readability
      }}
    >
      <Container>
        <Row className="text-center">
          <Col>
            <h1 className="display-4 text-white">Welcome to My Blog</h1>
            <p className="lead mt-3 text-white">
              Discover amazing content and join our community of writers and
              readers.
            </p>
            <Button
              variant="primary"
              as={Link}
              to="/register"
              size="lg"
              className="mt-3 text-light"
            >
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
