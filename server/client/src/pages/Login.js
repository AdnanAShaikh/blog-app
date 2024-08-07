import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import SignInGoogle from "../components/SignInGoogle";
import validator from "validator";

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
    toast.loading("Checking Credentials");
    if (!validator.isEmail(inputs.email)) {
      toast.dismiss();
      return toast.error("Enter email in a valid form");
    }

    if (inputs.password.length <= 6) {
      toast.dismiss();

      return toast.error("Password should be greater than 6 characters!");
    }

    try {
      const { data } = await axios.post(
        // "http:localhost:8081/api/v1/user/login",
        "https://blog-app-2-5s8y.onrender.com/api/v1/user/login",
        {
          email: inputs.email,
          password: inputs.password,
        }
        // { withCredentials: true }
      );
      if (data.success) {
        toast.dismiss();
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
      return toast.error("Not a Registered User");
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
                <Form.Group controlId="formEmail" className="mb-4">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-4">
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
                <p style={{ textAlign: "center" }}>Or</p>
                {/* <SignInGoogle /> */}
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
