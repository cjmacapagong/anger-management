import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="w-100">
      <Navbar bg="primary" variant="dark">
        <Container>
          <div className="d-flex justify-content-between w-100">
            <Navbar.Brand href="#home">Psychology Today</Navbar.Brand>
            <div>
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
            </div>

            <div>
              <Nav className="me-auto">
                <Nav.Link href="#home">Language</Nav.Link>
              </Nav>
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
