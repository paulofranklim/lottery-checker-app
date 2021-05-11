import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Form, Col, Button, Image, InputGroup } from 'react-bootstrap'
import Logo from '../../assets/logo.png'
import { FaLock, FaUser } from 'react-icons/fa'
import { api } from '../../services/api'
import { ModalInfo } from '../../components/modals'

export default function Login() {

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const history = useHistory()

  if (sessionStorage.getItem('login')) {
    history.push("/home")
  }

  async function handleAuth(e) {
    e.preventDefault()

    const data = {
      mail,
      password
    }

    try {
      const response = await api.post('/auth', data)
      const { mail, name } = response.data;

      if (mail) {
        sessionStorage.setItem('login', name)
        history.push("/home")
      } else {
        setShowModal(true)
      }

    } catch (error) {
      clearFields()
      setShowModal(true)
    }
  }

  function clearFields() {
    setMail("")
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
              <Form.Control value={mail} onChange={e => setMail(e.target.value)} required aria-describedby="user" placeholder="User" />
            </InputGroup>

            <InputGroup style={{ marginTop: 5 }}>
              <InputGroup.Append>
                <InputGroup.Text id="password"><FaLock /></InputGroup.Text>
              </InputGroup.Append>
              <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" required aria-describedby="password" placeholder="Password" />
            </InputGroup>

            <Button style={{ width: "100%", marginTop: 5 }} variant="info" type="submit">Submit</Button>
          </Form.Group>
          <Form.Group style={{ display: 'flex', justifyContent: "center" }} as={Col} md="3">
            <Image style={{ width: "50%" }} src={Logo} rounded />
          </Form.Group>
        </Form.Row>
      </Form>

      <ModalInfo
        show={showModal}
        closeModalFunction={() => setShowModal(false)}
        title="Login info"
        message="Unauthorized to connect."
      />

    </Container>
  );
}