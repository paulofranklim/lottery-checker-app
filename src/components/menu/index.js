import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Form, FormText, Button, Modal } from 'react-bootstrap'
import { FiPower } from "react-icons/fi";
import { FaHome, FaUser } from "react-icons/fa";

export default function Menu() {

  const [showModalLogOut, setShowModalLogOut] = useState(false);

  const userName = sessionStorage.getItem('userName')
  const history = useHistory()

  function handleLogOut() {
    sessionStorage.removeItem('userName')
    history.push('/')
  }

  return (
    <div>
      <Navbar bg="secondary" expand="lg" style={{ fontWeight: 'bold' }}>
        <Navbar.Brand href="/home"><FaHome /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="REGISTER" id="basic-nav-dropdown">
              <NavDropdown.Item href="/games">Games</NavDropdown.Item>
              <NavDropdown.Item href="/users">Users</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/my-bets">MY BETS</Nav.Link>
            <Nav.Link href="/all-bets">ALL BETS</Nav.Link>
          </Nav>
          <Form inline>
            <FormText style={{ fontSize: 16 }}> <FaUser /> {userName} </FormText>
            <Button onClick={() => setShowModalLogOut(true)} style={{ marginLeft: 15 }} variant="danger" size="sm"><FiPower /></Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModalLogOut} onHide={() => setShowModalLogOut(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm exit</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to exit?</Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="danger" onClick={handleLogOut}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={() => setShowModalLogOut(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}