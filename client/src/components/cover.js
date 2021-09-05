import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cover from "../assets/bannerType.png";
function Banner() {
  return (
    <div className="background">
      <Container>
        <Row>
          <Col lg={6} className="coverpage">
            <h1>A directory of wonderful things</h1>

            <h5 style={{ color: "#34343E" }}>
              Aren’t you a smart one to enter blogging?
            </h5>
            <br></br>
            <Button as={Link} to="/write" variant="info" size="lg">
              Publish Your idea
            </Button>
          </Col>
          <Col lg={6}>
            <div className="coverPic">
              <img src={Cover} alt="banner" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Banner;
