import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Context } from "../context/context";
import axios from "axios";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const { user, dispatch } = useContext(Context);
  const [updateMode, setUpdateMode] = useState(false);

  const handleUpdate = async () => {
    dispatch({ type: "UPDATE_START" });

    try {
      const res = await axios.put("/api/users/" + user._id, {
        userId: user._id,
        username: username ? username : user.username,
        email: email ? email : user.email,
      });
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      window.location.reload();
    } catch (err) {
      alert("Username or Email is already taken");
      dispatch({ type: "UPDATE_FAILED" });
    }
  };

  return (
    <Container style={{ paddingTop: "100px" }}>
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Username</h6>
                  </div>
                  {updateMode ? (
                    <Form.Group
                      className="mb-3 col-sm-9"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                  ) : (
                    <div className="col-sm-9 text-secondary">
                      {user.username}
                    </div>
                  )}
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  {updateMode ? (
                    <Form.Group
                      className="mb-3 col-sm-9"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  ) : (
                    <div className="col-sm-9 text-secondary">{user.email}</div>
                  )}
                </div>

                <hr></hr>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Password</h6>
                  </div>

                  <div className="col-sm-9 text-secondary">********</div>
                </div>

                <hr></hr>
                <div className="row">
                  <div className="col-sm-12">
                    {updateMode ? (
                      <Button onClick={handleUpdate} variant="info" size="md">
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="info"
                        onClick={() => setUpdateMode(true)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
