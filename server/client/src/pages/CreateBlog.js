import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import toast from "react-hot-toast";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });
  const [imageURL, setImageURL] = useState("");

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
    toast.loading("Fetching API to create blog");
    try {
      const { data } = await axios.post(
        "https://blog-app-2-5s8y.onrender.com/api/v1/blog/create-blog",
        {
          title: inputs.title,
          description: inputs.description,
          image: imageURL,
          user: id,
        }
      );
      if (data?.success) {
        toast.dismiss();
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          setImageURL(downloadURL);
        });
      });
    } else {
      console.log("no file selected !");
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
                  <Form.Label>Image File</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Image File"
                    name="image"
                    onChange={handleFileChange}
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
