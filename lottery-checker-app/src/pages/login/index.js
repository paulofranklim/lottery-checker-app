import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Form, Col, Button, Image, InputGroup } from 'react-bootstrap'
import Logo from '../../assets/logo.png'
import { FaLock, FaUser } from 'react-icons/fa'
import { api } from '../../services/api'
import { ModalError, ModalNewUser } from '../../components/modals'

export default function Login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showNewUserModal, setShowNewUserModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [modalMessage, setModalMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const history = useHistory()

  if (sessionStorage.getItem('userName')) {
    history.push("/home")
  }

  async function handleAuth(e) {
    e.preventDefault()

    const data = {
      userName,
      password
    }

    try {
      const response = await api.post('/auth', data)
      const { id, userName } = response.data;

      if (userName) {
        sessionStorage.setItem('userName', userName)
        sessionStorage.setItem('userId', id)
        history.push("/home")
      } else {
        setShowErrorModal(true)
      }

    } catch (error) {
      setModalMessage("Unauthorized to connect.")
      setErrorMessage("Message: " + error.response.data.message)
      setShowErrorModal(true)
      clearFields()
    }
  }

  function clearFields() {
    setUserName("")
    setPassword("");
  }

  return (
    <Container>
      <Form onSubmit={e => handleAuth(e)} className="border border-info" >
        <Form.Row style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: '100vh' }}>
          <Form.Group as={Col} md="3">
            <Form.Label style={{ display: 'flex', justifyContent: "center" }}>SIGN IN</Form.Label>

            <InputGroup>
              <InputGroup.Append>
                <InputGroup.Text id="user"><FaUser /></InputGroup.Text>
              </InputGroup.Append>
              <Form.Control value={userName} onChange={e => setUserName(e.target.value)} required aria-describedby="user" placeholder="User" />
            </InputGroup>

            <InputGroup style={{ marginTop: 5 }}>
              <InputGroup.Append>
                <InputGroup.Text id="password"><FaLock /></InputGroup.Text>
              </InputGroup.Append>
              <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" required aria-describedby="password" placeholder="Password" />
            </InputGroup>

            <Button style={{ width: "100%", marginTop: 5 }} variant="info" type="submit">Submit</Button>
            <Form.Row style={{ fontSize: 12, justifyContent: 'center' }}>
              <a href="#" onClick={() => setShowNewUserModal(true)}>Register</a>
              <a style={{ marginLeft: 50 }} href="#">Forgot your password?</a>
            </Form.Row>
          </Form.Group>
          <Form.Group style={{ display: 'flex', justifyContent: "center" }} as={Col} md="3">
            <Image style={{ width: "50%" }} src={Logo} rounded />
          </Form.Group>
        </Form.Row>

      </Form>

      <ModalError
        show={showErrorModal}
        closeModalFunction={() => setShowErrorModal(false)}
        title="Login info"
        modalMessage={modalMessage}
        errorMessage={errorMessage}
      />

      <ModalNewUser
        show={showNewUserModal}
        title="Create new user"
        saveUserFunction={() => setShowNewUserModal(false)}
        closeModalFunction={() => setShowNewUserModal(false)}
      />

    </Container >
  );
}