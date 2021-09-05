import React, { useState } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
const api = process.env.REACT_APP_API_KEY;

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNotValid, setIsNotValid] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [emailExist, setEmailExist] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await axios.get(api + "/users");

    for (var x in user.data) {
      const eachUser = await axios.get(api + "/users/" + x);

      if (eachUser.data.username === username) {
        setUserExist(true);
        break;
      }

      if (eachUser.data.email === email) {
        setEmailExist(true);
        break;
      }
    }

    // console.log(userExits);

    if (userExist === false && emailExist === false) {
      if (password !== confirmPassword) {
        setIsNotValid(true);
      } else {
        try {
          const res = await axios.post(api + "/auth/register", {
            username: username,
            email: email,
            password: password,
          });

          alert("User Registered Successfully");
          res.data && window.location.replace("/login");
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <div>
      <Container className="login_form">
        <Card className="form_card">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <h6 style={{ textAlign: "center", padding: "20px" }}>
                Create an Account
              </h6>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="johndoe99"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              {userExist ? (
                <Alert variant="danger">Username is taken</Alert>
              ) : (
                ""
              )}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="johndoe@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              {emailExist ? (
                <Alert variant="danger">Email id is already in use.</Alert>
              ) : (
                ""
              )}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Re-enter Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {isNotValid ? (
                <Alert variant="danger">Password does not match</Alert>
              ) : (
                ""
              )}
              <div className="d-grid gap-2 login_form_submit">
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <h6 className="login_form_text">
        Already have an account ?{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          {" "}
          &nbsp; Log in
        </Link>{" "}
      </h6>
    </div>
  );
}
