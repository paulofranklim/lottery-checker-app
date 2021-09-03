import React from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { useState } from 'react'
import { api } from '../../services/api'

export const ModalInfo = (props) => {
    const { show, closeModalFunction, title, message } = props

    return (
        <div>
            <Modal show={show} onHide={() => closeModalFunction()} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModalFunction()}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export const ModalActionConfirmation = (props) => {
    const { show, closeModalFunction, title, message, actionName, actionFunction } = props

    return (
        <div>
            <Modal show={show} onHide={() => closeModalFunction()} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={actionFunction}>
                        {actionName}
                    </Button>
                    <Button variant="secondary" onClick={() => closeModalFunction()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export const ModalError = (props) => {
    const { show, closeModalFunction, title, modalMessage, errorMessage } = props

    return (
        <div>
            <Modal show={show} onHide={() => closeModalFunction()} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {modalMessage}
                    </p>
                    <p>
                        {errorMessage}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModalFunction()}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export const ModalNewUser = (props) => {
    const { show, title, closeModalFunction } = props

    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [userName, setUserName] = useState("");
    const [tempUserName, setTempUserName] = useState("")
    const [password, setPassword] = useState("");
    const [showInfoModal, setShowInfoModal] = useState(false)

    async function handleCreteUser(e) {
        e.preventDefault()

        const user = {
            name,
            mail,
            userName,
            password,
            active: true
        }
        const response = await api.post('/save-user', user)

        if (response) {
            setName("")
            setMail("")
            setTempUserName(userName)
            setUserName("")
            setPassword("")
            closeModalFunction()
            setShowInfoModal(true)
        }

    }

    return (
        <div>
            <Modal show={show} onHide={() => closeModalFunction()} centered>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{ margin: 20 }} onSubmit={e => handleCreteUser(e)}>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={name} onChange={e => setName(e.target.value)} required placeholder="Insert name" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" >
                                <Form.Label>Login</Form.Label>
                                <Form.Control value={userName} onChange={e => setUserName(e.target.value)} required placeholder="Insert user name" />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Insert password" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Mail</Form.Label>
                                <Form.Control value={mail} onChange={e => setMail(e.target.value)} required placeholder="Insert mail" />
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                        <Button variant="danger" onClick={() => closeModalFunction()}>
                            Close
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
            <ModalInfo
                show={showInfoModal}
                closeModalFunction={() => setShowInfoModal(false)}
                title="User created!"
                message={'The user "' + tempUserName + '" is created.'}
            />
        </div>
    )
}

export const ModalResetPassword = (props) => {
    const { show, title, sendFunction, closeModalFunction } = props
    return (
        <Modal show={show} onHide={() => closeModalFunction()} centered>
            <Modal.Header >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={sendFunction}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>User e-mail</Form.Label>
                            <Form.Control required placeholder="Insert your mail to send a reset link" />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => sendFunction()}>Send</Button>
                <Button variant="danger" onClick={() => closeModalFunction()}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}