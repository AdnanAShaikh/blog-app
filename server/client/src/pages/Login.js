import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import SignInGoogle from "../components/SignInGoogle";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://blog-app-2-u2io.onrender.com/api/v1/user/login",
        {
          email: inputs.email,
          password: inputs.password,
        }
      );
      if (data.success) {
        console.log(data);
        const { token } = data;
        dispatch(authActions.login());
        localStorage.setItem("userId", data?.user._id);
        // localStorage.setItem("token", token);
        toast.success("User login Successfully");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
      // if (error.response.status === 404) {
      toast.error("Not a Registered User");
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
              <Card.Title className="text-center mb-4">Login</Card.Title>
              <Form onSubmit={handleSubmit}>
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
                <Button variant="primary" type="submit" className="center mb-3">
                  Submit
                </Button>
                <p style={{ textAlign: "center" }}>Or</p>
                <SignInGoogle />
                <Button
                  variant="link"
                  onClick={() => navigate("/register")}
                  className="w-100"
                >
                  Not a user? Please Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
