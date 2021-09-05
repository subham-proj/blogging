import axios from "axios";
import React, { useContext, useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { Context } from "../context/context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title: title,
      description: description,
      username: user.username,
    };

    try {
      const res = await axios.post( "/api/posts", newPost);
      window.location.replace("/posts/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div>
      <Container style={{ paddingTop: "50px", paddingBottom: "50px" }}>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="write_labels">Title</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Enter a suitable heading"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={15}
                  placeholder="Start Writing . . ."
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" size="lg">
                Publish
              </Button>{" "}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
