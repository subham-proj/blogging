import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <div className="footerLayout">
      <footer className="footer">
        <Container>
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/subham-singh-cc"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Subham Singh
            </a>
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
