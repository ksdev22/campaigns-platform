import {
  Navbar,
  Container,
  Button,
  NavDropdown,
  Nav,
  Alert,
} from "react-bootstrap";
import { useState } from "react";

export default function MainNav({ error }) {
  const [showError, setShowError] = useState(true);
  const ErrorContainer = (
    <Alert
      id="error-container"
      variant="danger"
      className={
        showError ? "position-fixed w-25" : "position-fixed w-25 invisible"
      }
      style={{ top: "75px", right: "100px" }}
    >
      {error}
    </Alert>
  );

  // setTimeout(() => {
  //   setShowError(false);
  // }, 5000);

  return (
    <>
      <Navbar
        id="main-nav"
        bg="dark"
        expand="lg"
        variant="dark"
        className="sticky-top mb-3"
      >
        <Container>
          <Navbar.Brand href="#home">(Logo)</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Dashboard</Nav.Link>
              <NavDropdown title="Templates" id="templates-dropdown">
                <NavDropdown.Item href="/templates/new">
                  New Template
                </NavDropdown.Item>
                <NavDropdown.Item href="/templates">
                  All Templates
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Campaigns" id="campaigns-dropdown">
                <NavDropdown.Item href="/campaigns/new">
                  New Campaign
                </NavDropdown.Item>
                <NavDropdown.Item href="/campaigns">
                  All Campaigns
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/targets">Targets</Nav.Link>
              <Nav.Link href="/Announcement">Announcements</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {error && ErrorContainer}
    </>
  );
}
