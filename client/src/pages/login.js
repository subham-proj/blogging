import React, { useRef, useContext } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Context } from "../context/context";
import axios from "axios";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const { dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/");
    } catch (err) {
      alert("Invalid Credentials!!");
      dispatch({ type: "LOGIN_FAILED" });

      usernameRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  const handleForgot = () => {
    alert("This functionality is under developement!");
  };

  return (
    <div>
      <Container className="login_form">
        <Card className="form_card">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <h6 style={{ textAlign: "center", padding: "20px" }}>
                Enter your credentials here
              </h6>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="johndoe99"
                  ref={usernameRef}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2 login_form_submit">
                <Button variant="primary" type="submit">
                  Log in
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <h6 className="login_form_text">
        <Link
          to="/login"
          onClick={handleForgot}
          style={{ textDecoration: "none" }}
        >
          Forgot Password
        </Link>{" "}
      </h6>
      <h6 className="login_form_text">
        Don't have an account?{" "}
        <Link to="/register" style={{ textDecoration: "none" }}>
          {" "}
          &nbsp;&nbsp; Click here
        </Link>{" "}
      </h6>
    </div>
  );
}
