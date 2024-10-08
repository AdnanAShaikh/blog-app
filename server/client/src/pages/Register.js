import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import validator from "validator";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const Register = () => {
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [imageURL, setImageURL] = useState("");

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs.password);
    console.log(inputs.name);
    toast.loading("Registering User");
    if (!validator.isEmail(inputs.email)) {
      toast.dismiss();
      return toast.error("Enter email in a valid form");
    }

    if (inputs.password.length < 6) {
      toast.dismiss();
      return toast.error("Password should be greater than 6 characters!");
    }

    if (inputs.name.length < 3) {
      toast.dismiss();
      return toast.error("Username should be greater than 3 characters!");
    }
    try {
      const response = await axios.post(
        "https://blog-app-2-5s8y.onrender.com/api/v1/user/register",
        {
          username: inputs.name,
          email: inputs.email,
          password: inputs.password,
          image: imageURL,
        }
      );
      const { data } = response;

      if (data.success) {
        toast.dismiss();

        toast.success("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Internal Server Error");
      console.log(error);
      console.log(error);
      // if (error.response.status === 401) {
      // alert("Use a different Email !");
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
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">Register</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={inputs.name}
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
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Submit
                </Button>
                <Button
                  variant="link"
                  onClick={() => navigate("/login")}
                  className="w-100"
                >
                  Already Registered? Please Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
