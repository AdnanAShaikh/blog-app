import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://blog-app-62et.onrender.com/api/v1/blog/create-blog",
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Create A Post
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    value={inputs.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formDescription" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    name="description"
                    value={inputs.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formImage" className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL"
                    name="image"
                    value={inputs.image}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateBlog;
